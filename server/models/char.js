const CHARS_ROOT = "characters";
const CHARS_KEYS_ROOT = "charKeyRotation";

const classGenerator = (store) =>
  class Character {
    /**
     *
     * @param {import('lowdb').LowdbSync} store
     * @param {String} charId
     */
    constructor(charId) {
      this.id = charId;
    }

    get name() {
      const char = this.get();
      return char && char.name;
    }

    get() {
      const currentChar = store.get(`${CHARS_ROOT}.${this.id}`).value();
      return currentChar;
    }

    updateStatus(newStatus) {
      return store.get(`${CHARS_ROOT}.${this.id}`).assign(newStatus).write();
    }

    /**
     *
     * @param {import('lowdb').LowdbSync} store
     * @param {*} charKey
     *
     * @returns {Character}
     */
    static loadCharacter(charKey) {
      const charId = store.get(`${CHARS_KEYS_ROOT}.${charKey}`).value();

      // TODO: Clear on production
      if (charId) {
        //store.set(`${CHARS_KEYS_ROOT}.${charKey}`).write();
        return new Character(charId);
      }

      return null;
    }

    static getAll() {
      return store.get(CHARS_ROOT).value();
    }
  };

module.exports = classGenerator;
