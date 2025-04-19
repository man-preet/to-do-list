let search = document.getElementById("search");
let createButton = document.getElementById("create-button");
let main = document.getElementById("main");
let task = document.getElementById("create-task");
let find = document.getElementById("find-task");
let list = document.getElementById("created-list");
let taskPage = document.getElementById("task-page");


// Show create task form
createButton.addEventListener("click", () => {
  task.innerHTML = "";
  main.innerHTML = "";

  const container = document.createElement("div");
  container.className = "mt-6 space-y-4 flex flex-col items-center";

  const titleInput = document.createElement("input");
  titleInput.placeholder = "Title";
  titleInput.id = "title";
  titleInput.className = "border p-2 px-4 rounded-lg w-64";
  container.appendChild(titleInput);

  const descriptionInput = document.createElement("textarea");
  descriptionInput.placeholder = "Description";
  descriptionInput.id = "description";
  descriptionInput.rows = "5";
  descriptionInput.cols = "20";
  descriptionInput.className = "border p-2 px-4 rounded-lg w-64";
  container.appendChild(descriptionInput);

  const saveButton = document.createElement("button");
  saveButton.textContent = "Save";
  saveButton.className = "px-28 py-2 rounded-xl bg-purple-200 font-medium cursor-pointer";
  container.appendChild(saveButton);

  task.appendChild(container);

  saveButton.addEventListener("click", () => {
    const title = titleInput.value;
    const description = descriptionInput.value;

    if (!title || !description) {
      alert("Please fill all fields.");
      return;
    }

    const taskKey = `task_${Date.now()}`;
    const tasks = {
      title: title,
      description: description,
      key: taskKey
    };

    localStorage.setItem(taskKey, JSON.stringify(tasks));

    alert("Task Saved Successfully!");

    window.location.reload();
  });
});

// Load and display tasks
window.addEventListener("DOMContentLoaded", () => {
  for (let key in localStorage) {
    if (key.startsWith("task_")) {

      const tasks = JSON.parse(localStorage.getItem(key));

      console.log(tasks.title);
      const savedTask = document.createElement("li");
      savedTask.className = "border w-10/12 text-xl font-medium mx-auto mt-10 flex justify-between p-2";
      savedTask.innerHTML = tasks.title;
      list.appendChild(savedTask);

      const btns = document.createElement("div");
      btns.className = "flex w-2/12 justify-evenly";
      savedTask.appendChild(btns);

      // View Button
      const viewBtn = document.createElement("button");
      const viewIcon = document.createElement("i");
      viewIcon.className = "bi bi-eye-fill";
      viewBtn.appendChild(viewIcon);
      btns.appendChild(viewBtn);

      viewBtn.addEventListener("click", () => {
        alert(`Title: ${tasks.title}\nDescription: ${tasks.description}`);
      });

      // Delete Button
      const deleteBtn = document.createElement("button");
      const deleteIcon = document.createElement("i");
      deleteIcon.className = "bi bi-trash-fill";
      deleteBtn.appendChild(deleteIcon);
      btns.appendChild(deleteBtn);

      deleteBtn.addEventListener("click", () => {
          localStorage.removeItem(tasks.key);
          savedTask.remove();

      });

      // Edit Button
      const editBtn = document.createElement("button");
      const editIcon = document.createElement("i");
      editIcon.className = "bi bi-pencil-fill";
      editBtn.appendChild(editIcon);
      btns.appendChild(editBtn);

      editBtn.addEventListener("click", () => {
        task.innerHTML = "";
        main.innerHTML = "";

        const container = document.createElement("div");
        container.className = "mt-6 space-y-4 flex flex-col items-center";

        const titleInput = document.createElement("input");
        titleInput.placeholder = "Title";
        titleInput.value = tasks.title;
        titleInput.className = "border p-2 px-4 rounded-lg w-64";
        container.appendChild(titleInput);

        const descriptionInput = document.createElement("textarea");
        descriptionInput.placeholder = "Description";
        descriptionInput.rows = "5";
        descriptionInput.cols = "20";
        descriptionInput.value = tasks.description;
        descriptionInput.className = "border p-2 px-4 rounded-lg w-64";
        container.appendChild(descriptionInput);

        const updateButton = document.createElement("button");
        updateButton.textContent = "Update";
        updateButton.className = "px-28 py-2 rounded-xl bg-green-300 font-medium cursor-pointer";
        container.appendChild(updateButton);

        task.appendChild(container);

        updateButton.addEventListener("click", () => {
          const updatedTitle = titleInput.value;
          const updatedDescription = descriptionInput.value;

          if (!updatedTitle || !updatedDescription) {
            alert("Please fill all fields.");
            return;
          }

          const updatedTasks = {
            title: updatedTitle,
            description: updatedDescription,
            key: tasks.key
          };

          localStorage.setItem(tasks.key, JSON.stringify(updatedTasks));
          alert("Task updated successfully!");
          window.location.reload();
        });
      });
    }
  }
});

// Find Your Tasks
find.addEventListener("click", () => {
  const allTasks = [];

  // Fetch all tasks from localStorage
  for (let key in localStorage) {
    if (key.startsWith("task_")) {
      const task = JSON.parse(localStorage.getItem(key));
      allTasks.push(task);
    }
  }

  // Search for the task
  const searchTerm = search.value.trim();
  console.log(searchTerm);

  const foundTask = allTasks.filter(task => task.title === searchTerm); // Note: foundTasks (plural)

  console.log(foundTask);

  if (foundTask.length > 0) {
    // If multiple tasks with the same name, show all
    foundTask.forEach(task => {
      alert(`Found Task:\nTitle: ${task.title}\nDescription: ${task.description}`);
    });
  } else {
    alert("Task not found!");
  }

  search.value = ""; // Clear input box after search
});
