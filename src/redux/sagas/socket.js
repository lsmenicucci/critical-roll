import io from "socket.io-client";
import { eventChannel } from "redux-saga";
import { fork, take, call, put, cancel } from "redux-saga/effects";
import { newRoll, submitRoll, login, logout, newEvent } from "../actions";

function connect() {
  const socket = io("http://localhost:3000");

  return new Promise((resolve) => {
    socket.on("connect", () => {
      resolve(socket);
    });
  });
}

function loadSession(socket, charKey) {
  return new Promise((res, rej) => {
    socket.on("session.data", (currentUser) => {
      res(currentUser);
    });

    socket.on("session.characterError", ({ message }) => {
      rej(new Error(message));
    });

    socket.emit("session.setCharacter", { charKey });
  });
}

/** @param {io} socket */
function setup(socket) {
  return eventChannel((emit) => {
    socket.on("roll.request", ({ dices, who }) => {
      emit(newRoll({ dices, who }));
    });

    socket.on("connection.new", ({ who }) => {
      emit(newEvent({ type: "connection", content: { who } }));
    });

    return () => {};
  });
}

function* read(socket) {
  const channel = yield call(setup, socket);
  while (true) {
    let action = yield take(channel);
    yield put(action);
  }
}

function* rollSubmit(socket) {
  while (true) {
    const { payload } = yield take([`${submitRoll}`]);
    socket.emit("roll.submit", payload);
  }
}

function* handleIO(socket) {
  yield fork(read, socket);
  yield fork(rollSubmit, socket);
}

function* flow() {
  while (true) {
    const socket = yield call(connect);

    let currentUser;
    try {
      currentUser = yield call(loadSession, socket, "123");
      yield put(login(currentUser));
    } catch (error) {
      console.log(":c error");
    }

    // handdle tasks
    const task = yield fork(handleIO, socket);

    let action = yield take(`${logout}`);
    yield cancel(task);
    socket.emit("logout");
  }
}

export default function* rootSaga() {
  yield fork(flow);
}
