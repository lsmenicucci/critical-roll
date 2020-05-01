import io from "socket.io-client";
import { eventChannel } from "redux-saga";
import {
  fork,
  take,
  call,
  put,
  takeLatest,
  all,
  takeEvery,
} from "redux-saga/effects";
import * as actions from "../actions";

let socket;

function connect(url) {
  socket = io(url);

  return new Promise((resolve, reject) => {
    socket.on("connect", () => {
      resolve(socket);
    });

    socket.on("connect_error", () => {
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
        rollSubmitWatcher(),
        characterUpdateSubmit(),
        rollRequestWatcher(),
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
      console.log("eru");
      rej(new Error(message));
    });

    socket.emit("session.setCharacter", { charKey });
  });
}

function setupEvents() {
  return eventChannel((emit) => {
    socket.on("roll.new", ({ dices, charId, rollId }) => {
      emit(actions.newRoll({ dices, charId, rollId }));
    });

    socket.on("roll.submitted", ({ dices, charId }) => {
      emit(actions.newEvent({ type: "roll", who: charId, content: { dices } }));
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

function* rollSubmitWatcher() {
  yield takeEvery(`${actions.submitRoll}`, function* ({ payload }) {
    socket.emit("roll.submit", payload.roll);
  });
}

function* rollRequestWatcher() {
  yield takeEvery(`${actions.requestRoll}`, function* ({ payload }) {
    socket.emit("roll.request", payload);
  });
}

function* characterUpdateSubmit() {
  while (true) {
    const { payload } = yield take([`${actions.updateCharacter}`]);
    socket.emit("character.update", payload);
  }
}

function* connectionFlow() {
  while (true) {
    const connectData = take(`${actions.connect}`);

    yield call(connect, connectData.url);

    let currentUser;
    try {
      currentUser = yield call(loadSession, socket, "123");
    } catch (error) {
      console.log(":c error");
    }
  }
}

export default function* rootSaga() {
  yield all([connectWatcher(), sessionWatcher()]);
}
