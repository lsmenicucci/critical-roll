// import react
import React from "react";
import classNames from "classnames";
import { connect } from "react-redux";
import styled from "styled-components";

// import local components
import RollWindow from "./RollWindow/index";

const Stage = ({ className, rolls, currentUser, characters }) => {
  const ownRolls = rolls.filter((r) => r.charId === currentUser.charId);
  console.log(ownRolls, rolls);

  return (
    <div className="stage-container">
      {(!currentUser.charId && `Voce precisa logar antes :T`) ||
        (rolls.length === 0 && `Não é a vez de ninguem...`) ||
        (ownRolls.length === 0 &&
          characters[rolls[0].charId] &&
          `É a vez de ${characters[rolls[0].charId].name}`) ||
        ownRolls.map((roll, k) => (
          <RollWindow rollId={roll.rollId} key={k} hidden={k > 0} />
        ))}
    </div>
  );
};

const stateToProps = ({ rolls, currentUser, characters }) => ({
  rolls,
  currentUser,
  characters,
});

export default connect(stateToProps)(Stage);
