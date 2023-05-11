const todoForm = document.getElementById("todo-form");
const todoInput = document.getElementById("todo-input");
const todoList = document.getElementById("todo-list");

let todos = [];

// Load saved todos from localStorage
const savedTodos = JSON.parse(localStorage.getItem("todos"));
if (savedTodos) {
  todos = savedTodos;
  renderTodos();
}

// Event listener for form submission
todoForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const todoText = todoInput.value.trim();
  if (todoText !== "") {
    todos.push({ text: todoText, completed: false });
    todoInput.value = "";
    renderTodos();
    saveTodos();
  }
});

// Event listener for clicking on a todo item
todoList.addEventListener("click", (event) => {
  const target = event.target;
  if (target.matches("li")) {
    const index = target.dataset.index;
    todos[index].completed = !todos[index].completed;
    renderTodos();
    saveTodos();
  }
});

// Event listener for clicking on a "delete" button
todoList.addEventListener("click", (event) => {
  const target = event.target;
  if (target.matches("button")) {
    const index = target.dataset.index;
    todos.splice(index, 1);
    renderTodos();
    saveTodos();
  }
});

// Render the list of todos
function renderTodos() {
  todoList.innerHTML = "";
  todos.forEach((todo, index) => {
    const li = document.createElement("li");
    li.dataset.index = index;
    if (todo.completed) {
      li.classList.add("completed");
    }
    const text = document.createTextNode(todo.text);
    li.appendChild(text);
    const deleteButton = document.createElement("button");
    deleteButton.innerText = "Delete";
    deleteButton.dataset.index = index;
    li.appendChild(deleteButton);
    todoList.appendChild(li);
  });
}

// Save the todos in localStorage
function saveTodos() {
  localStorage.setItem("todos", JSON.stringify(todos));
}
