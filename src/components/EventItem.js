// react modules
import React from "react";
import classNames from "classnames";

// local styles
import "../styles/components/event-item.scss";

const EventItem = ({ className, event }) => {
  const { dices } = event && event.content;

  // init events
  let eventIconClass = "";
  let eventTitle = "";

  if (event.type === "roll") {
    eventIconClass = "ra ra-dice-five";
    eventTitle =
      dices && dices.length === 1
        ? " rolou um dado"
        : ` rolou ${dices && dices.length} dados`;
  }

  if (event.type === "connection") {
    eventIconClass = "";
    eventTitle = " acabou de se juntar a nós.";
  }
  console.log(event.type, eventIconClass, eventTitle);

  return (
    <div className={classNames("event-item", className)}>
      <i className={classNames("event-icon", eventIconClass)} />
      <div className="event-title">
        <span className="event-who">{event.content.who}</span>
        {eventTitle}
      </div>
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
    </div>
  );
};

export default EventItem;
