// import react modules
import React from "react";
import { useSelector } from "react-redux";
import styled, { css } from "styled-components";

// import local components
import CharacterModelComponent from "../Character/Model";

// import theme variables
import theme from "../../config/theme";

const StageContainer = styled.div`
  align-items: center;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  background: ${theme.colors.whiteTwo};
  padding: 2rem;
  cursor: pointer;
`;

const CharacterModel = styled(CharacterModelComponent)`
  display: ${({ hidden }) => (hidden && "none") || "flex"};
  margin-left: 10px;
`;

export default ({ onCharacterSelect, ...props }) => {
  const characters = useSelector((rootState) => rootState.characters);
  console.log(characters);

  return (
    <StageContainer {...props}>
      {Object.entries(characters || {}).map(([charId, data]) => {
        return (
          <CharacterModel
            data={data}
            onClick={() => onCharacterSelect(charId)}
          />
        );
      })}
    </StageContainer>
  );
};
