// import rect modules
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { useSpring } from "react-spring";

// import theme variables
import theme from "../../config/theme";

// import local components
import ViewWindow from "../Frames/View";
import Button from "../Buttons/Normal";
import DiceComponent from "./RollingDice";

const RollActionTitle = styled.span`
  width: 100%;
  font-size: 16px;
  font-family: ${theme.font.family};
  margin-bottom: 8px;
`;

const DicesContainer = styled.div`
  display: flex;
  align-items: flex-start;
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

  // redux hooks
  const [turn, session] = useSelector((state) => [state.turn, state.session]);
  const thisCharDices =
    turn &&
    turn.dices &&
    session &&
    turn.dices.filter((d) => d.forWho === session.charId);

  useEffect(() => {
    if (thisCharDices && thisCharDices.some((d) => d.value !== undefined)) {
      setAccepted(true);
    }
  }, [thisCharDices]);

  return (
    <ViewWindow red {...props}>
      <RollActionTitle>
        {hasAccepted ? "Rolando..." : "Voce tem dados a rolar!"}
      </RollActionTitle>
      {hasAccepted ? (
        <DicesContainer>
          {thisCharDices &&
            thisCharDices.map((dice) => (
              <Dice active diceId={dice.id} key={dice.id} />
            ))}
        </DicesContainer>
      ) : (
        <Button light red onClick={() => setAccepted(true)}>
          Rolar!
        </Button>
      )}
    </ViewWindow>
  );
};
