import React from "react";
import { action } from "@storybook/addon-actions";
import Tabs from "./Tabs";

export default {
  component: Tabs,
  title: "Tabs",
};

export const empty = () => <Tabs></Tabs>;

export const one_option = () => (
  <Tabs
    options={{
      Home: {
        tabItem: "Teste",
        page: "Essa pagina deve ser renderizada!!",
      },
    }}
  />
);

export const many_options = () => (
  <Tabs
    options={{
      home: {
        tabItem: () => <b>Testo</b>,
        page: "TEstooo!!",
      },
      inventory: {
        tabItem: () => <b>aaaa</b>,
        page: "aaaaaaaaaaaaa!!",
      },
      roll: {
        tabItem: () => <b>Inventario</b>,
        page: "Seus item: NENHUM HAUHAUAHUAHUAHUA!!",
      },
    }}
  />
);
