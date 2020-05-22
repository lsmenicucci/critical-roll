import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useSpring, animated } from "react-spring";
import { useDispatch, useSelector } from "react-redux";

// import actions
import actions from "../../shared/actions";

// import local component
import Dice from "./Dice";

const getRandValue = (from, to) =>
  from + Math.floor(Math.random() * (to - from + 1));

export default ({ diceId, ...props }) => {
  // state hooks
  const [diceValues, setDiceValues] = useState([]);
  const [diceValueIndex, setDiceValueIndex] = useState(0);

  // redux hooks
  const turn = useSelector((rootState) => rootState.turn);
  const dispatch = useDispatch();

  const diceData =
    turn && turn.dices && turn.dices.find((d) => d.id === diceId);
  const { type, value } = diceData;

  // get dice data
  useEffect(() => {
    if (!value) {
      setDiceValues(
        Array(getRandValue(60, 80))
          .fill(0)
          .map(() => getRandValue(1, type))
      );
    }
  }, [diceId]);

  useEffect(() => {
    if (diceValueIndex === diceValues.length - 1) {
      submitDice(diceValues[diceValueIndex]);
    } else {
      setTimeout(() => setDiceValueIndex(diceValueIndex + 1), 100);
    }
  }, [diceValueIndex]);

  // define submit func
  const submitDice = () => {
    dispatch(
      actions.submitDice({
        turnId: turn && turn.id,
        diceId,
        value: diceValues[diceValueIndex],
      })
    );
  };

  return (
    <Dice value={value || diceValues[diceValueIndex]} type={type} {...props} />
  );
};
