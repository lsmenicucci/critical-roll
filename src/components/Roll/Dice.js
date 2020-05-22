import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useSpring, animated } from "react-spring";
import { useDispatch, useSelector } from "react-redux";

// import colors
import themeVariables from "../../config/theme";

// import actions
import actions from "../../shared/actions";

const DiceFrame = styled.div`
  display: flex;
  flex-flow: column;
  align-items: center;
  justify-items: center;
  background-color: ${themeVariables.colors.whiteOne};
  box-shadow: 2px 2px ${themeVariables.colors.black} inset;
  border-radius: 4px;
  color: ${themeVariables.colors.black};
  padding: 0.5rem 0.75rem;
`;

const DiceValue = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  width: 2rem;
  height: 1.75rem;
  font-family: ${themeVariables.font.family};
`;

const AnimatedDiceValue = animated(DiceValue);

const DiceLabel = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.6rem;
  color: ${themeVariables.colors.greyOne};
  height: 20%;
  width: 100%;
  padding: 0.1rem;
`;

const DiceIcon = styled.div`
  color: ${themeVariables.colors.greyOne};
  font-size: inherit;
  margin-right: 0.1rem;
`;

const getRandValue = (from, to) =>
  from + Math.floor(Math.random() * (to - from + 1));

const N_VALUES = 80;

export default ({ diceId }) => {
  // state hooks
  const [diceValues, setDiceValues] = useState([]);
  const turn = useSelector((rootState) => rootState.turn);
  const dispatch = useDispatch();

  // springs
  const generated = useSpring({
    index: N_VALUES + 1,
    from: { index: 0 },
    config: { tension: 5.5, mass: 1, friction: 20, precision: 1.0 },
    onRest: submitDice,
  });

  const diceData =
    turn && turn.dices && turn.dices.find((d) => d.id === diceId);
  const { type } = diceData;

  // get dice data
  useEffect(() => {
    setDiceValues(
      Array(N_VALUES)
        .fill(0)
        .map(() => getRandValue(1, type))
    );
  }, [diceId]);

  // define submit func
  const submitDice = () => {
    dispatch(
      actions.submitDice({
        turnId: turn && turn.id,
        diceId,
        value: diceValues[N_VALUES - 1],
      })
    );
  };

  // return notting if there is no turn
  if (!turn) return "";

  return (
    <DiceFrame>
      <AnimatedDiceValue>
        {generated.index.interpolate((v) => diceValues[Math.floor(v)])}
      </AnimatedDiceValue>
      <DiceLabel>
        <DiceIcon className="ra ra-dDiceIconce-two" /> {`d${type}`}
      </DiceLabel>
    </DiceFrame>
  );
};
