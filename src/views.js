import { getFilters } from './filters';
import { getTodos, removeTodo, toggleTodo } from './todos';

const renderTodos = () => {
  const todoEl = document.querySelector("#todos")
  const filters = getFilters()
  const filteredTodos = getTodos().filter((todo) => {
    const searchTextMatch = todo.text
      .toLowerCase()
      .includes(filters.searchText.toLowerCase());
    const hideCompletedMatch = !filters.hideCompleted || !todo.completed;

    return searchTextMatch && hideCompletedMatch;
  });

  const incompleteTodos = filteredTodos.filter((todo) => !todo.completed);

  todoEl.innerHTML = "";
  todoEl
    .appendChild(generateSummaryDOM(incompleteTodos));

  if(filteredTodos.length > 0) {
    filteredTodos.forEach((todo) => {
      todoEl.appendChild(generateTodoDOM(todo));
    });
  } else {
    const messageEl = document.createElement("p")
    messageEl.textContent = "There are no to-dos to show"
    todoEl.appendChild(messageEl)
  }

}

const generateTodoDOM = (todo) => {
  const todoEl = document.createElement("div");
  const todoWrapper = document.createElement("div")
  const textEl = document.createElement("span");
  const checkbox = document.createElement("input");
  const button = document.createElement("button");

  // setup a checkbox before todo text
  checkbox.setAttribute("type", "checkbox");
  checkbox.checked = todo.completed;
  todoWrapper.appendChild(checkbox);

  textEl.textContent = todo.text;
  todoEl.appendChild(todoWrapper);

  // set a delete button after todo text
  button.textContent = "remove";
  button.classList.add("remove-btn")
  todoEl.appendChild(button);

  // Remove todo when delete button clicked
  button.addEventListener("click", () => {
    removeTodo(todo.id)
    renderTodos();
  });

  // Updated completed: false to true when checkbox checked
  checkbox.addEventListener("change", () => {
    toggleTodo(todo.id)
    renderTodos();
  });
  todoEl.classList.add("todo-item")
  todoWrapper.appendChild(textEl);
  return todoEl;
}

const generateSummaryDOM = (incompleteTodos) => {
  const summary = document.createElement("h2");
  summary.textContent = `You have ${incompleteTodos.length} todos left`;
  return summary;
}
// Make sure to set up the exports

export { renderTodos, generateTodoDOM, generateSummaryDOM }