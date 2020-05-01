// react modules
import React from "react";
import classNames from "classnames";

// settings
import DISPLAY_PROPS from "../config/attr-display-props";

// local styles
import "../styles/components/event-item.scss";

const EventItem = ({ className, event }) => {
  const { dices } = event && event.content;

  // init events
  let eventIconClass = "";
  let makeTitle = () => "";

  if (event.type === "roll") {
    eventIconClass = "ra ra-dice-five";
    makeTitle = () => (
      <div className="event-title">
        <span className="event-who">{event.content.who}</span>
        {dices && dices.length === 1
          ? " rolou um dado"
          : ` rolou ${dices && dices.length} dados`}
      </div>
    );
  }

  if (event.type === "connected") {
    eventIconClass = "ra ra-player";
    makeTitle = () => (
      <div className="event-title">
        <span className="event-who">{event.content.who}</span>
        {" acabou de se juntar a nós."}
      </div>
    );
  }

  if (event.type === "disconnected") {
    eventIconClass = "ra ra-falling";
    makeTitle = () => (
      <div className="event-title">
        <span className="event-who">{event.content.who}</span>
        {" foi de base o/"}
      </div>
    );
  }

  if (event.type === "character.updated") {
    eventIconClass = "ra ra-falling";
    makeTitle = () => (
      <div className="event-title">
        <span className="event-who">{event.content.who}</span>
        {" teve os atributos atualizados"}
      </div>
    );
  }
  return (
    <div className={classNames("event-item", className)}>
      <i className={classNames("event-icon", eventIconClass)} />
      {makeTitle()}
      {event.type === "roll" ? (
        <div className="event-dice-list">
          {dices &&
            dices.map((dice, k) => (
              <div className="dice" key={k}>
                <span className="dice-value">{`${dice.value}`}</span>
                <span className="dice-limit">{`(d${dice.limit})`}</span>
              </div>
            ))}
        </div>
      ) : (
        ""
      )}
      {event.type === "character.updated" ? (
        <div className="event-attr-change-list">
          {Object.entries(event.content.diff).map(([attrId, value], k) => (
            <div className="attr-change" key={k}>
              <span className="attr-name">
                {DISPLAY_PROPS[attrId].displayName}:
              </span>
              <span className="attr-change-value">
                <span className="attr-value">{value.old}</span> ->{" "}
                <span className="attr-value">{value.new}</span>
              </span>
            </div>
          ))}
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default EventItem;
