var formEl = document.querySelector("#task-form");
var tasksToDoEl = document.querySelector("#tasks-to-do");
var taskIdCounter = 0;
var pageContentEl = document.querySelector("#page-content");


var taskFormHandler = function(event) {
  // stops the browser from reloading the page upon a form submission
  event.preventDefault();
  
  var taskNameInput = document.querySelector("input[name='task-name']").value;
  var taskTypeInput = document.querySelector("select[name='task-type']").value;

  var listItemEl = document.createElement("li"); //create a new task item
  listItemEl.className = "task-item"; //style the new task item
  listItemEl.textContent = taskNameInput; //add the text
//  tasksToDoEl.appendChild(listItemEl); //append the element to the task list  --this was duplication of items
  
  //package up data as an object
  var taskDataObj = {
    name: taskNameInput,
    type: taskTypeInput
  }

  // send it as an argument to createTaskEl
  createTaskEl(taskDataObj);

  // check if input values are empty strings
  if (!taskNameInput || !taskTypeInput) {
    alert("You need to fill out the task form!");
    return false;
  }

  // clear the form input boxes after you click Add Task
  formEl.reset();
};

var createTaskEl = function(taskDataObj) {
  // create list item
  var listItemEl = document.createElement("li");
  listItemEl.className = "task-item"; 

  // add task id as a custom attribute
  listItemEl.setAttribute("data-task-id", taskIdCounter);

  // create div to hold task info and add to list item
  var taskInfoEl = document.createElement("div");
  // give it a class name
  taskInfoEl.className = "task-info";
  // add HTML content to div
  taskInfoEl.innerHTML = "<h3 class='task-name'>" + taskDataObj.name + "</h3><span class='task-type'>" + taskDataObj.type + "</span>";

  listItemEl.appendChild(taskInfoEl);

  // create buttons that correspond to the current task id
  var taskActionsEl = createTaskActions(taskIdCounter); 
  listItemEl.appendChild(taskActionsEl); 

  // add entire list item to list
  tasksToDoEl.appendChild(listItemEl);

  // increase task counter for next unique id
  taskIdCounter++;
};

 // create edit and delete buttons, and to-do dropdown for each task
var createTaskActions = function(taskId) {

  // create a new div element that will be a container for the other elements
  var actionContainerEl = document.createElement("div");
  actionContainerEl.className = "task-actions";

  // create edit button
  var editButtonEl = document.createElement("button");
  editButtonEl.textContent = "Edit";
  editButtonEl.className = "btn edit-btn";
  editButtonEl.setAttribute("data-task-id", taskId);
  
  actionContainerEl.appendChild(editButtonEl);

  // create delete button
  var deleteButtonEl = document.createElement("button");
  deleteButtonEl.textContent = "Delete";
  deleteButtonEl.className = "btn delete-btn";
  deleteButtonEl.setAttribute("data-task-id", taskId);

  actionContainerEl.appendChild(deleteButtonEl);

  // create <select> drop-down element
  var statusSelectEl = document.createElement("select");
  statusSelectEl.className = "select-status";
  statusSelectEl.setAttribute("name", "status-change");
  statusSelectEl.setAttribute("data-task-id", taskId);

  actionContainerEl.appendChild(statusSelectEl);

  // fill options for drop-down box
  var statusChoices = ["To Do", "In Progress", "Completed"];
  for (var i=0; i < statusChoices.length; i++) {
    // create option element
    var statusOptionEl = document.createElement("option");
    statusOptionEl.textContent = statusChoices[i];
    statusOptionEl.setAttribute("value", statusChoices[i]);

    // append to select
    statusSelectEl.appendChild(statusOptionEl);
  }
  return actionContainerEl;
};

formEl.addEventListener("submit", taskFormHandler);

// function for delete button
var taskButtonHandler = function(event) {
  // get target element from event
  var targetEl = event.target;

  // edit button was clicked
  if (targetEl.matches(".edit-btn")) {
    var taskId = targetEl.getAttribute("data-task-id");
    editTask(taskId);
  }
  // delete button was clicked
  else if (targetEl.matches(".delete-btn")) {
    // get the element's task id
    var taskId = event.target.getAttribute("data-task-id");
    deleteTask(taskId);
  }
};

var editTask = function(taskId) {
  console.log("editing task #" + taskId);

  // get task list item element
  var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");

  // get content from task name and type
  var taskName = taskSelected.querySelector("h3.task-name").textContent;
  var taskType = taskSelected.querySelector("span.task-type").textContent;
  // after Edit is clicked, task's name and type will appear in the form inputs
  document.querySelector("input[name='task-name']").value = taskName;
  document.querySelector("select[name='task-type']").value = taskType;  
  // changes button label to Save Task after Edit button is clicked
  document.querySelector("#save-task").textContent = "Save Task"; 
  // adds the taskId to a data-task-id attribute on the form
  formEl.setAttribute("data-task-id", taskId);
};

var deleteTask = function(taskId) {
  var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");
  taskSelected.remove();
};

// eventListener for the delete button
pageContentEl.addEventListener("click", taskButtonHandler);  

