// import redux saga
import { all } from "redux-saga/effects";

// import local sagas
import socketSaga from "./socket";

export default function* () {
  yield all([socketSaga()]);
}
