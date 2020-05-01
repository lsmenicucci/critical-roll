// import styled components
import styled from "styled-components";

// import theme variables
import { colors as themeColors } from "../../config/theme";

export default styled.button`
  border-radius: 4px;
  border-radius: 4px;
  border: 0;
  cursor: pointer;
  font-size: 0.75rem;
  padding: 0.2rem 0.4rem;
  transition: box-shadow 0.2s ease, transform 0.2s ease;
  outline: 0;
  background-color: ${({ light }) =>
    light ? themeColors.red : themeColors.black};
  color: ${themeColors.whiteOne};

  :hover:enabled {
    cursor: pointer;
    box-shadow: 3px 3px ${themeColors.greyOne};
    transform: translate(-3px, -3px);
  }

  :disabled {
    background-color: ${themeColors.greyOne};
  }
`;
