// import react modules
import React from "react";
import styled, { css } from "styled-components";

// import style variables
import { colors as themeColors } from "../config/theme";

const FrameContainer = styled.div`
  border: 1.1px ${themeColors.greyTwo} solid;
  box-sizing:border-box;
  box-shadow: 3px 3px ${themeColors.black};
  border-radius: 4px;
  display: flex;
  flex-flow: column;
  background-color: ${themeColors.purple};
  padding: 0.1rem;
  transition: box-shadow 0.2s ease, transform 0.2s ease;
  width:100%;
  height:100%;

  ${({ inset }) =>
    inset &&
    css`
      box-shadow: none;
    `}

  ${({ clickable, inset }) =>
    clickable &&
    inset &&
    css`
      &:hover {
        cursor: pointer;
        box-shadow: 3px 3px ${themeColors.black};
        transform: translate(-3px, -3px);
      }
    `}

    ${({ highlighted }) =>
      highlighted &&
      css`
        background-color: ${themeColors.red};
        border-color: ${themeColors.darkRed};
        color: ${themeColors.whiteTwo};
      `}
`;

const FrameHeader = styled.div`
  box-sizing: border-box;
  border: 1px ${themeColors.greyTwo} solid;
  background-color: ${themeColors.whiteOne};
  border-radius: 4px;
  display: flex;
  padding: 0.1rem 0.3rem;

  ${({ dragabble }) =>
    dragabble &&
    css`
      -webkit-app-region: drag;
    `}
`;

export default ({ children, title, clickable, inset, daggable }) => {
  return (
    <FrameContainer clickable={clickable} inset={inset}>
      {title ? <FrameHeader dragabble>{title}</FrameHeader> : ""}
      {children}
    </FrameContainer>
  );
};
