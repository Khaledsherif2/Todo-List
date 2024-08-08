let todoField = document.getElementById("todo");
let addBtn = document.getElementById("add");
let clear = document.querySelector(".clear");

addBtn.onclick = function (e) {
  if (todoField.value !== '') {
    let taskText = todoField.value;
    addTask(taskText, false); 
    storeTask(taskText, false);
    todoField.value = '';
  } else {
    e.preventDefault();
  };
};

clear.onclick = function() {
  clearAllTasks();
};

function addTask(taskText, isChecked) {
  let clear = document.querySelector(".clear");
  let tasks = document.createElement("div");
  let task = document.createElement("div");
  let content = document.createElement("div");
  let checkBox = document.createElement("input");
  checkBox.setAttribute("type", "checkbox");

  if (isChecked) {
    checkBox.checked = true;
  };

  let p = document.createElement("p");
  let delBtn = document.createElement("button");
  let delText = document.createTextNode("Del");
  let text = document.createTextNode(taskText);

  tasks.classList.add("tasks");
  task.classList.add("task");
  content.classList.add("content");
  checkBox.classList.add("checkbox");
  delBtn.classList.add("delbtn");
  p.classList.add("p");

  if (isChecked) {
    p.style.textDecoration = "line-through";
    content.style.backgroundColor = "#abc";
  };

  tasks.appendChild(task);
  task.appendChild(content);
  task.appendChild(delBtn);
  delBtn.appendChild(delText);
  content.appendChild(checkBox);
  content.appendChild(p);
  p.appendChild(text);
  let container = document.getElementById("container");
  container.insertBefore(tasks, clear);
};

function storeTask(taskText, isChecked) {
  let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  tasks.push({ text: taskText, checked: isChecked });
  localStorage.setItem('tasks', JSON.stringify(tasks));
};

function updateTask(index, isChecked) {
  let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  tasks[index].checked = isChecked;
  localStorage.setItem('tasks', JSON.stringify(tasks));
};

function loadTasks() {
  let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  tasks.forEach(task => {
    addTask(task.text, task.checked);
  });
};

document.addEventListener("change", function (e) {
  if (e.target && e.target.classList.contains("checkbox")) {
    const checkbox = e.target;
    const taskElement = checkbox.closest(".task");
    const p = taskElement.querySelector(".p");
    const content = taskElement.querySelector(".content");
    const index = Array.from(document.querySelectorAll(".tasks")).indexOf(taskElement.closest(".tasks"));
    if (checkbox.checked) {
      p.style.textDecoration = "line-through";
      content.style.backgroundColor = "#abc";
      updateTask(index, true);
    } else {
      p.style.textDecoration = "";
      content.style.backgroundColor = "";
      updateTask(index, false);
    }
  }
});

document.addEventListener("click", function (e) {
  if (e.target && e.target.classList.contains("delbtn")) {
    const delbtn = e.target;
    const taskElement = delbtn.closest(".tasks");
    if (taskElement) {
      const index = Array.from(document.querySelectorAll(".tasks")).indexOf(taskElement);
      taskElement.parentNode.removeChild(taskElement);
      removeTask(index);
    };
  };
});

function removeTask(index) {
  let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  tasks.splice(index, 1);  // Remove the task at the specified index
  localStorage.setItem('tasks', JSON.stringify(tasks));
};

window.onload = function() {
  loadTasks();
};

function clearAllTasks() {
  localStorage.removeItem('tasks');
  let tasks = document.querySelectorAll(".tasks");
  tasks.forEach(element => {
    element.remove();
  });
};