// react modules
import React, { useState } from "react";
import classNames from "classnames";
import { updatedDiff } from "deep-object-diff";
import { connect } from "react-redux";
import styled from "styled-components";

// settings & actions
import DISPLAY_PROPS from "../../config/attr-display-props";
import { updateCharacter } from "../../redux/actions";

// local components
import StatusCard from "./StatusCard";
import Button from "../Form/Button";

const SubmitButton = styled(Button)`
  justify-self: flex-end;
`;

const ProfileTitle = styled.div`
  display: flex;
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
    let value = Math.max(1, Math.floor(target.value));
    if (limitName) value = Math.min(localAttrs[limitName], value);

    setLocalAttrs({
      ...localAttrs,
      [target.name]: value,
    });
  };

  const selectedData = editable ? localAttrs : charAttrs;
  // decide which attr should be displayed
  const filteredAttrs = Object.entries(selectedData)
    .filter(
      ([attrName]) =>
        DISPLAY_PROPS[attrName] && DISPLAY_PROPS[attrName].visibleOnFull
    )
    .filter(
      ([attrName]) => !resumed || DISPLAY_PROPS[attrName].visibleOnResumed
    )
    .filter(
      ([attrName]) => !minified || DISPLAY_PROPS[attrName].visibleOnMinified
    )
    .sort(([a], [b]) => DISPLAY_PROPS[a].order - DISPLAY_PROPS[b].order);

  return (
    <div
      className={classNames("player-profile", className, { resumed, minified })}
      onClick={onClick}
    >
      {!minified ? (
        <ProfileTitle>
          <div className="player-title">
            <span className="player-name">{name}</span>
            <span className="player-supname">{`"${supname}"`}</span>
          </div>

          {editable && hasChanged && (
            <SubmitButton
              className="light save-button"
              onClick={() =>
                dispatch(
                  updateCharacter({
                    charId,
                    newData: { ...allCharacters[charId], attrs: localAttrs },
                  })
                )
              }
            >
              Salvar
            </SubmitButton>
          )}
        </ProfileTitle>
      ) : (
        <div className="player-title">
          <span className="player-name">{name}</span>
          <span className="player-name">{`Lv ${localAttrs.level}`}</span>
        </div>
      )}

      <div className="status-list">
        {filteredAttrs.map(([attrName, attrValue]) => {
          const { limitName } = DISPLAY_PROPS[attrName];
          return (
            <StatusCard
              value={attrValue}
              name={attrName}
              limit={limitName && localAttrs[limitName]}
              limitName={limitName}
              editable={editable}
              onChange={handleAttrChange}
            />
          );
        })}
      </div>
    </div>
  );
};

const stateToProps = ({ characters }) => ({ allCharacters: characters });

export default connect(stateToProps)(PlayerProfile);
