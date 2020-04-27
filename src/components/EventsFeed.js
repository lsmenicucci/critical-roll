// import react components
import React from "react";
import ScrollDown from "react-scroll-to-bottom";
import { connect } from "react-redux";

// import styling
import "../styles/components/events-feed.scss";

// local components
import EventItem from "./EventItem";

const EventsFeed = ({ events }) => {
  return (
    <ScrollDown
      className="events-feed"
      followButtonClassName="jump-to-bottom-button"
    >
      {events.map((event, k) => (
        <EventItem event={event} key={k} />
      ))}
    </ScrollDown>
  );
};

const stateToProps = ({ feed }) => ({ events: feed });

export default connect(stateToProps)(EventsFeed);
