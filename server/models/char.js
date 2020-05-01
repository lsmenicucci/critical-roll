const { updatedDiff } = require("deep-object-diff");

const CHARS_ROOT = "characters";
const CHARS_KEYS_ROOT = "charKeyRotation";

class Character {
  /**
   *
   * @param {import('lowdb').LowdbSync} store
   * @param {String} charId
   */
  constructor(store, charId) {
    this.id = charId;
    this.store = store;
  }

  get name() {
    const char = this.get();
    return char && char.name;
  }

  setAttributes(newData) {
    const { attrs: oldAttrs } = this.get();

    // get diff
    const attrsDiff = updatedDiff(oldAttrs, newData.attrs);
    const oldNewDiff = {};

    Object.keys(attrsDiff).forEach((k) => {
      oldNewDiff[k] = { old: oldAttrs[k], new: newData.attrs[k] };
    });

    // update storage
    this.store.get(`${CHARS_ROOT}.${this.id}`).assign(newData).write();
    return oldNewDiff;
  }

  get() {
    const currentChar = this.store.get(`${CHARS_ROOT}.${this.id}`).value();
    return currentChar;
  }

  /**
   *
   * @param {import('lowdb').LowdbSync} store
   * @param {*} charKey
   *
   * @returns {Character}
   */
  static loadCharacter(store, charKey) {
    const charId = store.get(`${CHARS_KEYS_ROOT}.${charKey}`).value();

    // TODO: Clear on production
    if (charId) {
      //store.set(`${CHARS_KEYS_ROOT}.${charKey}`).write();
      return new Character(store, charId);
    }

    return null;
  }

  static getAll(store) {
    return store.get(CHARS_ROOT).value();
  }
}

module.exports = Character;
