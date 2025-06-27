const app = document.getElementById("app");
let gpxFilePath = "";

async function loadView(view) {
  const res = await fetch(`views/${view}/${view}.html`);
  const html = await res.text();

  // Parse the fetched markup once
  const parsed = new DOMParser().parseFromString(html, "text/html");

  /* ---------- styles ---------- */
  parsed.querySelectorAll('link[rel="stylesheet"]').forEach((link) => {
    // fix relative paths that were written for the view folder
    const href = link.getAttribute("href");
    const fixed = href.startsWith("http") ? href : `views/${view}/${href}`;
    const tag = document.createElement("link");
    tag.rel = "stylesheet";
    tag.href = fixed;
    document.head.appendChild(tag);
  });

  /* ---------- scripts ---------- */
  parsed.querySelectorAll("script").forEach((old) => {
    const tag = document.createElement("script");
    if (old.src) {
      const src = old.getAttribute("src");
      tag.src = src.startsWith("http") ? src : `views/${view}/${src}`;
    } else {
      tag.textContent = old.textContent;
    }
    document.body.appendChild(tag);
  });

  /* ---------- markup ---------- */
  app.innerHTML = parsed.body.innerHTML; // only what was inside <body>

  try {
    const module = await import(`./views/${view}/script.js`);
    if (module.init) module.init();
  } catch (e) {
    console.error("Error loading module:", e);
  }
}

/*async function loadHome() {
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
}*/

loadView("home"); // Load default view on app start
