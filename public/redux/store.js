// in the main store
const {
  forwardToRenderer,
  triggerAlias,
  replayActionMain,
} = require("electron-redux");
const { createStore, applyMiddleware, compose } = require("redux");
const createSagaMiddleware = require("redux-saga").default;
const reducer = require("./reducers");
const saga = require("./sagas");

module.exports = (appWindows) => {
  const sagaMiddleware = createSagaMiddleware();

  const composeEnhancers =
    (typeof window === "object" &&
      window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
    compose;

  const store = createStore(
    reducer,
    {}, // optional
    composeEnhancers(
      applyMiddleware(
        triggerAlias, // optional, see below
        sagaMiddleware,
        forwardToRenderer // IMPORTANT! This goes last
      )
    )
  );
  sagaMiddleware.run(saga, appWindows);
  replayActionMain(store);

  return store;
};
