var buttonEl = document.querySelector("#save-task");
var tasksToDoEl = document.querySelector("#tasks-to-do");

buttonEl.addEventListener("click", function() {
  var ListItemEl = document.createElement("li"); //create a new task item
  listItemEl.className = "task-item"; //style the new task item
  listItemEl.textContent = "This is a new task."; //add the text
  tasksToDoEl.appendChild(listItemEl); //append the element to the task list
});

