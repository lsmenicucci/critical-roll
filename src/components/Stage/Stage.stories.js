import React from "react";
import { action } from "@storybook/addon-actions";
import Stage from "./index";

const ALL_CHARACTERS = {
  rudy: {
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
  },
  skarp: {
    name: "Skarp",
    supname: "O Viking Lidimo",
    attrs: {
      level: 3,
      vida: 10,
      vidaMaxima: 11,
      sorte: 4,
      forca: 17,
      agilidade: 12,
      vontade: 9,
      inteligencia: 8,
    },
  },
  alater: {
    name: "Alatar",
    supname: "O Mago Igneo",
    attrs: {
      level: 3,
      vida: 13,
      vidaMaxima: 13,
      sorte: 4,
      forca: 9,
      agilidade: 9,
      vontade: 18,
      inteligencia: 15,
    },
  },
  elendil: {
    name: "Elendil",
    supname: "O Cavaleiro Bastardo",
    attrs: {
      level: 2,
      vida: 9,
      vidaMaxima: 15,
      sorte: 0,
      forca: 13,
      agilidade: 8,
      vontade: 12,
      inteligencia: 11,
    },
  },
  lucky: {
    name: "Lucky",
    supname: "Os Punhu dos Deuses",
    attrs: {
      level: 3,
      vida: 0,
      vidaMaxima: 13,
      sorte: 6,
      forca: 11,
      agilidade: 15,
      vontade: 7,
      inteligencia: 12,
    },
  },
};

export default {
  component: Stage,
  title: "Stage",
};

export const empty = () => <Stage></Stage>;

export const one_character = () => (
  <Stage
    characters={{
      rudy: ALL_CHARACTERS.rudy,
    }}
  />
);

export const many_characters = () => <Stage characters={ALL_CHARACTERS} />;
