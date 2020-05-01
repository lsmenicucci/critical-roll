// import react modules
import React, { useState } from "react";
import styled from "styled-components";
import {
  colors as themeColors,
  layout as themeLayout,
} from "../../config/theme";
import { connect } from "react-redux";

import * as actions from "../../redux/actions";

// import local components
import TextInput from "../Form/TextField";
import Button from "../Form/Button";
import Dice from "./Dice";

const RollForm = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  padding: 0.5rem;

  * {
    margin-right: 0.2rem;
  }
`;
const DiceValueInput = styled(TextInput)`
  width: 5rem;
  text-align: center;
`;

const DicesContainer = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  padding: 0.1rem 0.2rem;
  border: 0.1rem solid ${themeColors.greyOne};
  border-radius: ${themeLayout.borderRadius};
  background-color: ${themeColors.whiteOne};
  outline: 0;
  transition: border-color 0.2s ease;
  flex-wrap: wrap;
  overflow-y: auto;
  box-sizing: border-box;
  height: 5rem;
  width: 100%;
`;

export const RollRequester = ({ charId, dispatch }) => {
  const [formData, setFormData] = useState({ dice: "20", dices: [] });

  const handleChange = ({ target }) => {
    const [diceStr] = `${target.value}`.match(/(\d+)/) || [];
    setFormData({
      ...formData,
      dice: diceStr || "",
    });
  };

  const addDice = () => {
    setFormData({
      ...formData,
      dices: [...formData.dices, { limit: formData.dice }],
    });
  };

  const removeDice = (index) =>
    setFormData({
      ...formData,
      dices: formData.dices.filter((_, k) => k !== index),
    });

  const submit = () => {
    setFormData({ ...formData, dices: [] });
    dispatch(actions.requestRoll({ charId, dices: formData.dices }));
  };

  return (
    <RollForm>
      <DiceValueInput
        placeholder="Número do dado"
        value={formData.dice && `d${formData.dice}`}
        name="dice"
        onChange={handleChange}
      />
      <Button name="add-dice" onClick={addDice}>
        +
      </Button>
      <Button disabled={formData.dices.length === 0} onClick={submit}>
        Enviar Rolagem
      </Button>
      <DicesContainer>
        {formData.dices.map(({ limit }, k) => (
          <Dice limit={limit} key={k} onClick={() => removeDice(k)} />
        ))}
      </DicesContainer>
    </RollForm>
  );
};

const stateToProps = ({ characters }) => ({ characters });

export default connect(stateToProps)(RollRequester);
