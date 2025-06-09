const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("electronAPI", {
  readWorkouts: () => ipcRenderer.invoke("read-workouts"),
  writeWorkout: (data) => ipcRenderer.invoke("write-workout", data),
  selectGPX: () => ipcRenderer.invoke("select-gpx"),
});
