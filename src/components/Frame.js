// import react modules
import React from "react";
import classNames from "classnames";

// import style
import "../styles/components/frame.scss";

const Frame = ({ children, title, className }) => {
  return (
    <div className={classNames("frame", className)}>
      {title ? <div className="header">{title}</div> : ""}
      {children}
    </div>
  );
};

export default Frame;
