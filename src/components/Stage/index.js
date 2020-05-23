// import react modules
import React, { useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { Redirect, useLocation } from "react-router-dom";

// icons
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// import local components
import CharacterModelComponent from "../Character/Model";
import CharacterDetailsComponent from "../Character/Details";
import Button from "../Buttons/Normal";

// import theme variables
import theme from "../../config/theme";

const StageContainer = styled.div`
  align-items: stretch;
  background: ${theme.colors.whiteTwo};
  box-sizing: border-box;
  cursor: pointer;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-around;
`;

const CharactersView = styled.div`
  display: flex;
  width: 60%;
  justify-content: flex-end;
  padding: 4px 16px;
`;

const FullView = styled.div`
  display: flex;
  flex: 1;
`;

const ActionView = styled.div`
  display: flex;
  flex: 1;
  width: 40%;
  padding: 16px;
`;

const CharacterModel = styled(CharacterModelComponent)`
  display: ${({ hidden }) => (hidden && "none") || "flex"};
  flex: 1;
  margin-left: 10px;
`;

const CharacterDetails = styled(CharacterDetailsComponent)`
  min-width: 300px;
  flex: 0;
  margin: 8px;
`;

const BackButton = styled(Button)`
  margin: 8px 0;
`;

export default ({ mainView, actionView, onCharacterSelect, ...props }) => {
  const [focusedChar, setFocusedChar] = useState(null);
  const [turn, session, characters] = useSelector((rootState) => [
    rootState.turn,
    rootState.session,
    rootState.characters,
  ]);

  const thisCharDices =
    turn &&
    turn.dices &&
    session &&
    turn.dices.filter((d) => d.forWho === session.charId);

  if (!session.charId && !session.isMaster) {
    return <Redirect to="/login" />;
  }

  return (
    <StageContainer {...props}>
      <ActionView>{actionView}</ActionView>
      <CharactersView>
        {Object.entries(characters || {}).map(([charId, data]) => {
          return (
            <CharacterModel
              data={data}
              hidden={focusedChar && charId !== focusedChar}
              onClick={() => setFocusedChar(charId)}
            />
          );
        })}
        {focusedChar && (
          <React.Fragment>
            <CharacterDetails charId={focusedChar} />
            <BackButton purple onClick={() => setFocusedChar(null)}>
              <FontAwesomeIcon icon={faAngleRight} />
            </BackButton>
          </React.Fragment>
        )}
      </CharactersView>
    </StageContainer>
  );
};
