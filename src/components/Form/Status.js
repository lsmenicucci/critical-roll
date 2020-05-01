// react modules
import React from "react";

const Status = ({ name, value, editable, onChange }) => {
  if (!editable) {
    return <div className="status-value">{value}</div>;
  }

  return (
    <div className="status-value">
      <input
        className="editable-value"
        type="number"
        name={name}
        step="1"
        onChange={onChange}
        value={value}
      />
    </div>
  );
};

export default Status;
