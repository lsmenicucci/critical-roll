// import react
import React, { useState } from "react";
import { connect } from "react-redux";
import classNames from "classnames";
import styled from "styled-components";

// import styles
import "../styles/layout.scss";

// import local components
import Frame from "../components/Frame";
import CharacterCard from "../components/Card/CharacterCard";
import Tabs from "../components/Navigation/Tabs";
import EventsFeed from "../components/EventsFeed";
import RollRequester from "../components/RollRequester";

const CharacterEditableArea = styled.div`
  display: ${({ hidden }) => (hidden ? "none" : "grid")};
  grid-template-columns: 50% 50%;
  height: 100%;
  width: 100%;
`;

const MasterDashboard = ({ characters }) => {
  const party = Object.entries(characters);

  const [focusedPlayer, setFocusedPlayer] = useState(party[0] && party[0][0]);

  return (
    <div className="dashboard-container">
      <div className="master-dashboard">
        <Frame className="actions-card">
          <Tabs
            options={party.map(([charId, char]) => ({
              id: charId,
              name: char.name,
            }))}
            selectedOption={focusedPlayer}
            selectOption={setFocusedPlayer}
          />
          <Frame className="inset editable-char">
            {party.length > 0 && focusedPlayer
              ? party.map(([charId], k) => (
                  <CharacterEditableArea hidden={focusedPlayer !== charId}>
                    <CharacterCard key={k} charId={charId} editable />
                    <RollRequester charId={charId} />
                  </CharacterEditableArea>
                ))
              : "Selecione alguem"}
          </Frame>
        </Frame>
        <Frame className="feed" title="Eventos">
          <EventsFeed />
        </Frame>
      </div>
      <div className={classNames("connection-bar", { hidden: true })}>
        Connecting
      </div>
    </div>
  );
};

const stateToProps = ({ characters, currentUser }) => ({
  characters,
  currentUser: currentUser || {},
});

export default connect(stateToProps)(MasterDashboard);
