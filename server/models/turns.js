const shortid = require("shortid");

class Turns {
  constructor() {
    this.turns = [];
    this.subscribers = {};
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

  clearFinishedTurns() {
    this.turns = this.turns.filter((turn) =>
      turn.dices.some((dice) => dice.value === undefined)
    );
  }

  addTurn({ dices }) {
    const rolls = dices.map((dice) => ({ ...dice, id: shortid() }));
    const newTurn = { dices: rolls, id: shortid() };
    this.turns.push(newTurn);

    this.clearFinishedTurns();
    // notify
    this.notifyAll("turn.new", newTurn);
  }

  getLast() {
    return this.turns[this.turns.length - 1];
  }

  updateDice(turnId, diceId, value) {
    const turnIndex = this.turns.findIndex((t) => t.id === turnId);
    const diceIndex =
      this.turns[turnIndex] &&
      this.turns[turnIndex].dices.findIndex((d) => d.id === diceId);

    if (diceIndex > -1 && !this.turns[turnIndex].dices[diceIndex].value) {
      this.turns[turnIndex].dices[diceIndex].value = value;

      // notify
      this.notifyAll("turn.dice", {
        turnId,
        dice: this.turns[turnIndex].dices[diceIndex],
      });

      return this.turns[turnIndex].dices[diceIndex];
    } else {
      return false;
    }
  }
}

module.exports = Turns;
