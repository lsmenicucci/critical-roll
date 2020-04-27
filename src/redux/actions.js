// import redux actions
import { createAction } from "redux-act";

// roll actions
export const newRoll = createAction("roll.new");
export const submitRoll = createAction("so");
export const updateRoll = createAction("updateRoll");

// session
export const login = createAction("login");
export const logout = createAction("logout");

// generic events
export const newEvent = createAction("event.new");

// character
export const characterUpdated = createAction("character.updated");
export const updateCharacter = createAction("character.update");
