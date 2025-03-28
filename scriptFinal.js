/* eslint-env browser */

function loadMenuAndInitializeTaskManagement() {
    "use strict";

    // Ensure fetch is called correctly
    fetch('menu.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('menu-container').innerHTML = data;
        })
        .catch(error => console.error('Error fetching menu:', error));
}

document.addEventListener("DOMContentLoaded", function () {
    "use strict";

    var taskInput = document.getElementById("task-input");
    var taskCategory = document.getElementById("task-category"); // Dropdown for categories
    var addTaskButton = document.getElementById("add-task");
    var clearTasksButton = document.getElementById("clear-tasks"); // Button to clear tasks

    // Task lists
    var categoryLists = {
        task: document.getElementById("full-list"),
        work: document.getElementById("work-tasks"),
        personal: document.getElementById("personal-tasks"),
        school: document.getElementById("school-tasks"),
        home: document.getElementById("home-tasks"),
        high: document.getElementById("task-high"),
        medium: document.getElementById("task-med"),
        low: document.getElementById("task-low")

       
    };
    
    

    addTaskButton.addEventListener("click", function () {
        var taskText = taskInput.value.trim();

        if (taskText !== "") {
            var newTask = document.createElement("li");
            newTask.textContent = taskText;

            // Check if a category is selected
            if (taskCategory) {
                var selectedCategory = taskCategory.value;
                if (selectedCategory in categoryLists) {
                    categoryLists[selectedCategory].appendChild(newTask);
                } else {
                    categoryLists.task.appendChild(newTask);
                }
            } else {
                categoryLists.task.appendChild(newTask);
            }

            taskInput.value = ""; // Clear input field
        }
    });

    // Optional: Add task on Enter keypress
    taskInput.addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
            event.preventDefault();
            addTaskButton.click();
        }
    });
});

function highlightActiveMenuItem() {
    "use strict";

    var currentUrl = window.location.pathname;
    var currentPage = currentUrl.substring(currentUrl.lastIndexOf('/') + 1);
    var menuItems = document.querySelectorAll('#menu-list .menu-item');

    menuItems.forEach(function(item) {
        var link = item.querySelector('a');
        if (link && link.getAttribute('href') === currentPage) {
            item.classList.add('active');
        }
    });
}

// Call the function **after** DOM loads
document.addEventListener("DOMContentLoaded", loadMenuAndInitializeTaskManagement);
