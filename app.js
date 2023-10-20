var inputBox = document.getElementById('inputBox');
var addBtn = document.getElementById('addBtn');
var todoList = document.getElementById('todoList');

var editTodo = null;

// Function to add todo
function addTodo() {
    var inputText = inputBox.value.trim();
    if (inputText.length <= 0) {
        alert("You must write something in your to do");
        return false;
    }

    if (addBtn.value === "Edit") {
        // Passing the original text to editLocalTodos function before edit it in the todoList
        editLocalTodos(editTodo.target.previousElementSibling.innerHTML);
        editTodo.target.previousElementSibling.innerHTML = inputText;
        addBtn.value = "Add";
        addBtn.innerHTML = 'Add';
        inputBox.value = "";
    }
    else {
        //Creating p tag
        var li = document.createElement("li");
        var p = document.createElement("p");
        p.innerHTML = inputText;
        li.appendChild(p);

        // Creating Edit Btn
        var editBtn = document.createElement("button");
        editBtn.innerText = "Edit";
        editBtn.classList.add("btn", "editBtn", "btn-danger", "me-1");
        li.appendChild(editBtn);

        // Creating Delete Btn
        var deleteBtn = document.createElement("button");
        // var icon = document.createElement('i');
        // icon.setAttribute('class', 'fa-solid fa-plus')
        deleteBtn.innerText = "Delete";
        deleteBtn.classList.add("btn", "deleteBtn", "btn-danger", "me-1");
        li.appendChild(deleteBtn);

        todoList.appendChild(li);
        inputBox.value = "";

        saveLocalTodos(inputText);
    }
}

// function to delete All
function deleteAll(){
    
    localStorage.clear();
    todoList.innerHTML = "";
}


// Function to update : (Edit/Delete) todo
var updateTodo = (e) => {
    if (e.target.innerHTML === "Delete") {
        todoList.removeChild(e.target.parentElement);
        deleteLocalTodos(e.target.parentElement);
    }

    if (e.target.innerHTML === "Edit") {
        inputBox.value = e.target.previousElementSibling.innerHTML;
        inputBox.focus();
        addBtn.value = "Edit";
        addBtn.innerHTML = 'Update';
        editTodo = e;
    }
}

// Function to save local todo
function saveLocalTodos(todo){
    var todos;
    if (localStorage.getItem("todos") === null) {
        todos = [];
    }
    else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos));
}

// Function to get local todo
var getLocalTodos = () => {
    var todos;
    if (localStorage.getItem("todos") === null) {
        todos = [];
    }
    else {
        todos = JSON.parse(localStorage.getItem("todos"));
        todos.forEach(todo => {

            //Creating p tag
            var li = document.createElement("li");
            var p = document.createElement("p");
            p.innerHTML = todo;
            li.appendChild(p);


            // Creating Edit Btn
            var editBtn = document.createElement("button");
            editBtn.innerText = "Edit";
            editBtn.classList.add("btn", "editBtn", "btn-danger", "me-1");
            li.appendChild(editBtn);

            // Creating Delete Btn
            var deleteBtn = document.createElement("button");
            deleteBtn.innerText = "Delete";
            deleteBtn.classList.add("btn", "deleteBtn", "btn-danger", "me-1");
            li.appendChild(deleteBtn);

            todoList.appendChild(li);
        });
    }
}

// Function to delete local todo
var deleteLocalTodos = (todo) => {
    var todos;
    if (localStorage.getItem("todos") === null) {
        todos = [];
    }
    else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }

    var todoText = todo.children[0].innerHTML;
    var todoIndex = todos.indexOf(todoText);
    todos.splice(todoIndex, 1);
    localStorage.setItem("todos", JSON.stringify(todos));
    console.log(todoIndex);
}

var editLocalTodos = (todo) => {
    var todos = JSON.parse(localStorage.getItem("todos"));
    var todoIndex = todos.indexOf(todo);
    todos[todoIndex] = inputBox.value;
    localStorage.setItem("todos", JSON.stringify(todos));
}

document.addEventListener('DOMContentLoaded', getLocalTodos);
addBtn.addEventListener('click', addTodo);
todoList.addEventListener('click', updateTodo);