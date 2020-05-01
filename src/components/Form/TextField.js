// import react modules
import styled from "styled-components";

// import theme variables
import {
  colors as themeColors,
  layout as themeLayout,
} from "../../config/theme";

const TextField = styled.input`
  padding: 0.1rem 0.2rem;
  border: 0.1rem solid ${themeColors.greyOne};
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
