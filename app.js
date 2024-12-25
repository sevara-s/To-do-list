const input1 = document.getElementById("task-input");
const add = document.getElementById("add-task-btn");
const list = document.getElementById("task-list");

const api = "https://676bd6f7bc36a202bb85e300.mockapi.io/tasks";  

function fetchTasks() {
  fetch(api)
    .then((response) => response.json())
    .then((tasks) => renderTasks(tasks))
    .catch((error) => console.error("Error", error));
}

function renderTasks(tasks) {
  list.innerHTML = "";
  tasks.forEach((task) => {
    const taskItem = document.createElement("li");
    taskItem.className = "task-item";

    const taskText = document.createElement("span");
    taskText.textContent = `${task.name} (Added: ${task.added}, Edited: ${
      task.edited || "not edited"
    })`;

    const actions = document.createElement("div");
    actions.className = "task-actions";

    const editBtn = document.createElement("button");
    editBtn.className = "edit-btn";
    editBtn.textContent = "Edit";
    editBtn.onclick = () => editTask(task);

    const deleteBtn = document.createElement("button");
    deleteBtn.className = "delete-btn";
    deleteBtn.textContent = "Delete";
    deleteBtn.onclick = () => deleteTask(task.id);

    actions.appendChild(editBtn);
    actions.appendChild(deleteBtn);
    taskItem.appendChild(taskText);
    taskItem.appendChild(actions);

    list.appendChild(taskItem);
  });
}

function addTask() {
  const taskName = input1.value.trim();

  const timestamp = new Date().toLocaleString();
  const newTask = { name: taskName, added: timestamp, edited: null };

  fetch(api, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newTask),
  })
    .then(() => {
      input1.value = "";
      fetchTasks();
    })
    .catch((error) => console.error("Task is not added:", error));
}

function editTask(task) {
  const edited1 = prompt("Edit task:", task.name);
  if (edited1 === null || edited1.trim() === "") {
    return;
  }

  const  newedit = {
    ...task,
    name: edited1.trim(),
    edited: new Date().toLocaleString(),
  };

  fetch(`${api}/${task.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newedit),
  })
    .then(() => fetchTasks())
    .catch((error) => console.error("can't edit task :", error));
}

function deleteTask(id) {
  fetch(`${api}/${id}`, {
    method: "DELETE",
  })
    .then(() => fetchTasks())
    .catch((error) => console.error("can't delete task", error));
}

add.addEventListener("click", addTask);
document.addEventListener("DOMContentLoaded", fetchTasks);
