// import rect modules
import React from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";

// import theme variables
import theme from "../../config/theme";

// local components
import DiceComponent from "./Dice";

const PlayerRollAction = styled.div`
  background: ${theme.colors.blueOne};
  border-radius: ${theme.layout.borderRadius};
  box-sizing: border-box;
  color: ${theme.colors.whiteOne};
  display: flex;
  flex-wrap: wrap;
  padding: 8px;
`;

const RollActionTitle = styled.span`
  width: 100%;
  font-size: 16px;
  font-family: ${theme.font.family};
  margin-bottom: 8px;
`;

const DicesContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
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

  return (
    <PlayerRollAction {...props}>
      <RollActionTitle>{charName} is rolling...</RollActionTitle>
      <DicesContainer>
        {thisCharDices &&
          thisCharDices.map((dice) => (
            <Dice type={dice.type} key={dice.id} value={dice.value} />
          ))}
      </DicesContainer>
    </PlayerRollAction>
  );
};
