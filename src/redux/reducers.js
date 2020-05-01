// import redux & util
import { combineReducers } from "redux";
import { createReducer } from "redux-act";
import dotProp from "dot-prop-immutable";

// import local actions
import * as actions from "./actions";

const initial = {
  connection: {
    connected: false,
    connecting: false,
    reconnecting: false,
    connectionError: false,
    url: "",
  },
  currentUser: { error: false, loading: false, loaded: false },
  rolls: [],
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

const rolls = createReducer(
  {
    [actions.sessionLoaded]: (rollList, { rolls }) => rolls || [],

    [actions.newRoll]: (rollList, newRoll) => [...rollList, newRoll],

    [actions.updateRoll]: (rollList, { rollId, diceIndex, diceValue }) =>
      rollList.map((r) => {
        if (r.rollId !== rollId) return r;

        const newRoll = dotProp.set(r, `dices.${diceIndex}.value`, diceValue);
        if (newRoll.dices.every((d) => d.value)) newRoll.allRolled = true;
        return newRoll;
      }),

    [actions.submitRoll]: (rollList, { rollId }) =>
      rollList.filter((r) => {
        console.log(r.rollId, rollId);
        return r.rollId !== rollId;
      }),
  },
  initial.rolls
);

export default combineReducers({
  feed,
  currentUser,
  characters,
  connection,
  rolls,
});
