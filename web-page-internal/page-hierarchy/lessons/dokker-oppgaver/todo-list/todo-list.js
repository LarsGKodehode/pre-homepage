// create and append element to list
function addListElement(description, target=listTarget) {
  // --- Element Wrapper
  const nodeElementWrapper = {
    type: "li",
    className: "list-element-wrapper",
  };
  const elementWrapper = createNode(nodeElementWrapper);


  // --- Overlay
  const nodeOverlay = {
    type: "div",
    className: "overlay-task-done hidden",
  };
  elementWrapper.appendChild(createNode(nodeOverlay));


  // --- Section Texts
  const nodeTextWrapper = {
    type: "div",
    className: "texts-wrapper",
  };
  const textWrapper = createNode(nodeTextWrapper);
  elementWrapper.appendChild(textWrapper);

  // text description
  const nodeDescriptionElement = {
    type: "p",
    textContent: description,
  };
  textWrapper.appendChild(createNode(nodeDescriptionElement));

  // text details
  const nodeDetailElement = {
    type: "small",
    className: "button-add-details",
    textContent: "Add details",
  };
  textWrapper.appendChild(createNode(nodeDetailElement));

  
  //  --- Section Buttons
  const nodeButtonWrapper = {
    type: "div",
    className: "buttons-wrapper",
  };
  const buttonWrapper = createNode(nodeButtonWrapper);
  elementWrapper.appendChild(buttonWrapper);

  // button done
  const buttonDone = document.createElement("input");
  buttonDone.type = "button";
  buttonDone.className = "button button-done";
  buttonDone.value = "DONE";
  buttonWrapper.appendChild(buttonDone);

  // add interaction
  buttonDone.addEventListener("click", (e) => taskComplete(e));


  // button delete
  const buttonDelete = document.createElement("input");
  buttonDelete.type = "button";
  buttonDelete.className = "button button-delete";
  buttonDelete.value = "DELETE";
  buttonWrapper.appendChild(buttonDelete);

  // add delete interaction
  buttonDelete.addEventListener("click", (e) => taskDelete(e));


  // append to DOM
  target.appendChild(elementWrapper);
};



// helpers
function createNode(createInfo) {
  const newNode = document.createElement(createInfo.type);
  for ([key, value] of Object.entries(createInfo)) {
    if (key === "type") {continue};
    newNode[key] = value;
  };
  return newNode;
};



// functionality
function taskAdd() {
  if (inputField.value == /^\s*$/) {return};
  addListElement(inputField.value);
  inputField.value = "";
};

function taskComplete(e) {
  e.target.parentElement.previousSibling.previousSibling;
};

function taskDelete(e) {
  // hardcoded value here
  e.target.parentElement.parentElement.remove();
};

function focusInput() {
  inputField.focus();
}

// predefined hotkeys
let hotkeys = {
  "KeyF": focusInput,
};

document.addEventListener("keydown", (e) => {
  // check if we have registred a shortcut
  if (!(e.code in hotkeys)) {return};
  // disable shortuct if text field is in focus
  if (!document.activeElement.type === "text") {e.preventDefault();};
  // run hotkeyed function
  hotkeys[e.code]();
});


// document targets
const listTarget = document.getElementById("task-list-insertion-point");
const buttonSubmit = document.getElementById("input-button-submit");
const inputField = document.getElementById("input-field");

// submit form
buttonSubmit.addEventListener("click", (e) => {
  if (inputField.value.match(/^\s*$/)) {return}
  taskAdd();
});