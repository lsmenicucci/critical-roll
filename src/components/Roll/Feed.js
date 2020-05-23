// import rect modules
import React from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";

// import theme variables
import theme from "../../config/theme";

// local components
import RollObserverComponent from "./Observer";

const RollObserver = styled(RollObserverComponent)`
  max-height: 100%;
`;

export default () => {
  const [turn, session] = useSelector((state) => [state.turn, state.session]);

  const rollingChars = Array.from(
    new Set(turn && turn.dices && turn.dices.map((d) => d.forWho))
  );

  return (
    rollingChars.length > 0 && (
      <RollObserver charId={rollingChars[0]}></RollObserver>
    )
  );
};
