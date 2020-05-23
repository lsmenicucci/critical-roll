// import react modules
import React, { useState } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";

// import icons
import { faPlus, faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// import actions
import actions from "../../shared/actions";

// import theme variables
import theme from "../../config/theme";

// import local components
import Button from "../Buttons/Normal";
import ViewWindow from "../Frames/View";
import DiceComponent from "./Dice";

const ViewConainer = styled.div`
  display: flex;
  background-color: ${theme.colors.whiteTwo};
  flex: 1;
  width: 100%;
  padding: 16px;
`;

const CharacterList = styled.div`
  display: flex;
  justify-content: space-around;
  width: 100%;
`;

const CharacterDicesContainer = styled(ViewWindow)`
  flex-flow: column;
  flex: 1;
  padding: 4px;
  margin: 0 2px;
`;

const DiceRequesterHeader = styled.div`
  display: flex;
  box-sizing: border-box;
  justify-content: space-between;
  background-color: ${theme.colors.blueOne};
  font-family: ${theme.font.family};
  padding: 4px;
  width: 100%;
`;

const CharacterDices = styled.div`
  align-items: flex-start;
  background-color: ${theme.colors.whiteTwo};
  border-radius: ${theme.layout.borderRadius};
  display: flex;
  flex-wrap: wrap;
  flex: 1;
  padding: 4px;
  overflow-y: auto;
  max-height: 50px;
`;

const AddButton = styled(Button)`
  width: 16px;
  height: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
`;

const Dice = styled(DiceComponent)`
  margin-right: 4px;
  margin-bottom: 4px;
`;

export default (props) => {
  const [dices, setDices] = useState([{ forWho: "rudy" }]);
  const [characters, turn] = useSelector((state) => [
    state.characters,
    state.turn,
  ]);

  const dispatch = useDispatch();

  const removeDice = (diceKey) => {
    setDices(dices.filter((_, k) => k !== diceKey));
  };

  const addDice = (forWho) => setDices([...dices, { forWho }]);

  const editDice = (diceKey, type) =>
    setDices(dices.map((d, k) => (k === diceKey ? { ...d, type } : d)));

  const submitRoll = () => {
    console.log(dices);
    const validDices = dices.filter((d) => d.type && d.type < 99 && d.type > 0);
    console.log(validDices);
    if (validDices.length > 0) {
      dispatch(actions.requestTurn({ dices: validDices }));
    }
  };

  return (
    <ViewConainer {...props}>
      <CharacterList>
        {Object.entries(characters || {}).map(([charId, charData]) => (
          <CharacterDicesContainer blue>
            <DiceRequesterHeader>
              {charData.name}
              <AddButton light blue onClick={() => addDice(charId)}>
                <FontAwesomeIcon size="xs" icon={faPlus} />
              </AddButton>
            </DiceRequesterHeader>
            <CharacterDices>
              {dices.map((dice, k) =>
                dice.forWho === charId ? (
                  <Dice
                    editable
                    onEdit={(v) => editDice(k, v)}
                    onAuxClick={() => removeDice(k)}
                  />
                ) : (
                  ""
                )
              )}
            </CharacterDices>
          </CharacterDicesContainer>
        ))}
      </CharacterList>
      <Button blue onClick={submitRoll} disabled={turn}>
        <FontAwesomeIcon icon={faPaperPlane} />
      </Button>
    </ViewConainer>
  );
};
