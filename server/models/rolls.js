const shortid = require("shortid");

const ROLLS_ROOT = "rolls";

class RollQueue {
  /**
   *
   * @param {import('lowdb').LowdbSync} store
   */
  constructor(store) {
    this.store = store;
  }

  addRoll(charId, dices) {
    const rolls = this.store
      .get(ROLLS_ROOT)
      .push({
        charId,
        dices,
        rollId: shortid(),
      })
      .write();

    return rolls.slice(-1);
  }
  submitRoll(rollId) {
    this.store.get(ROLLS_ROOT).remove({ rollId }).write();
  }

  getRolls() {
    return this.store.get(ROLLS_ROOT).value();
  }
}

module.exports = RollQueue;
