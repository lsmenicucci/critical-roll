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
const TurnsQueue = require("./models/turns");

// setup db
const adapter = new FileSync("db.json");
const db = low(adapter);

db.defaults({
  characters: {},
  charKeyRotation: { "123": "rudy" },
  masterKey: "master-secret-key",
}).write();

const turns = new TurnsQueue();
const characters = Character.loadAll(db);

// reset sessions
db.set("sessions", []).write();

io.on("connection", (client) => {
  const session = new Session();

  client.on("session.setCharacter", ({ charKey }) => {
    const currentCharacter = session.setCharacter(db, charKey);

    if (!currentCharacter) {
      return client.emit("session.invalidCharkey", {
        message: "Chave de personagem invalida",
      });
    }

    // load master
    if (currentCharacter === true) {
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

    if (currentCharacter !== null) {
      const { id: charId } = currentCharacter;
      const characters = Character.getAll(db);

      client.emit("session.data", {
        charId,
        characters,
        isMaster: false,
      });

      return io.emit("connection.new", {
        who: loggedChar.name,
      });
    }

    // subscribe to events
    characters.forEach((char) => char.subscribe(client.emit));
    turns.subscribe(client.emit);
  });

  client.on("character.update", ({ charId, newData }) => {
    const editingChar = characters.find((c) => c.id === charId);

    // set new attrs
    editingChar && editingChar.setAttributes(newData);
  });

  client.on("turn.request", ({ dices }) => {
    turns.addTurn({ dices });
  });

  client.on("turn.diceSubmit", ({ turnId, diceId, value }) => {
    turns.updateDice(turnId, diceId, value);
  });

  client.on("disconnect", () => {
    return io.emit("connection.quit", {
      who: loggedChar.name,
    });
  });
});
server.listen(3001);
