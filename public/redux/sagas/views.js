const { takeLatest, all } = require("redux-saga/effects");
const actions = require("../actions");

// import local sagas
const createView = require("../../views");

const appViews = {};

function* viewOpenWatcher() {
  yield takeLatest(`${actions.openView}`, function* ({ payload }) {
    const { name } = payload;

    if (!appViews[name]) {
      appViews[name] = createView(name);
    }
  });
}

function* closeViewWatcher() {
  yield takeLatest(`${actions.closeView}`, function* ({ payload }) {
    const { name } = payload;

    if (appViews[name]) {
      appViews[name].close();
      appViews[name] = null;
    }
  });
}

module.exports = function* rootViewSaga() {
  yield all([viewOpenWatcher(), closeViewWatcher()]);
};
