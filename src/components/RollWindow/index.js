// import react modules
import React, { useState } from "react";
import { connect } from "react-redux";

// local styles
import "../../styles/components/roll-window.scss";

// local components
import Frame from "../Frame";
import Dice from "./Dice";

// local actions
import { updateRoll, submitRoll } from "../../redux/actions";

const RollWindow = ({ rollId, rolls, dispatch }) => {
  const currentRoll = rolls.find((r) => rollId === r.rollId);

  const updateDice = (diceIndex, diceValue) =>
    dispatch(updateRoll({ rollId, diceIndex, diceValue }));

  return (
    <Frame className="roll-window highlighted">
      <div>Você tem dados pra rolar!</div>
      <div className="dice-list">
        {currentRoll.dices.map((dice, k) => (
          <Dice
            limit={dice.limit}
            setValue={(diceValue) => updateDice(k, diceValue)}
            key={k}
          />
        ))}
      </div>
      {currentRoll.allRolled && (
        <button
          onClick={() => dispatch(submitRoll({ rollId, roll: currentRoll }))}
          className="roll-all-button"
        >
          Continuar
        </button>
      )}
    </Frame>
  );
};

const connectStateToProps = ({ rolls }) => ({ rolls });

export default connect(connectStateToProps)(RollWindow);
