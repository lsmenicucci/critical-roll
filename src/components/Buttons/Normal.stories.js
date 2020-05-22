import React from "react";
import { action } from "@storybook/addon-actions";
import NormalButton from "./Normal";

export default {
  component: NormalButton,
  title: "Normal Button",
};

export const sample = () => <NormalButton>Teste</NormalButton>;
