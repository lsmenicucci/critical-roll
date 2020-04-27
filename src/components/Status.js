// react modules
import React from "react";
import classNames from "classnames";

// local components
import ProgressBar from "./Progress";

const Status = ({
  name,
  value,
  outOf,
  progressBar,
  iconClassName,
  editable,
  updateValue,
  updateOutOf,
}) => {
  return (
    <div className="status-frame">
      <i className={classNames("status-icon", iconClassName)} />
      <div className="status-label">{name}</div>
      {!editable ? (
        <div className="status-value">
          {outOf ? `${value}/${outOf}` : value}
        </div>
      ) : (
        <div className="status-value">
          <input
            className="editable-value"
            type="number"
            step="1"
            onChange={({ target }) => updateValue(target.value)}
            value={value}
          />
          {outOf && updateOutOf ? "/" : ""}
          {outOf && updateOutOf ? (
            <input
              className="editable-value"
              type="number"
              step="1"
              onChange={({ target }) => updateOutOf(target.value)}
              value={outOf}
            />
          ) : (
            ""
          )}
        </div>
      )}
      {progressBar ? (
        <ProgressBar className="status-bar" value={value} outOf={outOf} />
      ) : (
        ""
      )}
    </div>
  );
};

export default Status;
