import styled, {css} from "styled-components";

import theme from "../../config/theme.js";

export default styled.div`
  border: 1.1px ${theme.colors.greyTwo} solid;
  border-radius: 4px;
  display: flex;
  flex-flow: column;
  background-color: ${theme.colors.purple};
  padding: 0.1rem;
  transition: box-shadow 0.2s ease, transform 0.2s ease;

  ${({clickable}) => clickable && css`
   &:hover{
    cursor: pointer;
    box-shadow: 3px 3px $black;
    transform: translate(-3px, -3px);
   }
  `}
`;
