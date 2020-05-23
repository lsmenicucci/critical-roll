const { autoUpdater } = require("electron-updater");
const isDev = require("electron-is-dev");
const { app, BrowserWindow } = require("electron");

class UpdateWindow {
  constructor(onReadyCallback) {
    // if (isDev) {
    //   return typeof onReadyCallback === "function" && onReadyCallback();
    // }
    this.win = new BrowserWindow({
      width: 370,
      height: 70,
      frame: false,
      webPreferences: {
        nodeIntegration: true,
      },
    });
    //this.win.webContents.openDevTools();
    this.win.on("closed", () => {
      this.win = null;
    });
    this.win.loadURL(`file://${__dirname}/update.html#v${app.getVersion()}`);

    // start update process
    this.setupUpdatesEvents(onReadyCallback);
    autoUpdater.checkForUpdatesAndNotify();
  }

  sendStatusToWindow(text) {
    console.log("->", text);
    this.win && this.win.webContents.send("message", text);
  }

  setupUpdatesEvents(onReadyCallback) {
    console.log("setting up events");
    autoUpdater.on("checking-for-update", () => {
      this.sendStatusToWindow("Checking for update...");
    });
    autoUpdater.on("update-available", (info) => {
      this.sendStatusToWindow("Update available.");
    });
    autoUpdater.on("update-not-available", (info) => {
      this.sendStatusToWindow("This is the last version!");

      typeof onReadyCallback === "function" && onReadyCallback();
    });
    autoUpdater.on("error", (err) => {
      this.sendStatusToWindow("Error in auto-updater. " + err);
    });
    autoUpdater.on("download-progress", (progressObj) => {
      let log_message = "Download speed: " + progressObj.bytesPerSecond;
      log_message = log_message + " - Downloaded " + progressObj.percent + "%";
      log_message =
        log_message +
        " (" +
        progressObj.transferred +
        "/" +
        progressObj.total +
        ")";
      this.sendStatusToWindow(log_message);
    });
    autoUpdater.on("update-downloaded", (info) => {
      this.sendStatusToWindow("Update downloaded");
      autoUpdater.quitAndInstall();
    });
  }
}

module.exports = UpdateWindow;
