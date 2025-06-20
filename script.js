const taskInput = document.getElementById("taskInput");
const dueDateInput = document.getElementById("dueDate");
const taskList = document.getElementById("taskList");

document.addEventListener("DOMContentLoaded", loadTasks);

function addTask() {
  const text = taskInput.value.trim();
  const dueDate = dueDateInput.value;

  if (!text) return;

  const task = { text, dueDate, completed: false };
  const li = createTaskElement(task);

  taskList.appendChild(li);
  saveTask(task);

  taskInput.value = "";
  dueDateInput.value = "";
}

function createTaskElement(task) {
  const li = document.createElement("li");
  if (task.completed) li.classList.add("completed");

  const taskText = document.createElement("div");
  taskText.textContent = task.text;

  const meta = document.createElement("div");
  meta.className = "task-meta";
  meta.textContent = task.dueDate ? `Due: ${task.dueDate}` : "No due date";

  const actions = document.createElement("div");
  actions.className = "actions";

  const completeBtn = document.createElement("button");
  completeBtn.textContent = task.completed ? "Undo" : "Complete";
  completeBtn.onclick = () => {
    task.completed = !task.completed;
    updateTaskInStorage(task.text, task.completed);
    li.classList.toggle("completed");
    completeBtn.textContent = task.completed ? "Undo" : "Complete";
  };

  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "Delete";
  deleteBtn.onclick = () => {
    taskList.removeChild(li);
    removeTask(task.text);
  };

  actions.appendChild(completeBtn);
  actions.appendChild(deleteBtn);

  li.appendChild(taskText);
  li.appendChild(meta);
  li.appendChild(actions);

  return li;
}

function saveTask(task) {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.push(task);
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function updateTaskInStorage(text, completed) {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  const task = tasks.find(t => t.text === text);
  if (task) {
    task.completed = completed;
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }
}

function removeTask(text) {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks = tasks.filter(t => t.text !== text);
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.forEach(task => {
    const li = createTaskElement(task);
    taskList.appendChild(li);
  });
}
