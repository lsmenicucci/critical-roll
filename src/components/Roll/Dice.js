// import react modules
import React from "react";
import styled from "styled-components";

// import theme variables
import theme from "../../config/theme";

const DiceContainer = styled.div`
  display: flex;
  border-radius: ${theme.layout.borderRadius};
  background: ${theme.colors.whiteOne};
  color: ${({ active }) => (active ? theme.colors.red : theme.colors.blueOne)};
  padding: 2px;
  font-family: ${theme.font.family};
  font-size: 12px;
`;

const DiceValue = styled.span`
  background: ${({ active }) =>
    active ? theme.colors.red : theme.colors.blueOne};
  border-radius: ${theme.layout.borderRadius} 0 0 ${theme.layout.borderRadius};
  display: flex;
  color: ${theme.colors.whiteOne};
  justify-content: flex-end;
  padding: 0 2px;
  margin-right: 4px;
  width: 24px;
`;

export default ({ type, value, ...props }) => {
  return (
    <DiceContainer {...props}>
      <DiceValue active={props.active}>{value || "??"}</DiceValue>
      {type && `d${type}`}
    </DiceContainer>
  );
};
