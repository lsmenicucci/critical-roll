// server imports
const server = require("http").createServer();
const io = require("socket.io")(server);

// db imports
const low = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");

// import models
const Character = require("./models/char");
const Session = require("./models/session");
const RollQueue = require("./models/rolls");

// setup db
const adapter = new FileSync("db.json");
const db = low(adapter);

db.defaults({
  characters: {},
  sessions: [],
  charKeyRotation: { "123": "rudy" },
  masterKey: "master-secret-key",
  rolls: [],
}).write();

// reset sessions
db.set("sessions", []).write();
db.set("rolls", []);

// init row queue
const rollQueue = new RollQueue(db);

io.on("connection", (client) => {
  const session = Session.createSession(db, client.id);

  client.on("session.setCharacter", ({ charKey }) => {
    // load master
    if (Session.isMaster(db, charKey)) {
      const characters = Character.getAll(db);
      client.emit("session.data", {
        characters,
        isMaster: true,
        charId: null,
      });

      return io.emit("connection.new", {
        who: "O Mestre",
      });
    }

    // load character
    const loggedChar = Character.loadCharacter(db, charKey);

    if (loggedChar) {
      const { id: charId } = loggedChar;
      const characters = Character.getAll(db);
      session.setCharacter(charId);
      client.emit("session.data", {
        charId,
        characters,
        rolls: rollQueue.getRolls(),
        isMaster: false,
      });

      return io.emit("connection.new", {
        who: loggedChar.name,
      });
    }
    return client.emit("session.invalidCharkey", {
      message: "Chave de personagem invalida",
    });
  });

  client.on("roll.request", ({ charId, dices }) => {
    console.log("new roll! ", charId, dices);
    const [newRoll] = rollQueue.addRoll(charId, dices);

    io.emit("roll.new", newRoll);
  });

  client.on("roll.submit", ({ rollId, dices, charId }) => {
    rollQueue.submitRoll(rollId);
    io.emit("roll.submitted", { rollId, dices, charId });
  });

  client.on("character.update", ({ charId, newData }) => {
    const editingChar = new Character(db, charId);

    // set new attrs
    const diff = editingChar.setAttributes(newData);

    io.emit("character.updated", {
      charId,
      who: editingChar.name,
      newData,
      diff,
    });
  });

  client.on("disconnect", () => {
    Session.clearSession(db, client.id);
  });
});
server.listen(3000);
