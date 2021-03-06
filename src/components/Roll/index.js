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
  font-size: 14px;
  font-family: ${theme.font.family};
  margin-bottom: 8px;
`;

const DicesContainer = styled.div`
  display: flex;
  align-items: flex-start;
  flex-wrap: wrap;
  width: 100%;
  max-height: 50px;
  overflow-y: auto;
`;

const Dice = styled(DiceComponent)`
  margin-right: 8px;
  margin-bottom: 8px;
`;

const StartButton = styled(Button)`
  font-size: 14px;
  padding: 2px 8px;
`;

export default (props) => {
  const [hasAccepted, setAccepted] = useState(false);

  // redux hooks
  const [turn, session] = useSelector((state) => [state.turn, state.session]);

  const thisCharDices =
    turn &&
    turn.dices &&
    session &&
    turn.dices.filter(
      (d) =>
        d.forWho === session.charId || (d.forWho === true && session.isMaster)
    );

  const hasFinished =
    thisCharDices && thisCharDices.every((dice) => dice.value !== undefined);

  useEffect(() => {
    if (thisCharDices && thisCharDices.some((d) => d.value !== undefined)) {
      setAccepted(true);
    }
  }, [thisCharDices]);

  useEffect(() => {
    setAccepted(false);
  }, [turn.id]);

  return (
    <ViewWindow red {...props}>
      <RollActionTitle>
        {(hasFinished && "Dados rolados") ||
          (hasAccepted && "Rolando...") ||
          "Voce tem dados a rolar!"}
      </RollActionTitle>
      {hasAccepted ? (
        <DicesContainer>
          {thisCharDices &&
            thisCharDices.map((dice) => (
              <Dice active diceId={dice.id} key={dice.id} />
            ))}
        </DicesContainer>
      ) : (
        <StartButton light red onClick={() => setAccepted(true)}>
          Rolar!
        </StartButton>
      )}
    </ViewWindow>
  );
};
