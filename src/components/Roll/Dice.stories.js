import React from "react";
import Dice from "./Dice";

export default {
  component: Dice,
  title: "Dice Roll",
};

// define sampel character data
const SAMPLE_TURN = {
  id: "1234",
  dices: [
    { id: "dice-1", type: 20, forWho: "rudy" },
    { id: "dice-2", type: 20, forWho: "rudy" },
    { id: "dice-3", type: 20, forWho: "rudy" },
    { id: "dice-4", type: 20, forWho: "rudy" },
    { id: "dice-5", type: 20, forWho: "rudy" },
    { id: "dice-6", type: 20, forWho: "rudy" },
  ],
};

export const sample = () => (
  <Dice
    turnId={SAMPLE_TURN.id}
    diceId={SAMPLE_TURN.dices[1].id}
    data={SAMPLE_TURN}
  />
);
