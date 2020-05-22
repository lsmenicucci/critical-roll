const { updatedDiff } = require("deep-object-diff");
const shortid = require("shortid");

const CHARS_ROOT = "characters";
const CHARS_KEYS_ROOT = "charKeyRotation";
const MASTER_KEY_ROOT = "masterKey";

class Character {
  /**
   *
   * @param {import('lowdb').LowdbSync} store
   * @param {String} charId
   */
  constructor(store, charId) {
    this.id = charId;
    this.store = store;
    this.subscriptions = {};
  }

  subscribe(cb) {
    const subId = shortid();
    this.subscribers[subId] = cb;

    return () => {
      this.subscribers[subId] = null;
    };
  }

  notifyAll(...args) {
    Object.values(this.subscribers).forEach((cb) => {
      if (typeof cb === "function") cb(...args);
    });
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

    // notify
    this.notifyAll("character.updated", {
      charId: this.id,
      diff: oldNewDiff,
      newData,
    });
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
  static loadCharacterId(store, charKey) {
    const isMaster = store.get(MASTER_KEY_ROOT).value() === charKey;
    if (isMaster) return true;

    const charId = store.get(`${CHARS_KEYS_ROOT}.${charKey}`).value();

    return charId || null;
  }

  static loadAll(store) {
    const charIds = Object.keys(store.get(CHARS_ROOT).value());
    return charIds.map((id) => new Character(store, id));
  }
}

module.exports = Character;
