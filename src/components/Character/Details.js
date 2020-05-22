// react modules
import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";

// theme vars
import theme from "../../config/theme";

// local components
import Frame from "../Frames/Intern";

const DetailsFrame = styled(Frame)`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-flow: row;
  font-family: ${theme.font.family};
  padding: 16px;
`;

const Attributes = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-right: 20px;
`;

const Attribute = styled.span`
  display: flex;
  align-items: center;
  width: 50%;
  height: 50%;
`;

const CharacterInfo = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  width: 60%;
`;

const TitleContainer = styled.div`
  display: flex;
  width: 100%;
  flex-wrap: wrap;
`;

const Title = styled.span`
  width: 100%;
`;

const SupTitle = styled.span`
  width: 100%;
  color: ${theme.colors.greyOne};
`;

export default ({ charId, ...props }) => {
  const characters = useSelector((rootState) => rootState.characters);
  const characterData = characters && characters[charId];

  return (
    <DetailsFrame {...props}>
      <Attributes>
        <Attribute>
          F {characterData && characterData.attrs && characterData.attrs.forca}
        </Attribute>
        <Attribute>
          A{" "}
          {characterData &&
            characterData.attrs &&
            characterData.attrs.agilidade}
        </Attribute>
        <Attribute>
          V{" "}
          {characterData && characterData.attrs && characterData.attrs.vontade}
        </Attribute>
        <Attribute>
          I{" "}
          {characterData &&
            characterData.attrs &&
            characterData.attrs.inteligencia}
        </Attribute>
      </Attributes>
      <CharacterInfo>
        <TitleContainer>
          <Title>{characterData && characterData.name}</Title>
          <SupTitle>{characterData && characterData.supname}</SupTitle>
        </TitleContainer>
      </CharacterInfo>
    </DetailsFrame>
  );
};
