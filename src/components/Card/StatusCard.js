// react modules
import React from "react";
import classNames from "classnames";

// import config
import ATTR_PROPS from "../../config/attr-display-props";

// local components
import ProgressBar from "../Progress";
import Status from "../Form/Status";

const StatusCard = ({ name, value, limit, limitName, editable, onChange }) => {
  const { icon: iconClassName } = ATTR_PROPS[name];

  return (
    <div className="status-frame">
      <i className={classNames("status-icon", iconClassName)} />
      <div className="status-label">{ATTR_PROPS[name].displayName}</div>
      <Status
        name={name}
        value={value}
        editable={editable}
        onChange={onChange}
      />
      {limit && limitName ? "/" : ""}
      {limit && limitName ? (
        <Status
          name={limitName}
          value={limit}
          editable={editable}
          onChange={onChange}
        />
      ) : (
        ""
      )}
      {limit && limitName ? (
        <ProgressBar className="status-bar" value={value} outOf={limit} />
      ) : (
        ""
      )}
    </div>
  );
};

export default StatusCard;
