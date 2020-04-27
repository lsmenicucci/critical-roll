// import redux actions
import { createAction } from "redux-act";

// roll actions
export const newRoll = createAction("roll.new");
export const submitRoll = createAction("so");
export const updateRoll = createAction("updateRoll");

export const login = createAction("login");
export const logout = createAction("logout");

// generic events
export const newEvent = createAction("event.new");
