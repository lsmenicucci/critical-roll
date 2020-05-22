// import rect modules
import React from "react";
import styled from "styled-components";

// import theme variables
import theme from "../../config/theme";

// local components
import RollObserverComponent from "./Observer";

const RollObserver = styled(RollObserverComponent)`
  max-height: 100%;
`;

export default () => {
  return <RollObserver charId="rudy"></RollObserver>;
};
