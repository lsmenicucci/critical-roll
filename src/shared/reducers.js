// import redux & util
const { combineReducers } = require("redux");
const { createReducer } = require("redux-act");
const dotProp = require("dot-prop-immutable");

// import local actions
const actions = require("./actions");

const initial = {
  connection: {
    connected: false,
    connecting: false,
    reconnecting: false,
    connectionError: false,
    url: "",
  },
  session: {},
  turn: null,
  users: {},
  characters: {},
  feed: [],
};

const connection = createReducer(
  {
    [actions.reconnecting]: (connection) => ({
      ...connection,
      reconnecting: true,
      connectionError: false,
    }),
    [actions.connecting]: (connection) => ({
      ...connection,
      connecting: true,
      connectionError: false,
    }),
    [actions.connected]: (connection, action) => ({
      ...connection,
      url: action.url,
      connected: true,
      connecting: false,
      reconnecting: false,
    }),
    [actions.connectionError]: (connection, action) => ({
      ...connection,
      url: action.url,
      connected: false,
      connecting: false,
      reconnecting: false,
      connectionError: true,
    }),
  },
  initial.connection
);

const session = createReducer(
  {
    [actions.sessionLoaded]: (state, { charId, isMaster }) => ({
      ...state,
      charId,
      isMaster,
      loaded: true,
      error: false,
      loading: false,
    }),
    [actions.sessionError]: (session, _) => ({
      ...session,
      loading: false,
      error: true,
    }),
    [actions.loadingSession]: (session, _) => ({
      ...session,
      loading: true,
      error: false,
    }),
  },
  initial.session
);

const feed = createReducer(
  {
    [actions.newEvent]: (feed, event) => [...feed, event],
  },
  initial.feed
);

const characters = createReducer(
  {
    [actions.sessionLoaded]: (state, { characters }) => characters,
    [actions.characterUpdated]: (state, { charId, newData }) => ({
      ...state,
      [charId]: newData,
    }),
  },
  initial.characters
);

const turn = createReducer(
  {
    [actions.updateTurn]: (currentTurn, { diceId, value }) => {
      return (
        currentTurn &&
        currentTurn.dices.map((dice) =>
          dice.id === diceId ? { ...dice, value } : dice
        )
      );
    },
    [actions.newTurn]: (currentTurn, newTurn) => newTurn,
    [actions.updateDice]: (currentTurn, { dice }) =>
      (currentTurn && {
        ...currentTurn,
        dices:
          currentTurn &&
          currentTurn.dices.map((d) => (d.id === dice.id ? dice : d)),
      }) ||
      null,
  },
  initial.turn
);

module.exports = combineReducers({
  feed,
  session,
  characters,
  connection,
  turn,
});
