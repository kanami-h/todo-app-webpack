import { setFilters } from './filters';
import { getTodos, createTodo, removeTodo, toggleTodo, loadTodos } from './todos';
import { renderTodos } from './views';

renderTodos()

// Set up search text handler
document.querySelector("#search-todos").addEventListener("input", (e) => {
  setFilters({
    searchText: e.target.value
  })
  renderTodos();
});

// Set up checkbox handler
document.querySelector("#hide-completed").addEventListener("change", (e) => {
  setFilters({
    hideCompleted: e.target.value
  })
  renderTodos();
});

// Set up form submission handler
document.querySelector("#add-todo-form").addEventListener("submit", (e) => {
  const text = e.target.elements.text.value.trim()
  e.preventDefault();

  if(text.length > 0){
    createTodo(text)
    renderTodos()
    e.target.elements.text.value = "";
  }
});

// Add a watcher for local storage
window.addEventListener("storage", (e) => {
  if(e.key === "todos") {
    loadTodos()
    renderTodos()
  }
})