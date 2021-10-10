// get all required elements
const inputBox = document.querySelector(".inputField input");
const addBtn = document.querySelector(".inputField button");
const todoList = document.querySelector(".todoList");
const deleteAllBtn = document.querySelector(".footer button");

// as user types in text field
inputBox.onkeyup = () => {
    let userData = inputBox.value; // get user entered value
    // be sure entered value is not just space
    if (userData.trim() != 0) addBtn.classList.add("active"); // make add button active
    else addBtn.classList.remove("active"); // make add button inactive
}
showTasks(); // calling showTasks function

// when user clicks on add button
addBtn.onclick = () => {
    // let listArr;
    let userData = inputBox.value; // get user entered value
    let getLocalStorage = localStorage.getItem("New Todo"); // getting local storage
    if (getLocalStorage == null) listArr = []; // create empty array
    else listArr = JSON.parse(getLocalStorage); // json string to js object
    listArr.push(userData); // add user data
    localStorage.setItem("New Todo", JSON.stringify(listArr)); // js object to json string
    showTasks(); // calling showTasks function
    addBtn.classList.remove("active"); // make add button inactive
}

// function to add task list inside ul
function showTasks() {
    let getLocalStorage = localStorage.getItem("New Todo"); // getting local storage
    if (getLocalStorage == null) listArr = []; // create empty array
    else listArr = JSON.parse(getLocalStorage); // json string to js object
    const pendingNumb = document.querySelector(".pendingNumb");
    pendingNumb.textContent = listArr.length; // pass length value in pendingNumb
    // if length makes sense
    if (listArr.length > 0) deleteAllBtn.classList.add("active"); // make clear all button active
    else deleteAllBtn.classList.remove("active"); // make inactive
    let newLiTag = '';
    listArr.forEach((element, index) => {
        newLiTag += `<li>${element} <span onclick="deleteTask(${index})"; ><i class="fas fa-trash"></i></span></li>`;
    });
    todoList.innerHTML = newLiTag; // adding new li tags inside the ul tag
    inputBox.value = ""; // once task added leave the input field blank
}

// delete task function
function deleteTask(index) {
    let getLocalStorage = localStorage.getItem("New Todo"); // getting local storage
    listArr = JSON.parse(getLocalStorage);
    listArr.splice(index, 1); // delete or remove the particular indexed li
    // after removing the li again update the local storage
    localStorage.setItem("New Todo", JSON.stringify(listArr)); // js object to json string
    showTasks(); // calling showTasks function
}

// delete all tasks function
deleteAllBtn.onclick = () => {
    listArr = []; //empty array
    // after delete all task again update the local storage
    localStorage.setItem("New Todo", JSON.stringify(listArr)); // js object to json string
    showTasks(); // calling showTasks function
}
