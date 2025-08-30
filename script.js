// Wait until the page is fully loaded
document.addEventListener("DOMContentLoaded", () => {
    const taskList = document.getElementById("taskList"); // Where tasks will go
    const addBtn = document.getElementById("addBtn"); // Add button
    const taskInput = document.getElementById("taskInput"); // Input box
    const progressBar = document.getElementById("progressBar"); // progress bar 
    // progress bar function
    function updateProgress() {
        const allTasks = taskList.querySelectorAll("li");
        const completedTasks = taskList.querySelectorAll("li.completed");
        if (allTasks.length === 0) {
            progressBar.style.width = "0%";
            return;
        }
        const percent = (completedTasks.length / allTasks.length) * 100;
        progressBar.style.width = percent + "%";
    }
    // When the Add button is clicked
    addBtn.addEventListener("click", () => {
        const taskText = taskInput.value.trim(); // Get user input and remove spaces

        // Warn if input is empty
        if (taskText === "") {
            alert("Please write something! 🧸");
            return; // Stop if no text
        }

        // Create the task <li>
        const li = document.createElement("li");

        // Create the circle element
        const circle = document.createElement("span");
        circle.classList.add("circle"); // Will style in CSS

        // Clicking the circle toggles completed state
        circle.addEventListener("click", () => {
            li.classList.toggle("completed"); // Crosses off the task
            circle.classList.toggle("checked"); // Fill circle when done
            updateProgress(); //update bar when toggled 
        });

        // Create a span for the task text
        const textSpan = document.createElement("span");
        textSpan.textContent = taskText;

        // Append circle and text to the task <li>
        li.appendChild(circle);
        li.appendChild(textSpan);

        // Add the task to the list
        taskList.appendChild(li);

        // Clear the input box
        taskInput.value = "";

        updateProgress(); // update bar when new task added
    });
});

