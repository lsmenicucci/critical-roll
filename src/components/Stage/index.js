// import react modules
import React, { useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";

// import local components
import CharacterModelComponent from "../Character/Model";
import Navbar from "../Navigation/Tabs";

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

const ActionView = styled.div`
  display: flex;
  flex: 1;
  width: 40%;
`;

const CharacterModel = styled(CharacterModelComponent)`
  display: ${({ hidden }) => (hidden && "none") || "flex"};
  flex: 1;
  margin-left: 10px;
`;

export default ({ actionView, onCharacterSelect, ...props }) => {
  const [focusedChar, setFocusedChar] = useState(null);
  const [turn, currentUser, characters] = useSelector((rootState) => [
    rootState.turn,
    rootState.currentUser,
    rootState.characters,
  ]);

  const thisCharDices =
    turn &&
    turn.dices &&
    currentUser &&
    turn.dices.filter((d) => d.forWho === currentUser.charId);

  console.log(turn.dices, currentUser.charId);
  // set tab options
  const navOptions = [{ children: "Inv", to: "/inventory" }];
  if (thisCharDices && thisCharDices.length > 0) {
    navOptions.push({ children: "Roll", to: "/roll" });
  }

  return (
    <StageContainer {...props}>
      <Navbar options={navOptions} />
      <ActionView>{actionView}</ActionView>
      <CharactersView>
        {Object.entries(characters || {}).map(([charId, data]) => {
          return (
            <CharacterModel
              data={data}
              onClick={() => setFocusedChar(charId)}
            />
          );
        })}
      </CharactersView>
    </StageContainer>
  );
};
