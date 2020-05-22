// react modules
import React, { useState } from "react";
import classNames from "classnames";
import { updatedDiff } from "deep-object-diff";
import { connect } from "react-redux";
import styled from "styled-components";

// settings & actions
import DISPLAY_PROPS from "../../config/attr-display-props";
import actions from "../../shared/actions";

// local components
import AttributeList from "./AttributeList";
import Button from "../Form/Button";
import CharacterHeader from "./Header";

const SubmitButton = styled(Button)`
  justify-self: flex-end;
`;

const PlayerProfile = ({
  minified,
  resumed,
  className,
  allCharacters,
  charId,
  editable,
  onClick,
  dispatch,
}) => {
  const { attrs: charAttrs, name, supname } = allCharacters[charId] || {};

  // define internal state
  const [localAttrs, setLocalAttrs] = useState(charAttrs);

  if (!charAttrs) return "Jogador não encontrado";

  const attrsDiff = updatedDiff(localAttrs, charAttrs);
  const hasChanged = Object.keys(attrsDiff).length > 0;

  // handle field edit events
  const handleAttrChange = ({ target }) => {
    const { limitName } = DISPLAY_PROPS[target.name];
    let value = Math.max(0, Math.floor(target.value));
    if (limitName) value = Math.min(localAttrs[limitName], value);

    setLocalAttrs({
      ...localAttrs,
      [target.name]: value,
    });
  };

  const displayedAttrs = editable ? localAttrs : charAttrs;

  return (
    <div
      className={classNames("player-profile", className, { resumed, minified })}
      onClick={onClick}
    >
      <CharacterHeader name={name} supname={supname}>
        {editable && hasChanged && (
          <SubmitButton
            className="light save-button"
            onClick={() =>
              dispatch(
                actions.updateCharacter({
                  charId,
                  newData: { ...allCharacters[charId], attrs: localAttrs },
                })
              )
            }
          >
            Salvar
          </SubmitButton>
        )}
      </CharacterHeader>

      <AttributeList attributes={displayedAttrs} />
    </div>
  );
};

const stateToProps = ({ characters }) => ({ allCharacters: characters });

export default connect(stateToProps)(PlayerProfile);
