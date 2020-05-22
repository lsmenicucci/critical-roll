// import react modules
import styled from "styled-components";

// import theme variables
import theme from "../../config/theme";

// import local button
import NormalButton from "./Normal";

export default styled(NormalButton)`
  background-color: ${({ selected }) =>
    selected ? theme.colors.purpleTwo : theme.colors.purpleOne};
  color: ${theme.colors.black};
  text-decoration: none;
`;
