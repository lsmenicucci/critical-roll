// server imports
const server = require("http").createServer();
const io = require("socket.io")(server);

// db imports
const low = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");

// import models
const Character = require("./models/char");
const Session = require("./models/session");

// setup db
const adapter = new FileSync("db.json");
const db = low(adapter);

db.defaults({
  characters: {},
  sessions: [],
  charKeyRotation: { "123": "rudy" },
  masterKey: "master-secret-key",
}).write();

// reset sessions
db.set("sessions", []).write();

io.on("connection", (client) => {
  const session = Session.createSession(db, client.id);

  client.on("session.setCharacter", ({ charKey }) => {
    // load master
    if (Session.isMaster(db, charKey)) {
      const characters = Character.getAll(db);
      return client.emit({ characters, isMaster: true, charId: null });
    }

    // load character
    const loggedChar = Character.loadCharacter(db, charKey);
    const { id: charId } = loggedChar;

    if (charId) {
      const characters = Character.getAll(db);
      session.setCharacter(charId);
      client.emit("session.data", {
        charId,
        characters,
        isMaster: false,
      });

      return io.emit("connection.new", {
        who: loggedChar.name,
      });
    }

    return client.emit("session.characterError", {
      message: "Chave de personagem invalida",
    });
  });

  client.on("roll.request", ({ charId }) => {
    console.log("not implemented :c");
  });

  client.on("character.update", ({ charId, newAttrs }) => {
    const editingChar = new Character(db, charId);

    // set new attrs
    const diff = editingChar.setAttributes(newAttrs);

    io.emit("character.updated", {
      charId,
      who: editingChar.name,
      newAttrs,
      diff,
    });
  });

  client.on("disconnect", () => {
    Session.clearSession(db, client.id);
  });
});
server.listen(3000);
