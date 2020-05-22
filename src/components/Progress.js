// import node reacts
import React from "react";
import styled, { css } from "styled-components";

// import styled variables
import { colors as themeColors } from "../config/theme";

const BarContainer = styled.div`
  display: inline-flex;
  width: 100%;
`;

const ProgressContainer = styled.div`
  border: 1px ${themeColors.black} solid;
  border-radius: 4px;
  display: inline-flex;
  width: 100%;
`;
const Progress = styled.div`
  border-radius: 4px;
  display: inline-flex;
  background-color: ${themeColors.red};
  transition: width 0.2s ease;

  ${({ percentage }) =>
    css`
      width: ${percentage}%;
    `}
`;

const ProgressBar = ({ value, outOf, ...props }) => {
  return (
    <BarContainer {...props}>
      <ProgressContainer>
        <Progress percentage={(100 * value) / outOf} />
      </ProgressContainer>
    </BarContainer>
  );
};

export default ProgressBar;
