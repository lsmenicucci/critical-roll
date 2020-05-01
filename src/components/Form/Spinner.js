// import react modules
import React from "react";
import Loader from "react-loader-spinner";

// import theme variables
import { colors as themeColors } from "../../config/theme";

export default ({ color }) => (
  <Loader type="ThreeDots" color={color || themeColors.whiteOne} />
);
