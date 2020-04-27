// import react
import React from "react";
import classNames from "classnames";
import { connect } from "react-redux";

// import local components
import RollWindow from "./RollWindow";

const Stage = ({ className, stageData: { currentRoll }, currentUser }) => {
  return (
    <div className={classNames("stage-container", className)}>
      {!currentUser ? (
        `Voce precisa logar antes :T`
      ) : !(currentRoll && currentRoll.who) ? (
        `Não é a vez de ninguem...`
      ) : !currentRoll && currentRoll.who !== currentUser.id ? (
        `É a vez de ${currentRoll.who}`
      ) : (
        <RollWindow />
      )}
    </div>
  );
};

const stateToProps = ({ stage: { currentRoll }, currentUser }) => {
  return {
    stageData: {
      currentRoll,
    },
    currentUser,
  };
};

export default connect(stateToProps)(Stage);
