// Link to items in index.html
const itemForm = document.querySelector("#item-form");
const itemInput = document.getElementById("item-input");
const itemList = document.getElementById("item-list");

// Function to create a button with the passed class
function createButton(classes) {
  const btn = document.createElement("button");
  btn.className = classes;
  return btn;
}
// Function to create an icon with the passed class
function createIcon(classes) {
  const icon = document.createElement("i");
  icon.className = classes;
  return icon;
}

// Function to add a new item to the List
function addItem(e) {
  e.preventDefault();

  // get the value in the input textbox
  const newItem = itemInput.value;

  // validate and alert if nothing entered
  if (newItem === "") {
    alert("Please add an item");
    return;
  }

  // create and add new Item to list
  const li = document.createElement("li");
  li.textContent = newItem;

  const button = createButton("remove-item btn-link text-red");
  const icon = createIcon("fa-solid fa-xmark");
  button.appendChild(icon);
  li.appendChild(button);
  itemList.appendChild(li);
  // reset iteminput
  itemInput.value = "";
}

// Event Listeners
itemForm.addEventListener("submit", addItem);
