const app = document.getElementById("app");
let gpxFilePath = ""; // still accessible to view modules

/* ---------- sidebar ------------------------------------------------ */
document.querySelectorAll(".sidebarBtn").forEach((btn) =>
  btn.addEventListener("click", () => {
    const view = btn.getAttribute("data-view");
    if (!view) return;
    document
      .querySelectorAll(".sidebarBtn")
      .forEach((b) => b.classList.toggle("active", b === btn));
    loadView(view);
  })
);

/* ---------- view loader ------------------------------------------- */
const cache = new Map(); // viewName → module
let currentView = null; // track currently-displayed view

function cleanOldStyles() {
  document
    .querySelectorAll("link[data-view-style]")
    .forEach((el) => el.remove());
}

function injectStyles(doc, view) {
  doc.querySelectorAll('link[rel="stylesheet"]').forEach((link) => {
    const href = link.getAttribute("href");
    const fixed = href.startsWith("http") ? href : `views/${view}/${href}`;
    const tag = document.createElement("link");
    tag.rel = "stylesheet";
    tag.href = fixed;
    tag.setAttribute("data-view-style", view);
    document.head.appendChild(tag);
  });
}

async function loadView(view) {
  /* ---------- let the previous view tidy up ----------------------- */
  if (currentView && cache.has(currentView)) {
    const mod = cache.get(currentView);
    if (mod?.destroy) {
      try {
        mod.destroy();
      } catch (err) {
        console.warn(`destroy() of "${currentView}" threw`, err);
      }
    }
  }

  /* ---------- fetch & inject markup ------------------------------ */
  app.innerHTML = "";
  cleanOldStyles();

  const res = await fetch(`views/${view}/${view}.html`);
  const html = await res.text();
  const doc = new DOMParser().parseFromString(html, "text/html");

  injectStyles(doc, view);
  app.innerHTML = doc.body.innerHTML;

  /* ---------- load (or reuse) the JS module ---------------------- */
  let mod = cache.get(view);
  if (!mod) {
    mod = await import(`./views/${view}/script.js?${Date.now()}`); // cache-buster for dev
    cache.set(view, mod);
  }
  if (mod?.init) mod.init(app); // give the view’s root element to the module
  currentView = view;
}

/* ---------- first screen ----------------------------------------- */
loadView("home");
