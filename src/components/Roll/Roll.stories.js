import React from "react";
import RollView from "./index";

export default {
  component: RollView,
  title: "Roll View",
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

export const sample = () => <RollView turn={SAMPLE_TURN} />;
