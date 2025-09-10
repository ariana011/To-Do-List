// Wait until the page is fully loaded
document.addEventListener("DOMContentLoaded", () => {
    const taskList = document.getElementById("taskList"); // Where tasks will go
    const addBtn = document.getElementById("addBtn"); // Add button
    const taskInput = document.getElementById("taskInput"); // Input box
    const progressBar = document.getElementById("progressBar"); // progress bar 
    const modal = document.getElementById("doneModal"); // modal pop up

    // track of modal/confetti already fired
    let celebrationShown = false;

    // progress bar function
    function updateProgress() {
        const allTasks = taskList.querySelectorAll("li");
        const completedTasks = taskList.querySelectorAll("li.completed");

        if (allTasks.length === 0) {
            progressBar.style.width = "0%";
            celebrationShown = false; // reset flag if list is empty
            return;
        }

        const percent = Math.round((completedTasks.length / allTasks.length) * 100);
        progressBar.style.width = percent + "%";

        // only trigger modal + confetti if all tasks are complete and it hasnt fired yet
        if (percent === 100 && !celebrationShown) {
            launchConfetti();
            modal.style.display = "flex";
            celebrationShown = true; // prevent repeat

            // reset flag if user unchecks or deletes a task
            if (percent < 100) {
                celebrationShown = false;
            }
        }
    }

    // conftti function
    function launchConfetti() {
        var duration = 2 * 1000;
        var end = Date.now() + duration;

        (function frame() {
            confetti({ particleCount: 5, angle: 60, spread: 50, origin: { x: 0 } });
            confetti({ particleCount: 5, angle: 120, spread: 55, origin: { x: 1 } });

            if (Date.now() < end) requestAnimationFrame(frame);
        })();
    }

    // close modal function
    window.closeModal = function () {
        modal.style.display = "none";
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

        // create container for circle + text
        const taskContainer = document.createElement("div");
        taskContainer.style.display = "flex";
        taskContainer.style.alignItems = "center";

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

        // create delete button
        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "X";
        deleteBtn.classList.add("deleteBtn");

        //clicking delete button removes the task
        deleteBtn.addEventListener("click", (e) => {
            e.stopPropagation(); // prevent circle click
            li.remove(); // remove task
            updateProgress(); // update progress bar
        })
        // Append circle and text to the task <li>
        li.appendChild(circle);
        li.appendChild(textSpan);
        li.appendChild(deleteBtn); // delete button at the end

        // Add the task to the list
        taskList.appendChild(li);

        // Clear the input box
        taskInput.value = "";

        updateProgress(); // update bar when new task added
    });
});

