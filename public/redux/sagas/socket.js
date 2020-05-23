const io = require("socket.io-client");
const { eventChannel } = require("redux-saga");
const {
  fork,
  take,
  call,
  put,
  takeLatest,
  all,
  takeEvery,
} = require("redux-saga/effects");
const actions = require("../actions");

let socket;

function connect(url) {
  socket = io(url);

  return new Promise((resolve, reject) => {
    socket.on("connect", () => {
      resolve(socket);
    });

    socket.on("connect_error", (err) => {
      console.log(err);
      reject(false);
    });

    socket.on("connect_timeout", () => {
      reject(false);
    });
  });
}

function* connectWatcher() {
  yield takeLatest(actions.connect.getType(), function* ({ payload }) {
    try {
      yield put(actions.connecting());
      yield call(connect, payload.url);
      yield put(actions.connected({ url: payload.url }));
      yield fork(readSocket);

      // watch for further actions
      yield all([
        characterUpdateSubmit(),
        rollRequestWatcher(),
        diceSubmitWatcher(),
      ]);
    } catch (error) {
      yield put(actions.connectionError({ message: error }));
      console.error(error);
    }
  });
}

function* sessionWatcher() {
  yield takeLatest(actions.loadSession.getType(), function* ({ payload }) {
    try {
      yield put(actions.loadingSession());
      const sessionData = yield call(loadSession, payload.charKey);
      yield put(actions.sessionLoaded(sessionData));
    } catch (error) {
      yield put(actions.sessionError());
    }
  });
}

function loadSession(charKey) {
  return new Promise((res, rej) => {
    socket.on("session.data", (sessionData) => {
      console.log(sessionData);
      res(sessionData);
    });

    socket.on("session.invalidCharkey", ({ message }) => {
      rej(new Error(message));
    });

    socket.emit("session.setCharacter", { charKey });
  });
}

function setupEvents() {
  return eventChannel((emit) => {
    socket.on("turn.new", (turnData) => {
      emit(actions.newTurn(turnData));
    });

    socket.on("turn.update", ({ dices, charId }) => {
      emit(actions.newEvent({ type: "roll", content: { dices, who: charId } }));
    });

    socket.on("turn.dice", (diceUpdate) => {
      console.log(diceUpdate);
      emit(actions.updateDice(diceUpdate));
    });

    socket.on("connection.new", ({ who }) => {
      emit(actions.newEvent({ type: "connected", content: { who } }));
    });

    socket.on("character.updated", ({ charId, who, newData, diff }) => {
      emit(
        actions.newEvent({ type: "character.updated", content: { who, diff } })
      );
      console.log(charId, newData);
      emit(actions.characterUpdated({ charId, newData }));
    });
    return () => {};
  });
}

function* readSocket() {
  const channel = yield call(setupEvents);
  while (true) {
    let action = yield take(channel);
    yield put(action);
  }
}

function* diceSubmitWatcher() {
  yield takeEvery(`${actions.submitDice}`, function* ({ payload }) {
    socket.emit("turn.diceSubmit", payload);
  });
}

function* rollRequestWatcher() {
  yield takeEvery(`${actions.requestTurn}`, function* ({ payload }) {
    socket.emit("turn.request", payload);
  });
}

function* characterUpdateSubmit() {
  yield takeEvery(`${actions.updateCharacter}`, function* ({ payload }) {
    socket.emit("character.update", payload);
  });
}

module.exports = function* rootSaga() {
  yield all([connectWatcher(), sessionWatcher()]);
};
