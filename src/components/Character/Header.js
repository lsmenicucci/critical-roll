// import react modules
import React from "react";
import styled from "styled-components";

// import themed variables
import { colors as themeColors } from "../../config/theme";

const ProfileHeader = styled.div`
  display: flex;
`;

const ProfileTitle = styled.div`
  align-content: start;
  display: flex;
  flex-wrap: wrap;
  width: 100%;
`;
const CharacterName = styled.div`
  font-size: 1.25rem;
  padding: 0 0.5rem;
`;
const CharacterSupname = styled.div`
  padding: 0 0.5rem;
  color: ${themeColors.greyOne};
  font-style: italic;
  font-size: 1rem;
  width: 100%;
`;

export default ({ name, supname, children }) => (
  <ProfileHeader>
    <ProfileTitle>
      <CharacterName>{name}</CharacterName>
      <CharacterSupname>{supname}</CharacterSupname>
      {children}
    </ProfileTitle>
  </ProfileHeader>
);
