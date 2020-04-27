// react modules
import React, { useReducer } from "react";
import classNames from "classnames";
import dotProp from "dot-prop-immutable";
import { updatedDiff } from "deep-object-diff";
import { connect } from "react-redux";

// settings & actions
import DISPLAY_PROPS from "../config/attr-display-props";
import { updateCharacter } from "../redux/actions";

// local components
import Status from "./Status";

const updateStatusReducer = (playerData, nextStatus) => {
  let value = Math.floor(nextStatus.value);
  value = Math.max(0, value);
  if (nextStatus.limit)
    value = Math.min(playerData.stats[nextStatus.limit], value);

  return dotProp.set(playerData, `stats.${nextStatus.name}`, value);
};

// Define some display props

const PlayerProfile = ({
  minimized,
  full,
  playerData,
  charId,
  editable,
  onClick,
  dispatch,
}) => {
  const [localPlayerData, dispatchPlayerUpdate] = useReducer(
    updateStatusReducer,
    playerData
  );

  const statsDiff = updatedDiff(localPlayerData, playerData);
  const hasChanged = Object.keys(statsDiff).length > 0;

  console.log(statsDiff);
  return (
    <div
      className={classNames("player-profile", { resumed: !full, minimized })}
      onClick={onClick}
    >
      {!minimized ? (
        <div className="player-title">
          <span className="player-name">{localPlayerData.name}</span>
          <span className="player-supname">{`"${localPlayerData.supname}"`}</span>
        </div>
      ) : (
        <div className="player-title">
          <span className="player-name">{localPlayerData.name}</span>
          <span className="player-name">{`Lv ${localPlayerData.stats.level}`}</span>
        </div>
      )}

      <div className="status-list">
        {!minimized ? (
          <Status
            name="Level"
            value={localPlayerData.stats.level}
            updateValue={(nextLevel) =>
              dispatchPlayerUpdate({ name: "level", value: nextLevel })
            }
            editable={editable}
            iconClassName="ra ra-player"
          />
        ) : (
          ""
        )}
        <Status
          name="Vida"
          value={localPlayerData.stats.vida}
          outOf={localPlayerData.stats.vidaMaxima}
          updateValue={(nextLife) =>
            dispatchPlayerUpdate({
              name: "vida",
              value: nextLife,
              limit: "vidaMaxima",
            })
          }
          updateOutOf={(nextLife) =>
            dispatchPlayerUpdate({ name: "vidaMaxima", value: nextLife })
          }
          progressBar
          editable={editable}
          iconClassName="ra ra-hearts"
        />

        {full // show all attributes
          ? Object.entries(localPlayerData.stats.atributos).map(
              ([attrName, attrValue], key) => (
                <Status
                  name={DISPLAY_PROPS[attrName].name}
                  value={attrValue}
                  iconClassName={DISPLAY_PROPS[attrName].icon}
                  updateValue={(nextValue) =>
                    dispatchPlayerUpdate({
                      name: `atributos.${attrName}`,
                      value: nextValue,
                    })
                  }
                  editable={editable}
                  key={key}
                />
              )
            )
          : ""}
      </div>
      {editable && hasChanged ? (
        <button
          className="light"
          onClick={() =>
            dispatch(updateCharacter({ charId, newAttrs: localPlayerData }))
          }
        >
          Salvar
        </button>
      ) : (
        ""
      )}
    </div>
  );
};

export default connect()(PlayerProfile);
