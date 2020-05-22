import React from "react";
import { addDecorator } from "@storybook/react";

// import global style
import GlobalStyle from "../src/styles/global";
import "../src/styles/fonts.css";

const ApplyGlobalStyles = (st) => (
  <React.Fragment>
    <GlobalStyle />
    {st()}
  </React.Fragment>
);

addDecorator(ApplyGlobalStyles);
