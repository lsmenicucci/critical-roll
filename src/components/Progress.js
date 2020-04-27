// import node reacts
import React from "react";
import classNames from "classnames";

// import styles
import "../styles/components/progress-bar.scss";

const ProgressBar = ({ value, outOf, className }) => {
  const progressStyle = { width: `${(100 * value) / outOf}%` };
  return (
    <div className={classNames("progress-bar", className)}>
      <div className="progress-container">
        <div
          className={classNames("progress", { dange: value / outOf < 0.2 })}
          style={progressStyle}
        ></div>
      </div>
    </div>
  );
};

export default ProgressBar;
