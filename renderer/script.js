const app = document.getElementById("app");
let gpxFilePath = "";

async function loadView(view) {
  const res = await fetch(`views/${view}/${view}.html`);
  const html = await res.text();
  app.innerHTML = html;

  if (view === "home") loadHome();
  if (view === "log") initLogForm();
}

async function loadHome() {
  const container = document.getElementById("recentWorkouts");
  const workouts = await window.electronAPI.readWorkouts();
  container.innerHTML = workouts
    .slice(-5)
    .reverse()
    .map((w) => `<div>${w.date} - ${w.type} (${w.duration})</div>`)
    .join("");
}

function initLogForm() {
  const form = document.getElementById("logForm");
  const gpxPathSpan = document.getElementById("gpxPath");

  document.getElementById("uploadBtn").onclick = async () => {
    const result = await window.electronAPI.selectGPX();
    if (result) {
      gpxFilePath = result;
      gpxPathSpan.textContent = result.split("\\").pop();
    }
  };

  form.onsubmit = async (e) => {
    e.preventDefault();
    const workout = {
      id: crypto.randomUUID(),
      date: document.getElementById("date").value,
      type: document.getElementById("type").value,
      duration: document.getElementById("duration").value,
      distance: parseFloat(document.getElementById("distance").value) || 0,
      notes: document.getElementById("notes").value,
      gpxPath: gpxFilePath,
    };
    await window.electronAPI.writeWorkout(workout);
    loadView("home");
  };
}

loadView("home"); // Load default view on app start
