// import react modules
import styled from "styled-components";

// import theme variables
import {
  colors as themeColors,
  layout as themeLayout,
  font,
} from "../../config/theme";

const TextField = styled.input`
  padding: 8px;
  border: 2px solid ${themeColors.greyOne};
  font-family: ${font.family};
  border-radius: ${themeLayout.borderRadius};
  background-color: ${themeColors.whiteOne};
  outline: 0;
  transition: border-color 0.2s ease;

  :focus {
    border-color: ${themeColors.black};
  }

  :disabled {
    border-color: ${({ success }) =>
      success ? themeColors.green : themeColors.greyOne};
  }
  ::placeholder {
    border-color: ${themeColors.greyOne};
  }
`;

export default TextField;
