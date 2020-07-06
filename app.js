const choreForm = document.querySelector("#chore-form");
const choreList = document.querySelector(".collection");
const clearChores = document.querySelector(".clear-chore");
const choreInput = document.querySelector("#chores-added");


// Load all event Listeners
loadEventListeners();

function loadEventListeners() {
//DOM Load Event
 document.addEventListener("DOMContentLoaded", getChores);
// Form Submit Event
choreForm.addEventListener("submit", addChore);
// Remove chore list event
choreList.addEventListener("click", removeChore);
// Clear Chore List Events
clearChores.addEventListener("click", clearList);
}

// Get Chores from Local Storage
function getChores() {
  let chores;
  if(localStorage.getItem("chores") === null) {
    chores = [];
  } else {
    chores =  JSON.parse(localStorage.getItem("chores"));
  }

  chores.forEach(function(chore) {
    // Create li element
  const li = document.createElement("li");
  // Add class
  li.className = "collection-item  amber darken-1";
  // Create text node and append to li
  li.appendChild(document.createTextNode(chore));
  // Create new link element (delete each chore icon)
  const link = document.createElement('a');
  // Add class to link
  link.className = "delete-item secondary-content";
  // Add icon html for link
  link.innerHTML = '<i class="fas fa-birthday-cake fa-2x"></i>';
  // Append link to li
  li.appendChild(link);

  // Append li to ul
  choreList.appendChild(li);
  });
}

// Add Chore
function addChore(e) {
  if(choreInput.value === "") {
alert("Add a chore");
  }

  // Create li element
  const li = document.createElement("li");
  // Add class
  li.className = "collection-item  amber darken-1";
  // Create text node and append to li
  li.appendChild(document.createTextNode(choreInput.value));
  // Create new link element (delete each chore icon)
  const link = document.createElement('a');
  // Add class to link
  link.className = "delete-item secondary-content";
  // Add icon html for link
  link.innerHTML = '<i class="fas fa-birthday-cake fa-2x"></i>';
  // Append link to li
  li.appendChild(link);

  // Append li to ul
  choreList.appendChild(li);

  // Store in Local Storage
  storeChore(choreInput.value);

  // Clear Input
  choreInput.value = "";

e.preventDefault();
}

// Store Chore
function storeChore(chore) {
  let chores;
  if(localStorage.getItem("chores") === null) {
    chores = [];
  } else {
    chores =  JSON.parse(localStorage.getItem("chores"));
  }
  chores.push(chore);
  localStorage.setItem("chores", JSON.stringify(chores));
}

// Remove Chore
function removeChore(e){
  if(e.target.parentElement.classList.contains("delete-item")) {
    if(confirm("Are You Sure?")){
      e.target.parentElement.parentElement.remove();

      // Remove from Local Storage
      removeFromLocalStorage(e.target.parentElement.parentElement);
    }
  }
}

// Remove from Local Storage
function removeFromLocalStorage(choreItem) {
  let chores;
  if(localStorage.getItem("chores") === null) {
    chores = [];
  } else {
    chores =  JSON.parse(localStorage.getItem("chores"));
  }

  chores.forEach(function(chore, index){
    if(choreItem.textContent === chore){
      chores.splice(index, 1);
    }
  });

  localStorage.setItem("chores", JSON.stringify(chores));
}

// Clear Chore List
function clearList() {
  while(choreList.firstChild) {
    choreList.removeChild(choreList.firstChild);
  }

// Clear Chores From Local Storage
clearChoreFromLocalStorage();
}

// CLear Chores From Local Storage
function clearChoreFromLocalStorage() {
localStorage.clear();
}




