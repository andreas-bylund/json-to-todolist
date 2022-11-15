json_data = null;

async function onload() {
    const res = await fetch('mock-json.json');
    json_data = await res.json();
    const header = document.getElementById("header");
    header.innerText = json_data.heading;   

    printData();
}

function printData() {
    const ul = document.createElement("ul");
    ul.className = "todolist";

    for (const task of json_data.tasks) {
        let li = document.createElement("li");
        li.innerText = task.task;
        ul.appendChild(li);
        console.log(task.task)
    }

    const content = document.getElementById("content");
    content.appendChild(ul);
}