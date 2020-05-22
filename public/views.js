const { BrowserWindow } = require("electron");
const isDev = require("electron-is-dev");
const path = require("path");

// import windows specs
const windowSpecs = require("../src/shared/frames");

module.exports = (frameName) => {
  if (!windowSpecs[frameName]) return;
  const windowSpec = windowSpecs[frameName];

  const windowObject = new BrowserWindow({
    width: windowSpec.width,
    height: windowSpec.height,
    frame: false,
    transparent: true,
    webPreferences: {
      nodeIntegration: true,
    },
  });
  windowObject.loadURL(
    isDev
      ? `http://localhost:3000`
      : `file://${path.join(__dirname, `../build/index.html`)}`
  );
  if (isDev) {
    // Open the DevTools.
    //BrowserWindow.addDevToolsExtension('<location to your react chrome extension>');
    windowObject.webContents.openDevTools();
  }
  windowObject.on("closed", () => (mainWindow = null));

  return windowObject;
};
