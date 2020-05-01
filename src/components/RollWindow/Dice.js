import React, { useState } from "react";
import styled, { css, keyframes } from "styled-components";

import { colors as themeColors } from "../../config/theme";

const BounceAnimation = keyframes`
  0% {
    transform: scale(0.9);
  }
  30% {
    transform: scale(1.2);
  }
  70% {
    transform: scale(1.2);
  }
  100% {
    transform: scale(1);
  }
`;

const DiceFrame = styled.div`
  display: flex;
  flex-flow: column;
  align-items: center;
  justify-items: center;
  cursor: pointer;
  background-color: ${themeColors.whiteOne};
  box-shadow: 2px 2px ${themeColors.black} inset;
  border-radius: 4px;
  color: $black;
  padding: 0.5rem 0.75rem;
`;

const DiceValue = styled.div`
  align-self: stretch;
  text-align: center;
  font-size: 2rem;
  width: 1.5rem;
  height: 1.75rem;

  ${({ final }) =>
    final &&
    css`
      animation: ${BounceAnimation} 0.5s ease;
    `}
`;

const DiceLabel = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.6rem;
  color: ${themeColors.greyOne};
  height: 20%;
  width: 100%;
  padding: 0.1rem;
`;

const DiceIcon = styled.div`
  color: ${themeColors.greyOne};
  font-size: inherit;
  margin-right: 0.1rem;
`;

const getRandValue = (from, to) =>
  from + Math.floor(Math.random() * (to - from + 1));

export default ({ limit, setValue }) => {
  const [diceValue, setDiceValue] = useState();
  const [hasRolled, setRolled] = useState(false);

  const rollThisDice = () => {
    if (!hasRolled) {
      const nRolls = getRandValue(40, 80);
      let kRolls = 0;

      const rollTask = setInterval(genValues, 40);
      function genValues() {
        if (kRolls >= nRolls) {
          const finalValue = getRandValue(1, limit);
          setValue(finalValue);
          setDiceValue(finalValue);
          setRolled(true);
          clearInterval(rollTask);
        } else {
          setDiceValue(getRandValue(1, limit));
          kRolls++;
        }
      }
    }
  };

  return (
    <DiceFrame onClick={rollThisDice}>
      <DiceValue final={hasRolled}>{diceValue}</DiceValue>
      <DiceLabel className="dice-label">
        <DiceIcon className="ra ra-dDiceIconce-two" /> {`d${limit}`}
      </DiceLabel>
    </DiceFrame>
  );
};
