// server imports
const server = require("http").createServer();
const io = require("socket.io")(server);

// db imports
const low = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");

// import models
const Character = require("./models/char");
const Session = require("./models/session");
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

  // subscribe to events
  characters.forEach((char) =>
    char.subscribe((event, payload) => client.emit(event, payload))
  );
  turns.subscribe((event, payload) => client.emit(event, payload));

  client.on("session.setCharacter", ({ charKey }) => {
    const currentCharacter = session.setCharacter(db, charKey);

    if (!currentCharacter) {
      return client.emit("session.invalidCharkey", {
        message: "Chave de personagem invalida",
      });
    }

    // load master
    if (currentCharacter === true) {
      client.emit("session.data", {
        characters: characters.reduce(
          (acc, c) => ({ ...acc, [c.id]: c.get() }),
          {}
        ),
        turn: turns.getLast() || null,
        isMaster: true,
        charId: null,
      });

      io.emit("connection.new", {
        who: "O Mestre",
      });
    } else if (currentCharacter !== null) {
      const { id: charId } = currentCharacter;

      client.emit("session.data", {
        charId,
        characters: characters.reduce(
          (acc, c) => ({ ...acc, [c.id]: c.get() }),
          {}
        ),
        turn: turns.getLast() || null,
        isMaster: false,
      });

      io.emit("connection.new", {
        who: currentCharacter.name,
      });
    }
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
      who: session.character && session.character.name,
    });
  });
});

console.log("http://localhost:3001");
server.listen(3001);
