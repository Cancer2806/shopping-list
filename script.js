// Link to items in index.html
const itemForm = document.querySelector("#item-form");
const itemInput = document.getElementById("item-input");
const itemList = document.getElementById("item-list");
const btnClear = document.querySelector("#clear");
const itemFilter = document.getElementById("filter");

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

  checkUI();
}

// function to remove an item from the list
function deleteItem(e) {
  if (e.target.parentElement.classList.contains("remove-item")) {
    if (confirm("Are you sure?")) {
      e.target.parentElement.parentElement.remove();
    }
  }
  checkUI();
}

// function to delete all items from the list
function deleteAllItems() {
  while (itemList.firstChild) {
    itemList.removeChild(itemList.firstChild);
  }
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

function checkUI() {
  const items = itemList.querySelectorAll("li");
  if (items.length === 0) {
    btnClear.style.display = "none";
    itemFilter.style.display = "none";
  } else {
    btnClear.style.display = "block";
    itemFilter.style.display = "block";
  }
}

// Event Listeners
itemForm.addEventListener("submit", addItem);
itemList.addEventListener("click", deleteItem);
btnClear.addEventListener("click", deleteAllItems);
itemFilter.addEventListener("input", filterItems);

// function to run on opening
checkUI();
