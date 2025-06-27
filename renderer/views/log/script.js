const forms = {
  strength: `
      <div class="workoutDetails">
        <input type="text" id="duration" placeholder="Duration (e.g. 00:45)" required />
        <input type="text" id="distance" placeholder="Distance in km" />
        <textarea id="notes" placeholder="Notes..."></textarea>
      </div>
      <button type="submit">+ Log activity</button>`,

  cycling: `
      <div class="workoutDetails">
        <input type="text" id="duration" placeholder="Duration (e.g. 00:45)" required />
        <input type="text" id="calories" placeholder="Calories burned" />
        <textarea id="notes" placeholder="Notes..."></textarea>
      </div>
      <button type="submit">+ Log activity</button>`,

  running: `
      <div class="workoutDetails">
        <input type="text" id="duration" placeholder="Duration (e.g. 00:45)" required />
        <input type="text" id="distance" placeholder="Distance in km" />
        <textarea id="notes" placeholder="Notes..."></textarea>
      </div>
      <div id="gpxUpload">
        <button type="button" id="uploadBtn">Upload GPX</button>
        <span id="gpxPath"></span>
      </div>
      <button type="submit">+ Log activity</button>`,

  hiking: `
      <div class="workoutDetails">
        <input type="text" id="duration" placeholder="Duration (e.g. 00:45)" required />
        <input type="text" id="distance" placeholder="Distance in km" />
        <textarea id="notes" placeholder="Notes..."></textarea>
      </div>
      <div id="gpxUpload">
        <button type="button" id="uploadBtn">Upload GPX</button>
        <span id="gpxPath"></span>
      </div>
      <button type="submit">+ Log activity</button>`,
};

function loadForm(type = "strength") {
  document.getElementById("formContent").innerHTML =
    forms[type] || forms.strength;
}

export function init() {
  const workoutSelect = document.getElementById("type");
  console.log(workoutSelect.value);
  loadForm(workoutSelect.value);
  workoutSelect.addEventListener("change", (e) => loadForm(e.target.value));
}
