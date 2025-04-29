/* eslint-env browser */
"use strict";

document.addEventListener("DOMContentLoaded", function () {
    loadMenuAndInitializeTaskManagement();
    highlightActiveMenuItem();
    loadTasks();

    const taskInput = document.getElementById("task-input");
    const taskCategory = document.getElementById("task-category"); 
    const addTaskButton = document.getElementById("add-task");

    if (taskInput) {
        taskInput.addEventListener("keypress", function (e) {
            if (e.key === "Enter" && taskInput.value.trim() !== "") {
                e.preventDefault();
                const task = taskInput.value.trim();
                const category = taskCategory ? taskCategory.value : "task";
                addTask(task, category);
                saveTask(task, category);
                taskInput.value = "";
            }
        });
    }

    if (addTaskButton) {
        addTaskButton.addEventListener("click", function () {
            if (taskInput.value.trim() !== "") {
                const task = taskInput.value.trim();
                const category = taskCategory ? taskCategory.value : "task";
                addTask(task, category);
                saveTask(task, category);
                taskInput.value = "";
            }
        });
    }
});

// === FUNCTIONS section  ===
// Connects menu to all the pages, loading the pages, loading the stored task, updated weather task was completed, cross out feature, to clear task clear the cache, might add a clear button, highliht on menu when on a section, add user input and allows them to catergories them, save the task under it as well, and of course load it each time as long as the local storage hasnt been cleared.

function loadMenuAndInitializeTaskManagement() {
    fetch("menu.html")
        .then((res) => res.text())
        .then((data) => {
            document.getElementById("menu-container").innerHTML = data;
        })
        .catch((err) => console.error("Error loading menu:", err));
}

function highlightActiveMenuItem() {
    const currentPage = window.location.pathname.split("/").pop();
    const menuItems = document.querySelectorAll("#menu-list .menu-item");

    menuItems.forEach((item) => {
        const link = item.querySelector("a");
        if (link && link.getAttribute("href") === currentPage) {
            item.classList.add("active");
        }
    });
}

// Add task to correct list
function addTask(task, category, completed = false) {
    const li = document.createElement("li");
    li.textContent = task;

    // Create the check button
    const checkButton = document.createElement("button");
    checkButton.textContent = "✔️";
    checkButton.classList.add("check-button");

    // Any completed will have a cross out
    if (completed) {
        li.style.textDecoration = "line-through";
    }

    // Makes it crossing out when check mark is clicked
    checkButton.addEventListener("click", function () {
        li.style.textDecoration = li.style.textDecoration === "line-through" ? "none" : "line-through";
        updateTaskCompletion(task);
    });

    li.appendChild(checkButton);

    let listId;

    switch (category) {
        case "high":
            listId = "task-high";
            break;
        case "medium":
            listId = "task-med";
            break;
        case "low":
            listId = "task-low";
            break;
        case "work":
            listId = "work-tasks";
            break;
        case "personal":
            listId = "personal-tasks";
            break;
        case "school":
            listId = "school-tasks";
            break;
        case "task":
        default:
            listId = "full-list";
            break;
    }

    const list = document.getElementById(listId);

    if (list) {
        list.appendChild(li);
    } else {
        console.warn(`List with ID '${listId}' not found.`);
    }
}

// Save tasks
function saveTask(task, category, completed = false) {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.push({ task, category, completed });
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

//Updateds the local storage too 
function updateTaskCompletion(taskText) {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    tasks = tasks.map(({ task, category, completed }) => {
        if (task === taskText) {
            return { task, category, completed: !completed };
        }
        return { task, category, completed };
    });

    localStorage.setItem("tasks", JSON.stringify(tasks));
}


// Load tasks
function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.forEach(({ task, category, completed }) => {
        addTask(task, category, completed);
    });
}

