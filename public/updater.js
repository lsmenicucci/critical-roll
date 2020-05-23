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
    autoUpdater.on("checking-for-update", () => {
      this.sendStatusToWindow("Checando atualizações...");
    });
    autoUpdater.on("update-available", (info) => {
      this.sendStatusToWindow("Uma atualização está disponível!");
    });
    autoUpdater.on("update-not-available", (info) => {
      this.sendStatusToWindow("Tudo atualizado :)");

      typeof onReadyCallback === "function" && onReadyCallback();
    });
    autoUpdater.on("error", (err) => {
      this.sendStatusToWindow("Falha na atualização :c");
    });
    autoUpdater.on("download-progress", (progressObj) => {
      this.sendStatusToWindow(
        `Baixando o update... (${Math.round(progressObj.percent)}%) `
      );
    });
    autoUpdater.on("update-downloaded", (info) => {
      this.sendStatusToWindow("Update downloaded");
      autoUpdater.quitAndInstall();
    });
  }
}

module.exports = UpdateWindow;
