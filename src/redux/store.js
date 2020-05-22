// in the renderer store
import {
  forwardToMain,
  replayActionRenderer,
  getInitialStateRenderer,
} from "electron-redux";
import reducer from "../shared/reducers";
import { createStore, applyMiddleware, compose } from "redux";

// get the initial state from the electron reducer
const initialState = getInitialStateRenderer();

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  reducer,
  initialState,
  composeEnhancers(applyMiddleware(forwardToMain))
);

replayActionRenderer(store);

export default store;
