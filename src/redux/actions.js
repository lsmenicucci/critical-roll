// import redux actions
import { createAction } from "redux-act";

// roll actions
export const requestRoll = createAction("roll.request");
export const newRoll = createAction("roll.new");
export const submitRoll = createAction("roll.submit");
export const rollSubmitted = createAction("roll.submitted");
export const updateRoll = createAction("roll.update");

// session
export const loadSession = createAction("session.load");
export const loadingSession = createAction("session.loading");
export const sessionLoaded = createAction("session.loaded");
export const sessionError = createAction("session.error");

// connections
export const connect = createAction("connection.connect");
export const connected = createAction("connection.connected");
export const connecting = createAction("connection.connecting");
export const reconnecting = createAction("connection.reconnecting");
export const disconected = createAction("connection.disconnected");
export const connectionError = createAction("conneciton.error");

// generic events
export const newEvent = createAction("event.new");

// character
export const characterUpdated = createAction("character.updated");
export const updateCharacter = createAction("character.update");
export const charactersLodaded = createAction("character.loaded");
