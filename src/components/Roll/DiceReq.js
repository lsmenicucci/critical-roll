import React from "react";
import styled from "styled-components";
import { colors as themeColors } from "../../config/theme";

const DiceContainer = styled.div`
  border-radius: 4px;
  background-color: ${themeColors.black};
  font-size: 0.75rem;
  margin-right: 0.1rem;
  margin-bottom: 0.1rem;
  padding: 0.1rem 0.2rem;

  &:hover {
    cursor: pointer;
  }
`;

const DiceValue = styled.span`
  color: ${themeColors.white};
`;

const DiceLimit = styled.span`
  color: ${themeColors.greyOne};
`;

export default ({ value, limit, onClick }) => (
  <DiceContainer onClick={onClick}>
    {value && <DiceValue>{value}</DiceValue>}
    <DiceLimit>{`(d${limit})`}</DiceLimit>
  </DiceContainer>
);
