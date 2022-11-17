json_data = null;
data = null;
header = null;

function onload() {
  header = document.getElementById("header");
  header.innerText = "Pick a file ->";

  // printData();
  populate_settings_menu();
}

async function load_setting_file() {
  console.log(file);
  const res = await fetch(file);
  json_data = await res.json();

  // Update the header
  header.innerHTML = json_data.heading;

  print_data();
}

function print_data() {
  const content_div = document.getElementById("accordion");

  // clear old data that may be there
  content_div.innerHTML = "";

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

async function populate_settings_menu() {
  const res = await fetch("app-settings.json");
  data = await res.json();

  const ulDropDown = document.getElementById("dropdown-menu");

  for (const setting_file of data.settings_files) {
    const menu_list_item = document.createElement("li");

    const menu_ahref_item = document.createElement("li");
    menu_ahref_item.className = "dropdown-item";
    menu_ahref_item.setAttribute("href", "#");
    menu_ahref_item.setAttribute("menu_id", setting_file.id);
    menu_ahref_item.addEventListener(
      "click",
      function () {
        file = setting_file.file_name;
        load_setting_file();
        console.log("Trying to open file: " + file);
      },
      false
    );
    menu_ahref_item.innerText = setting_file.name;

    menu_list_item.appendChild(menu_ahref_item);
    ulDropDown.appendChild(menu_list_item);
  }
}
