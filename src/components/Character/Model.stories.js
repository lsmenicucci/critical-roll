import React from "react";
import { action } from "@storybook/addon-actions";
import Model from "./Model";

export default {
  component: Model,
  title: "Character Model",
};

// define sampel character data
const SAMPLE_CHAR = {
  name: "Rudy",
  supname: "The green ninja",
  attrs: {
    level: 3,
    vida: 18,
    vidaMaxima: 19,
    sorte: 8,
    forca: 10,
    agilidade: 12,
    vontade: 9,
    inteligencia: 11,
  },
};

export const sample = () => <Model characterData={SAMPLE_CHAR} />;
