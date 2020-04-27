const SESSIONS_ROOT = "sessions";
const MASTER_KEY_ROOT = "masterKey";

class Session {
  /**
   *
   * @param {import('lowdb').LowdbSync} store
   * @param {String} socketId
   */
  constructor(store, socketId) {
    this.store = store;
    this.id = socketId;
  }

  setCharacter(charId) {
    return this.store
      .get(SESSIONS_ROOT)
      .find({ id: this.id })
      .assign({ charId })
      .write();
  }

  /**
   *
   * @param {import('lowdb').LowdbSync} store
   * @param {String} socketId
   * @param {String} charKey
   */
  static createSession(store, socketId) {
    store.get(SESSIONS_ROOT).push({ id: socketId }).write();

    console.log("Creating session with id:", socketId);
    return new Session(store, socketId);
  }

  static clearSession(store, socketId) {
    console.log(`Clearing session with id: ${socketId}`);
    store.get(SESSIONS_ROOT).remove({ id: socketId }).write();
  }

  static isMaster(store, masterKey) {
    return store.get(MASTER_KEY_ROOT).value() === masterKey;
  }
}

module.exports = Session;
