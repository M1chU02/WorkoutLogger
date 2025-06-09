const { app, BrowserWindow, ipcMain, dialog } = require("electron");
const path = require("path");
const fs = require("fs");

function createWindow() {
  const win = new BrowserWindow({
    width: 1280,
    height: 832,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
  });

  win.loadFile("renderer/index.html");
  win.webContents.openDevTools();
}

app.whenReady().then(createWindow);

ipcMain.handle("read-workouts", async () => {
  const filePath = path.join(__dirname, "data", "workouts.json");
  if (!fs.existsSync(filePath)) fs.writeFileSync(filePath, "[]");
  const data = fs.readFileSync(filePath);
  return JSON.parse(data);
});

ipcMain.handle("write-workout", async (event, newWorkout) => {
  const filePath = path.join(__dirname, "data", "workouts.json");
  let data = [];
  if (fs.existsSync(filePath)) {
    data = JSON.parse(fs.readFileSync(filePath));
  }
  data.push(newWorkout);
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
  return true;
});

ipcMain.handle("select-gpx", async () => {
  const result = await dialog.showOpenDialog({
    properties: ["openFile"],
    filters: [{ name: "GPX Files", extensions: ["gpx"] }],
  });
  return result.canceled ? null : result.filePaths[0];
});
