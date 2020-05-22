// import redux saga
const { all } = require("redux-saga/effects");

// import local sagas
const socketSaga = require("./socket");
const viewSaga = require("./views");

module.exports = function* () {
  console.log("Running sagas");
  yield all([socketSaga(), viewSaga()]);
};
