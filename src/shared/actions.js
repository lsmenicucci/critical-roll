// import redux actions
const { createAction } = require("redux-act");

// roll actions
module.exports = {
  // turns
  requestTurn: createAction("turn.request"),
  updateTurn: createAction("turn.update"),
  updateDice: createAction("turn.dice"),
  submitDice: createAction("turn.diceSubmit"),
  newTurn: createAction("turn.new"),

  // session
  loadSession: createAction("session.load"),
  loadingSession: createAction("session.loading"),
  sessionLoaded: createAction("session.loaded"),
  sessionError: createAction("session.error"),

  // connections
  connect: createAction("connection.connect"),
  connected: createAction("connection.connected"),
  connecting: createAction("connection.connecting"),
  reconnecting: createAction("connection.reconnecting"),
  disconected: createAction("connection.disconnected"),
  connectionError: createAction("conneciton.error"),

  // generic events
  newEvent: createAction("event.new"),

  // character
  characterUpdated: createAction("character.updated"),
  updateCharacter: createAction("character.update"),
  charactersLodaded: createAction("character.loaded"),

  // views
  openView: createAction("view.open"),
  closeView: createAction("view.close"),
};
