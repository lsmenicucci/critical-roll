// react modules
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import deepEqual from "deep-equal";

// icons
import { faSave } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// theme vars
import theme from "../../config/theme";

// import actions
import actions from "../../shared/actions";

// local components
import ViewWindow from "../Frames/View";
import Button from "../Buttons/Normal";

const DetailedView = styled(ViewWindow)`
  display: flex;
  flex-wrap: wrap;
`;

const Attributes = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const Attribute = styled.span`
  display: flex;
  align-items: center;
  width: 33%;
  height: 50%;
`;

const CharacterInfo = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-direction: row;
  width: 100%;
`;

const TitleContainer = styled.div`
  display: flex;
  width: 80%;
  flex-wrap: wrap;
  font-family: ${theme.font.family};
`;

const Title = styled.span`
  width: 100%;
`;

const SupTitle = styled.em`
  width: 100%;
  color: ${theme.colors.greyOne};
  font-size: 12px;
`;

const AttributeValue = styled.input`
  text-justify: right;
  background: transparent;
  border: none;
  outline: 0;
  width: 48px;
  font-family: ${theme.font.family};
`;

const SaveButton = styled(Button)`
  width: 35px;
  height: 35px;
`;

export default ({ charId, ...props }) => {
  const [localAttrs, setLocalAttrs] = useState({});

  // redux hooks
  const [characters, session] = useSelector((rootState) => [
    rootState.characters,
    rootState.session,
  ]);
  const dispatch = useDispatch();

  const characterData = characters && characters[charId];

  useEffect(() => {
    if (characterData && characterData.attrs) {
      setLocalAttrs(characterData.attrs);
    }
  }, [characterData]);

  const attrsChanges = !deepEqual(localAttrs, characterData.attrs);

  const handleAttrUpdate = (evt) => {
    const { name, value } = evt.target;

    let numericValue = value.replace(/[^0-9]/g, "") || 1;

    // bound values
    numericValue = Math.max(0, numericValue);
    if (name === "vida" && localAttrs.vidaMaxima) {
      numericValue = Math.min(localAttrs.vidaMaxima, numericValue);
    }

    setLocalAttrs({ ...localAttrs, [name]: numericValue });
  };

  const submitChanges = () => {
    dispatch(
      actions.updateCharacter({
        charId,
        newData: { ...characterData, attrs: localAttrs },
      })
    );
  };

  return (
    <DetailedView {...props}>
      <CharacterInfo>
        <TitleContainer>
          <Title>{characterData && characterData.name}</Title>
          <SupTitle>{characterData && characterData.supname}</SupTitle>
        </TitleContainer>
        {attrsChanges && (
          <SaveButton onClick={submitChanges}>
            <FontAwesomeIcon icon={faSave} />
          </SaveButton>
        )}
      </CharacterInfo>
      <Attributes>
        <Attribute>
          <i class="ra ra-muscle-up" />
          <AttributeValue
            value={localAttrs.forca}
            name="forca"
            type="number"
            onChange={handleAttrUpdate}
            disabled={session && !session.isMaster}
          />
        </Attribute>
        <Attribute>
          <i class="ra ra-player-dodge" />
          <AttributeValue
            value={localAttrs.agilidade}
            name="agilidade"
            type="number"
            onChange={handleAttrUpdate}
            disabled={session && !session.isMaster}
          />
        </Attribute>
        <Attribute>
          <i class="ra ra-aware" />
          <AttributeValue
            value={localAttrs.vontade}
            name="vontade"
            type="number"
            onChange={handleAttrUpdate}
            disabled={session && !session.isMaster}
          />
        </Attribute>
        <Attribute>
          <i class="ra ra-aura" />
          <AttributeValue
            value={localAttrs.inteligencia}
            name="inteligencia"
            type="number"
            onChange={handleAttrUpdate}
            disabled={session && !session.isMaster}
          />
        </Attribute>
        <Attribute>
          <i class="ra ra-hearts" />
          <AttributeValue
            value={localAttrs.vida}
            name="vida"
            type="number"
            onChange={handleAttrUpdate}
            disabled={session && !session.isMaster}
          />
        </Attribute>
        <Attribute>
          <i class="ra  ra-glass-heart" />
          <AttributeValue
            value={localAttrs.vidaMaxima}
            name="vidaMaxima"
            type="number"
            onChange={handleAttrUpdate}
            disabled={session && !session.isMaster}
          />
        </Attribute>
      </Attributes>
    </DetailedView>
  );
};
