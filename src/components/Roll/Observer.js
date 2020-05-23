// import rect modules
import React from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";

// import theme variables
import theme from "../../config/theme";

// local components
import ViewWindow from "../Frames/View";
import DiceComponent from "./Dice";

const ObserverFrame = styled(ViewWindow)``;

const RollActionTitle = styled.span`
  width: 100%;
  font-size: 14px;
  font-family: ${theme.font.family};
  margin-bottom: 8px;
`;

const DicesContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  width: 100%;
  max-height: 50px;
  overflow-y: auto;
`;

const Dice = styled(DiceComponent)`
  margin-right: 8px;
  margin-bottom: 8px;
`;

export default ({ charId, ...props }) => {
  const [turn, characters] = useSelector((rootState) => [
    rootState.turn,
    rootState.characters,
  ]);
  console.log(charId);

  const charName =
    (characters && characters[charId] && characters[charId].name) ||
    (charId === true && "O Mestre") ||
    null;

  const thisCharDices =
    turn && turn.dices && turn.dices.filter((dice) => dice.forWho === charId);

  const hasFinished =
    thisCharDices && thisCharDices.every((dice) => dice.value !== undefined);

  return (
    <ObserverFrame blue {...props}>
      <RollActionTitle>
        {hasFinished
          ? `${charName} rolou estes dados`
          : `${charName} esta rolando...`}
      </RollActionTitle>
      <DicesContainer>
        {thisCharDices &&
          thisCharDices.map((dice) => (
            <Dice type={dice.type} key={dice.id} value={dice.value} />
          ))}
      </DicesContainer>
    </ObserverFrame>
  );
};
