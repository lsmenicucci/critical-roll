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

  setAttributes(newAttrs) {
    const { stats: oldStats } = this.get();

    // get diff
    const statsDiff = updatedDiff(oldStats, newAttrs.stats);
    let planDiff = {};

    // format diff
    if (statsDiff && statsDiff.atributos) {
      Object.keys(statsDiff.atributos).forEach((attrId) => {
        planDiff[attrId] = {
          old: oldStats.atributos[attrId],
          new: statsDiff.atributos[attrId],
        };
      });
    }

    Object.keys(statsDiff)
      .filter((attrId) => attrId !== "atributos")
      .forEach((attrId) => {
        planDiff[attrId] = {
          old: oldStats[attrId],
          new: statsDiff[attrId],
        };
      });

    // update storage
    this.store.get(`${CHARS_ROOT}.${this.id}`).assign(newAttrs).write();

    return planDiff;
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
