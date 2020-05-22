// import electron
const electron = require("electron");
const app = electron.app;
const actions = require("../src/shared/actions");

// import util & dev-tools

const {
  default: installExtension,
  REDUX_DEVTOOLS,
} = require("electron-devtools-installer");

// import redux
const setupStore = require("./redux/store");

const store = setupStore();

// install some dev tools
app.whenReady().then(() => {
  console.log("Installing devtools extensions");
  installExtension(REDUX_DEVTOOLS)
    .then((name) => console.log(`Added Extension:  ${name}`))
    .catch((err) => console.log("An error occurred: ", err));
});

// setup app
app.on("ready", () => {
  store.dispatch(actions.openView({ name: "main" }));
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (appWindows.login === null) {
  }
});
