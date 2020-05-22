const shortid = require("shortid");
const Character = require("./char");

class Session {
  constructor() {
    this.id = shortid();
  }

  setCharacter(db, charKey) {
    this.charId = Character.loadCharacterId(db, charKey);
    return this.charId;
  }
}

module.exports = Session;
