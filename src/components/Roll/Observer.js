// import rect modules
import React from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";

// import theme variables
import theme from "../../config/theme";

// local components
import ViewWindow from "../Frames/View";
import DiceComponent from "./Dice";

const RollActionTitle = styled.span`
  width: 100%;
  font-size: 16px;
  font-family: ${theme.font.family};
  margin-bottom: 8px;
`;

const DicesContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  width: 100%;
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

  const charName = characters && characters[charId] && characters[charId].name;

  const thisCharDices =
    turn && turn.dices && turn.dices.filter((dice) => dice.forWho === charId);

  const hasFinished =
    thisCharDices && thisCharDices.every((dice) => dice.value !== undefined);

  return (
    <ViewWindow blue {...props}>
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
    </ViewWindow>
  );
};
