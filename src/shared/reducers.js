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
  currentUser: { charId: "rudy" },
  session: {},
  turn: {
    id: "1234",
    dices: [
      { id: "dice-1", type: 20, forWho: "rudy" },
      { id: "dice-2", type: 20, forWho: "rudy" },
      { id: "dice-3", type: 20, forWho: "rudy" },
      { id: "dice-4", type: 20, forWho: "rudy" },
      { id: "dice-5", type: 20, forWho: "rudy" },
      { id: "dice-6", type: 20, forWho: "rudy" },
    ],
  },
  users: {},
  characters: {
    rudy: {
      name: "Rudy",
      supname: "The green ninja",
      attrs: {
        level: 3,
        vida: 18,
        vidaMaxima: 19,
        sorte: 8,
        forca: 10,
        agilidade: 12,
        vontade: 9,
        inteligencia: 11,
      },
    },
  },
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

const currentUser = createReducer(
  {
    [actions.sessionLoaded]: (state, { charId, isMaster }) => ({
      ...state,
      charId,
      isMaster,
      loaded: true,
      error: false,
      loading: false,
    }),
    [actions.sessionError]: (currentUser, _) => ({
      ...currentUser,
      loading: false,
      error: true,
    }),
    [actions.loadingSession]: (currentUser, _) => ({
      ...currentUser,
      loading: true,
      error: false,
    }),
  },
  initial.currentUser
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
  },
  initial.turn
);

module.exports = combineReducers({
  feed,
  currentUser,
  characters,
  connection,
  turn,
});
