// import react
import React, { useState } from "react";
import { connect } from "react-redux";
import classNames from "classnames";

// import styles
import "../styles/layout.scss";

// import local components
import Frame from "../components/Frame";
import PlayerProfile from "../components/PlayerProfile";
import Stage from "../components/Stage";
import EventsFeed from "../components/EventsFeed";

const Dashboard = ({ characters, currentUser }) => {
  const [playerExpanded, setPlayerExpander] = useState(null);

  const party = Object.entries(characters).filter(
    ([charId]) => charId !== currentUser.charId
  );

  const currentChar = characters[currentUser.charId];

  return (
    <div className="dashboard-container">
      <div className="dashboard">
        <Stage className="stage" hasDicesToRoll />
        {currentChar ? (
          <Frame className="status" title="Status">
            <PlayerProfile playerData={currentChar} full editable />
          </Frame>
        ) : (
          <p className="status message">
            Você não esta logado em nenhum personagem :T
          </p>
        )}
        <Frame className="feed" title="Eventos">
          <EventsFeed />
        </Frame>
        <Frame className="party" title="Equipe">
          <div className="player-list">
            {party.length > 0
              ? party.map(([charId, charData], k) => (
                  <Frame className="player inset clickable" key={k}>
                    <PlayerProfile
                      playerData={charData}
                      minimized={playerExpanded !== charId}
                      onClick={() =>
                        setPlayerExpander(
                          playerExpanded !== charId ? charId : null
                        )
                      }
                    />
                  </Frame>
                ))
              : `Voce está sozinho :c`}
          </div>
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

export default connect(stateToProps)(Dashboard);
