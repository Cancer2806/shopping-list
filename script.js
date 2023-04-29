// Link to items in index.html
const itemForm = document.querySelector("#item-form");
const itemInput = document.getElementById("item-input");
const itemList = document.getElementById("item-list");
const btnClear = document.querySelector("#clear");
const itemFilter = document.getElementById("filter");
const btnForm = itemForm.querySelector("button");
let isEditMode = false;

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

// function to display items
function displayItems() {
  let itemsFromStorage = getItemsFromStorage();

  itemsFromStorage.forEach((item) => addItemToDom(item));
  checkUI();
}

// Function to add a new item to the List
function onAddItemSubmit(e) {
  e.preventDefault();

  // get the value in the input textbox
  const newItem = itemInput.value;

  // validate and alert if nothing entered
  if (newItem === "") {
    alert("Please add an item");
    return;
  }

  // check for edit mode
  if (isEditMode) {
    const itemToEdit = itemList.querySelector(".edit-mode");
    removeItemFromStorage(itemToEdit.textContent);
    itemToEdit.classList.remove("edit-mode");
    itemToEdit.remove();
    isEditMode = false;
  } else {
    if (checkIfItemExists(newItem)) {
      alert("That item already exists!");
      return;
    }
  }

  addItemToDom(newItem);
  addItemToStorage(newItem);

  // reset iteminput
  itemInput.value = "";

  checkUI();
}

function checkIfItemExists(item) {
  const itemsFromStorage = getItemsFromStorage();
  return itemsFromStorage.includes(item);
}

function addItemToDom(item) {
  // create and add new Item to list
  const li = document.createElement("li");
  li.textContent = item;

  const button = createButton("remove-item btn-link text-red");
  const icon = createIcon("fa-solid fa-xmark");
  button.appendChild(icon);
  li.appendChild(button);
  itemList.appendChild(li);
}

function addItemToStorage(item) {
  const itemsFromStorage = getItemsFromStorage();

  itemsFromStorage.push(item);

  // convert to JSON and update Storage
  localStorage.setItem("items", JSON.stringify(itemsFromStorage));
}

function onClickItem(e) {
  // check whether delete icon or text clicked
  if (e.target.parentElement.classList.contains("remove-item")) {
    deleteItem(e.target.parentElement.parentElement);
  } else {
    setItemToEdit(e.target);
  }
}

function setItemToEdit(item) {
  isEditMode = true;

  itemList
    .querySelectorAll("li")
    .forEach((i) => i.classList.remove("edit-mode"));

  item.classList.add("edit-mode");
  btnForm.innerHTML = '<i class="fa-solid fa-pen"></i> Update Item';
  btnForm.style.backgroundColor = "#228B22";
  itemInput.value = item.textContent;

  itemInput.focus();
}

// function to remove an item from the list
function deleteItem(item) {
  if (confirm("Are you sure?")) {
    // remove item from DOM
    item.remove();
    // remove item from storage
    removeItemFromStorage(item.textContent);
  }

  checkUI();
}

function removeItemFromStorage(item) {
  const itemsFromStorage = getItemsFromStorage();
  const itemsToStorage = itemsFromStorage.filter((i) => i != item);
  localStorage.setItem("items", JSON.stringify(itemsToStorage));
}

// function to delete all items from the list
function deleteAllItems() {
  while (itemList.firstChild) {
    itemList.removeChild(itemList.firstChild);
  }

  // remove from local storage
  localStorage.removeItem("items");
  checkUI();
}

function filterItems(e) {
  e.preventDefault();
  const text = e.target.value.toLowerCase();
  const items = itemList.querySelectorAll("li");
  items.forEach((item) => {
    const itemText = item.textContent.toLowerCase();
    if (itemText.indexOf(text) != -1) {
      item.style.display = "flex";
    } else {
      item.style.display = "none";
    }
  });
}

function getItemsFromStorage() {
  let itemsFromStorage;

  if (localStorage.getItem("items") === null) {
    itemsFromStorage = [];
  } else {
    itemsFromStorage = JSON.parse(localStorage.getItem("items"));
  }
  return itemsFromStorage;
}

function checkUI() {
  itemInput.value = "";

  const items = itemList.querySelectorAll("li");
  if (items.length === 0) {
    btnClear.style.display = "none";
    itemFilter.style.display = "none";
  } else {
    btnClear.style.display = "block";
    itemFilter.style.display = "block";
  }
  btnForm.innerHTML = '<i class="fa-solid fa-plus"></i> Add Item';
  btnForm.style.backgroundColor = "#333";

  isEditMode = false;
}

// Initialise app
function init() {
  // Event Listeners
  itemForm.addEventListener("submit", onAddItemSubmit);
  itemList.addEventListener("click", onClickItem);
  btnClear.addEventListener("click", deleteAllItems);
  itemFilter.addEventListener("input", filterItems);
  document.addEventListener("DOMContentLoaded", displayItems);

  // function to run on opening
  checkUI();
}

init();
