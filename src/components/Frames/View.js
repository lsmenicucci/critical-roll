// import react modules
import styled from "styled-components";

// import theme variables
import theme from "../../config/theme";

export default styled.div`
  background: ${({ red, blue }) =>
    (red && theme.colors.red) ||
    (blue && theme.colors.blueOne) ||
    theme.colors.purpleOne};
  border-radius: ${theme.layout.borderRadius};
  box-sizing: border-box;
  color: ${({ red, blue }) =>
    ((red || blue) && theme.colors.whiteOne) || theme.colors.black};
  display: flex;
  flex-wrap: wrap;
  padding: 8px;
  max-height: 100%;
`;
