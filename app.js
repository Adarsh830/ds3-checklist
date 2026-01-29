fetch("data.json")
  .then(r => r.json())
  .then(data => {
    const container = document.getElementById("checklist");
    let id = 1;

    for (const area in data) {
      const details = document.createElement("details");
      const summary = document.createElement("summary");
      summary.textContent = area;
      details.appendChild(summary);

      const ul = document.createElement("ul");

      data[area].forEach(step => {
        const li = document.createElement("li");
        const cb = document.createElement("input");
        cb.type = "checkbox";
        cb.dataset.id = id;
        cb.checked = localStorage.getItem(id) === "true";

        cb.onchange = () => {
          localStorage.setItem(id, cb.checked);
          updateProgress();
        };

        li.appendChild(cb);
        li.append(" " + step);
        ul.appendChild(li);
        id++;
      });

      details.appendChild(ul);
      container.appendChild(details);
    }
    updateProgress();
  });

function updateProgress() {
  const boxes = document.querySelectorAll("input[type='checkbox']");
  const checked = [...boxes].filter(b => b.checked).length;
  const percent = Math.round((checked / boxes.length) * 100);
  document.getElementById("progress-bar").style.width = percent + "%";
}
