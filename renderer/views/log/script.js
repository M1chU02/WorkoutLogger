let selectListener = null;

export function init(root) {
  const forms = {
    strength: /* html */ `
      <div class="workoutDetails">
        <input type="text" id="duration" placeholder="Duration (e.g. 00:45)" required />
        <input type="text" id="calories" placeholder="Calories burned (kcal)" />
        <textarea id="notes" placeholder="Notes..."></textarea>
      </div>
      <button type="submit">+ Log activity</button>`,

    cycling: /* html */ `
      <div class="workoutDetails">
        <input type="text" id="duration" placeholder="Duration (e.g. 00:45)" required />
        <input type="text" id="distance" placeholder="Distance (km)" />
        <input type="text" id="elevation" placeholder="Elevation gain (m)" />
        <textarea id="notes" placeholder="Notes..."></textarea>
      </div>
      <div id="gpxUpload">
        <button type="button" id="uploadBtn">Upload GPX</button>
        <span id="gpxPath"></span>
      </div>
      <button type="submit">+ Log activity</button>`,

    running: /* html */ `
      <div class="workoutDetails">
        <input type="text" id="duration" placeholder="Duration (e.g. 00:45)" required />
        <input type="text" id="distance" placeholder="Distance (km)" />
        <input type="text" id="elevation" placeholder="Elevation gain (m)" />
        <textarea id="notes" placeholder="Notes..."></textarea>
      </div>
      <div id="gpxUpload">
        <button type="button" id="uploadBtn">Upload GPX</button>
        <span id="gpxPath"></span>
      </div>
      <button type="submit">+ Log activity</button>`,

    hiking: /* html */ `
      <div class="workoutDetails">
        <input type="text" id="duration" placeholder="Duration (e.g. 00:45)" required />
        <input type="text" id="distance" placeholder="Distance (km)" />
        <input type="text" id="elevation" placeholder="Elevation gain (m)" />
        <textarea id="notes" placeholder="Notes..."></textarea>
      </div>
      <div id="gpxUpload">
        <button type="button" id="uploadBtn">Upload GPX</button>
        <span id="gpxPath"></span>
      </div>
      <button type="submit">+ Log activity</button>`,
  };

  const workoutSelect = root.querySelector("#type");
  const formContent = root.querySelector("#formContent");

  const loadForm = (type) =>
    (formContent.innerHTML = forms[type] ?? forms.strength);

  /* first render */
  loadForm(workoutSelect.value);

  /* listener */
  selectListener = (e) => loadForm(e.target.value);
  workoutSelect.addEventListener("change", selectListener);
}

export function destroy() {
  const workoutSelect = document.querySelector("#type");
  if (workoutSelect && selectListener) {
    workoutSelect.removeEventListener("change", selectListener);
  }
  selectListener = null;
}
