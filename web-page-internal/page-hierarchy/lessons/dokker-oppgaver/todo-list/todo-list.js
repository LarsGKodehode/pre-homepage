/* CONTENTS:
  1. Global Variables
  2. Function to append task element
  3. Helper Functions
  4. Functionality Functions
  5. Keyboard Shortcuts
*/

// ----- 1. Global Variables -----
const inputField = document.getElementById("input-field");
const buttonSubmit = document.getElementById("input-button-submit");
const buttonSort = document.getElementById("button-sort");
const listTarget = document.getElementById("task-list-insertion-point");
let taskList = []; // array to hold tasks for sorting and rerendering



// ----- 2. Function to append task element -----
/*
this function is really messy
*/
function addListElement(description, target=listTarget) {
  // --- Element Wrapper
  const nodeElementWrapper = {
    nodeType: "li",
    className: "list-element-wrapper",
  };
  const elementWrapper = createNode(nodeElementWrapper);


  // --- Overlay
  const nodeOverlay = {
    nodeType: "div",
    className: "overlay-task-done hidden not-clickable",

  };
  elementWrapper.appendChild(createNode(nodeOverlay));


  // --- Section Texts
  const nodeTextWrapper = {
    nodeType: "div",
    className: "texts-wrapper",
  };
  const textWrapper = createNode(nodeTextWrapper);
  elementWrapper.appendChild(textWrapper);

  // text description
  const nodeDescriptionElement = {
    nodeType: "p",
    textContent: description,
  };
  textWrapper.appendChild(createNode(nodeDescriptionElement));

  // text details
  /*
  TODO: not yet implemented
  */
  // const nodeDetailElement = {
  //   nodeType: "small",
  //   className: "button-add-details",
  //   textContent: "Add details",
  // };
  // textWrapper.appendChild(createNode(nodeDetailElement));

  
  //  --- Section Buttons
  const nodeButtonWrapper = {
    nodeType: "div",
    className: "buttons-wrapper",
  };
  const buttonWrapper = createNode(nodeButtonWrapper);
  elementWrapper.appendChild(buttonWrapper);

  // button done
  const nodeButtonDone = {
    nodeType: "input",
    type: "button",
    className: "button button-done",
    value: "DONE",
  };
  const buttonDone = createNode(nodeButtonDone);
  buttonWrapper.appendChild(buttonDone);

  // button delete
  const nodeButtonDelete = {
    nodeType: "input",
    type: "button",
    className: "button button-delete",
    value: "DELETE",
  }
  const buttonDelete = createNode(nodeButtonDelete);
  buttonWrapper.appendChild(buttonDelete);

  // add interactions
  buttonDone.addEventListener("click", (e) => taskComplete(e));
  buttonDelete.addEventListener("click", (e) => taskDelete(e, description));

  // add to DOM
  target.appendChild(elementWrapper);
};



// ----- 3. Helper Functions -----

// creates a new element from object
function createNode(createInfo) {
  const newNode = document.createElement(createInfo.nodeType);
  for ([key, value] of Object.entries(createInfo)) {
    if (key === "nodeType") {continue};
    newNode[key] = value;
  };
  return newNode;
};

// rerenders stored tasks
function renderTasks() {
  // clears task list
  while(listTarget.firstChild) {
    listTarget.removeChild(listTarget.firstChild);
  };
  // readds tasks to DOM
  for (task of taskList) {
    addListElement(task);
  };
};


// ----- 4. Funtionality Functions -----

// function sections

function taskAdd() {
  if (inputField.value == /^\s*$/) {return}; // regex to check for empty string
  // add to task list
  taskList.push(inputField.value);
  // add to DOM
  addListElement(inputField.value);
  // clears input field
  inputField.value = "";
};

/*
TODO: this is messy and do not adapt well to change of task element
 */
function taskComplete(e) {
  e.target.parentElement.previousSibling.previousSibling.classList.toggle("hidden");
};

function taskDelete(event, description) {
  // remove from DOM
  event.target.parentElement.parentElement.remove();
  // remove from taskList
  const index = taskList.indexOf(description);
  taskList.splice(index, 1);
};

function focusInput(target, value) {
  inputField.focus();
};

/*
TODO: implement different forms of sort
 */
function sortList() {
  taskList.sort();
  renderTasks();
};


// event listener section

// submit form
buttonSubmit.addEventListener("click", () => {
  if (inputField.value.match(/^\s*$/)) {return} // ignores empty input
  taskAdd();
});

// reorder list
buttonSort.addEventListener("click", () => sortList());



// ----- 5. Keyboard Shortcuts -----

// keybinding listner
/*
currently only handles single key inputs, no "ctrl(cmd) + key" combos
 */
document.addEventListener("keydown", (event) => {
  if (!(event.code in keybindings)) {return}; // check if we have registred a keybinding
  if (document.activeElement.type === "text") {return}; // check if text input is in focus
  event.preventDefault(); // bypasses default event
  keybindings[event.code](event); // run hotkeyed function
});

// keybindings storage
let keybindings = {};

// bind keys
keybindings["KeyF"] = focusInput;