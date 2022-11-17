json_data = null;

async function onload() {
  const res = await fetch("mock-json.json");
  json_data = await res.json();
  const header = document.getElementById("header");
  header.innerText = json_data.heading;

  printData();
}

function printData() {
  const content_div = document.getElementById("accordion");

  let counter = 0;

  for (const task of json_data.tasks) {
    const accordion_item = document.createElement("div");
    accordion_item.className = "accordion-item";

    const h2_heading = document.createElement("h2");
    h2_heading.className = "accordion-header";

    const button = document.createElement("button");
    button.className = "accordion-button collapsed";
    button.setAttribute("type", "button");
    button.setAttribute("data-bs-toggle", "collapse");
    button.setAttribute("data-bs-target", "#collapseOne_" + counter);
    button.setAttribute("aria-expanded", "false");
    button.setAttribute("aria-controls", "collapseOne_" + counter);
    button.innerText = task.task;

    if (task.done) {
      button.innerHTML +=
        '<span class="badge bg-success version">' +
        json_data.message.task_completed +
        "</span>";
    } else {
      button.innerHTML +=
        '<span class="badge bg-danger version">' +
        json_data.message.task_not_completed +
        "</span>";
    }

    const collapseOne = document.createElement("div");
    collapseOne.id = "collapseOne_" + counter;
    collapseOne.className = "accordion-collapse collapse";
    collapseOne.setAttribute("aria-labelledby", "headingOne");
    collapseOne.setAttribute("data-bs-parent", "#accordionExample");
    collapseOne.setAttribute("style", "");

    const accordion_body = document.createElement("div");
    accordion_body.className = "accordion-body";
    accordion_body.innerText = task.description;

    accordion_item.appendChild(h2_heading);
    accordion_item.appendChild(button);
    accordion_item.appendChild(collapseOne);
    collapseOne.appendChild(accordion_body);

    content_div.append(accordion_item);

    counter++;
  }
}
