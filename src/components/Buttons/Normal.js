import styled from "styled-components";
import { hsla } from "polished";

// import color
import * as themeVariables from "../../config/theme";

// export default styled.button`
//   background-color: ${hsla(199, 0.1, 0.955, 1.0)};
//   padding: 9px 16px 9px;
//   border-radius: 5px;
//   background: #5e0d0c;
//   border: 1px solid #4c0300;
//   box-shadow: inset 1px 1px 0px rgba(255, 255, 255, 0.25),
//     /* highlight */ inset 0 0 6px #a23227,
//     /* inner glow */ inset 0 80px 80px -40px #ac3223,
//     /* gradient */ 1px 1px 3px rgba(0, 0, 0, 0.75); /* shadow */
// `;

export default styled.button`
  cursor: pointer;
  padding: 5px 10px;
  border: 0;
  outline: 0;
  border-radius: ${themeVariables.layout.borderRadius};
  background-color: ${({ light, blue, purple }) =>
    light
      ? themeVariables.colors.whiteTwo
      : (blue && themeVariables.colors.blueOne) ||
        (purple && themeVariables.colors.purpleOne) ||
        themeVariables.colors.black};
  color: ${({ light, red, blue, purple }) =>
    (light && red && themeVariables.colors.red) ||
    (light && blue && themeVariables.colors.blueOne) ||
    (light && purple && themeVariables.colors.purpleOne) ||
    (purple && themeVariables.colors.black) ||
    themeVariables.colors.whiteOne};
  font-family: ${themeVariables.font.family};
  font-size: 18px;
  transition: transform 240ms cubic-bezier(0.175, 0.885, 0.32, 1.275),
    border-bottom 240ms cubic-bezier(0.175, 0.885, 0.32, 1.275);

  &:disabled {
    background-color: ${themeVariables.colors.greyOne};
  }
  &:active {
    transform: scale(0.95);
  }
  &:enabled:hover {
    transform: scale(1.05);
  }
`;
