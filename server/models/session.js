const shortid = require("shortid");
const Character = require("./char");

class Session {
  constructor() {
    this.id = shortid();
  }

  setCharacter(db, charKey) {
    this.character = Character.loadCharacter(db, charKey);
    return this.character;
  }
}

module.exports = Session;
