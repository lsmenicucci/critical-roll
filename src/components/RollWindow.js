// import react modules
import React, { useState } from "react";
import { connect } from "react-redux";

// local styles
import "../styles/components/roll-window.scss";

// local components
import Frame from "./Frame";
import DiceFrame from "./DiceFrame";

// local actions
import { submitRoll } from "../redux/actions";

const RollWindow = ({ currentRoll, dispatch }) => {
  // init dices
  const [autoRoll, setAutoRoll] = useState(false);

  return (
    <Frame className="roll-window highlighted">
      <div>Você tem dados pra rolar!</div>
      <div className="dice-list">
        {currentRoll.dices.map((dice, k) => (
          <DiceFrame
            limit={dice.limit}
            autoRoll={autoRoll}
            key={k}
            rollId={k}
          />
        ))}
      </div>
      {currentRoll.allRolled ? (
        <button
          onClick={() => dispatch(submitRoll(currentRoll))}
          className="roll-all-button"
        >
          Continuar
        </button>
      ) : (
        <button onClick={() => setAutoRoll(true)} className="roll-all-button">
          Rolar todos
        </button>
      )}
    </Frame>
  );
};

const connectStateToProps = ({ stage: { currentRoll } }) => {
  return { currentRoll };
};

export default connect(connectStateToProps)(RollWindow);
