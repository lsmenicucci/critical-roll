// import rect modules
import React, { useState } from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { useSpring } from "react-spring";

// import theme variables
import theme from "../../config/theme";

// import local components
import Button from "../Buttons/Normal";
import DiceComponent from "./RollingDice";

const RollAction = styled.div`
  background: ${theme.colors.red};
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

export default (props) => {
  const [hasAccepted, setAccepted] = useState(false);
  const [hasSubmited, setSubmited] = useState(false);

  // redux hooks
  const [turn, currentUser] = useSelector((state) => [
    state.turn,
    state.currentUser,
  ]);
  const thisCharDices =
    turn &&
    turn.dices &&
    currentUser &&
    turn.dices.filter((d) => d.forWho === currentUser.charId);

  return (
    <RollAction {...props}>
      <RollActionTitle>
        {hasAccepted ? "Rolando..." : "Voce tem dados a rolar!"}
      </RollActionTitle>
      {hasAccepted ? (
        <DicesContainer>
          {thisCharDices &&
            thisCharDices.map((dice) => (
              <Dice diceId={dice.id} key={dice.id} />
            ))}
        </DicesContainer>
      ) : (
        <Button light red onClick={() => setAccepted(true)}>
          Rolar!
        </Button>
      )}
    </RollAction>
  );
};
