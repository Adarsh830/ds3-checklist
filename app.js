const checklistEl = document.getElementById("checklist");
const progressBar = document.getElementById("progressBar");
const progressText = document.getElementById("progressText");

const STORAGE_KEY = "ds3-checklist-progress";
const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");

let total = 0;
let done = 0;

function updateProgress() {
  const percent = total === 0 ? 0 : Math.floor((done / total) * 100);
  progressBar.value = percent;
  progressText.textContent = `${percent}% (${done}/${total})`;
}

for (const [sectionName, items] of Object.entries(CHECKLIST_DATA)) {
  const section = document.createElement("div");
  section.className = "section";

  const header = document.createElement("div");
  header.className = "section-header";
  header.textContent = sectionName;
  header.onclick = () => section.classList.toggle("open");

  const body = document.createElement("div");
  body.className = "section-body";

  items.forEach((text, index) => {
    const id = `${sectionName}__${index}`;
    total++;

    const checked = saved[id];
    if (checked) done++;

    const label = document.createElement("label");
    const box = document.createElement("input");
    box.type = "checkbox";
    box.checked = !!checked;

    box.onchange = () => {
      saved[id] = box.checked;
      localStorage.setItem(STORAGE_KEY, JSON.stringify(saved));
      done += box.checked ? 1 : -1;
      updateProgress();
    };

    label.appendChild(box);
    label.appendChild(document.createTextNode(text));
    body.appendChild(label);
  });

  section.appendChild(header);
  section.appendChild(body);
  checklistEl.appendChild(section);
}

updateProgress();
