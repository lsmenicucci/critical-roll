// import react modules
import React from "react";
import styled from "styled-components";

// import local components
import * as themeVariables from "../../config/theme";
import SampleChar from "../../assets/images/sample-char.png";
import ProgressBar from "../Progress";

const ModelContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ShortInfo = styled.div`
  background-color: ${themeVariables.colors.black};
  border-radius: ${themeVariables.layout.borderRadius};
  font-family: ${themeVariables.font.family};
  font-size: 12px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  padding: 4px 8px;
`;

const PlayerName = styled.div`
  color: ${themeVariables.colors.whiteOne};
  margin-left: 5px;
`;

const PlayerLevelContaienr = styled.div`
  color: ${themeVariables.colors.red};
`;

const PlayerLevel = styled.span`
  color: ${themeVariables.colors.whiteOne};
`;

const LifeBar = styled(ProgressBar)`
  width: 100%;
  height: 5px;
`;

export default ({ data, ...parms }) => {
  return (
    <ModelContainer {...parms}>
      <img src={SampleChar} />
      <ShortInfo>
        <PlayerLevelContaienr>
          LV<PlayerLevel>{data.attrs.level}</PlayerLevel>
        </PlayerLevelContaienr>
        <PlayerName>{data.name}</PlayerName>
        <LifeBar
          value={data && data.attrs && data.attrs.vida}
          outOf={data && data.attrs && data.attrs.vidaMaxima}
        />
      </ShortInfo>
    </ModelContainer>
  );
};
