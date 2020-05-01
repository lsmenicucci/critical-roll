// import react components
import React, { useState } from "react";
import classNames from "classnames";
import { connect } from "react-redux";

// local styles
import "../styles/components/dice-frame.scss";

// get local actions
import { updateRoll } from "../redux/actions";

const DiceFrame = ({ rolls, autoRoll, rollId, diceId, dispatch }) => {
  const currentRoll = rolls.find((r) => rollId === r.rollId);
  const { limit } = currentRoll.dices[diceId];

  const [diceValue, setDiceValue] = useState();
  const [isRolling, setRollingState] = useState();
  const [hasRolled, setRolled] = useState();

  const roll = async () => {
    if (!isRolling) {
      setRollingState(true);
      const nRolls = getRandValue(40, 80);
      let newValue;

      for (let i = 1; i < nRolls; i++) {
        newValue = getRandValue(1, limit);
        setDiceValue(newValue);
        await new Promise((r) => setTimeout(r, 40));
      }

      setRolled(true);

      // dispatch roll
      const updatedRoll = currentRoll;
      updatedRoll.dices[diceId].value = newValue;
      updatedRoll.allRolled = updatedRoll.dices.every(
        ({ value }) => value !== undefined
      );

      dispatch(updateRoll({ rollId, updatedRoll }));
    }
  };

  // roll if autoRoll
  if (!isRolling && !hasRolled && autoRoll) roll();

  return (
    <div className="dice-frame" onClick={roll}>
      <div className={classNames("dice-value", { final: hasRolled })}>
        {diceValue}
      </div>
      <div className="dice-label">
        <i className="ra ra-dice-two"></i> {`d${limit}`}
      </div>
    </div>
  );
};
const stateToProps = ({ rolls }) => ({ rolls });

export default connect(stateToProps)(DiceFrame);
