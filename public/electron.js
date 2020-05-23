// import electron
const electron = require("electron");
const app = electron.app;

// import local files
const actions = require("./redux/actions");
const UpdateWindow = require("./updater");

// global variables
let updateWindow;

// import redux
const setupStore = require("./redux/store");

const store = setupStore();

// setup app
app.on("ready", () => {
  updateWindow = new UpdateWindow(() => {
    store.dispatch(actions.openView({ name: "main" }));
    updateWindow.win && updateWindow.win.close();
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
