// import react modules
import React from "react";
import classNames from "classnames";

// import styles
import "../../styles/components/tabs.scss";

const Tabs = ({ options, selectedOption, selectOption }) => {
  return (
    <nav className="tabs">
      {options.map((option, k) => (
        <div
          className={classNames("tab-item", {
            selected: selectedOption === option.id,
          })}
          onClick={() => selectOption(option.id)}
          key={k}
        >
          {option.name}
        </div>
      ))}
    </nav>
  );
};
export default Tabs;
