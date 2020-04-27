// import redux & util
import { combineReducers } from "redux";
import { createReducer } from "redux-act";
import dotProp from "dot-prop-immutable";

// import local actions
import {
  submitRoll,
  newRoll,
  updateRoll,
  login,
  logout,
  newEvent,
  characterUpdated,
} from "./actions";

const initial = {
  currentUser: null,
  stage: {
    currentRoll: null,
    currentTurn: null,
  },
  users: {},
  characters: {},
  feed: [],
};

const currentUser = createReducer(
  {
    [login]: (state, { charId, isMaster }) => ({ charId, isMaster }),
    [logout]: (state, payload) => {
      return null;
    },
  },
  initial.currentUser
);

const stage = createReducer(
  {
    [submitRoll]: (stage) => dotProp.set(stage, "currentRoll", null),
    [newRoll]: (stage, currentRoll) =>
      dotProp.set(stage, "currentRoll", currentRoll),
    [updateRoll]: (stage, updatedRoll) => ({
      ...stage,
      currentRoll: {
        ...updatedRoll,
        allRolled: updatedRoll.dices.every((dice) => dice.value),
      },
    }),
  },
  initial.stage
);

const feed = createReducer(
  {
    [newEvent]: (feed, event) => [...feed, event],
  },
  initial.feed
);

const characters = createReducer(
  {
    [login]: (state, { characters }) => characters,
    [characterUpdated]: (state, { charId, newAttrs }) =>
      dotProp.set(state, charId, newAttrs),
  },
  initial.characters
);

export default combineReducers({ stage, feed, currentUser, characters });
