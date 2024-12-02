document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("todoForm");
  const messageElement = document.getElementById("message");
  const searchForm = document.getElementById("searchForm");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const name = document.getElementById("userInput").value;
    const todo = document.getElementById("todoInput").value;
    try {
      const response = await fetch("/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, todo }),
      });
      const message = await response.text();
      messageElement.textContent = message;
    } catch (error) {
      messageElement.textContent = "Error: Could not add todo.";
    }
  });

  searchForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const name = document.getElementById("searchInput").value;
    try {
      const response = await fetch(`/todos/${name}`);
      const data = await response.json();
      const todoList = document.getElementById("todoList");
      todoList.innerHTML = "";

      data.todos.forEach((todo) => {
        const li = document.createElement("li");
        const deleteTodo = document.createElement("a");
        const checkbox = document.createElement("input");

        deleteTodo.href = "#";
        deleteTodo.textContent = "Delete";
        deleteTodo.classList.add("delete-task");
        checkbox.type = "checkbox";
        checkbox.checked = todo.checked;
        checkbox.className = "checkBoxes";

        checkbox.addEventListener("change", async () => {
          await fetch("/updateTodo", {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              name,
              todo: todo.todo,
              checked: checkbox.checked,
            }),
          });
        });

        deleteTodo.addEventListener("click", async () => {
          await fetch("/update", {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              name,
              todoIndex: data.todos.indexOf(todo),
            }),
          });
          li.remove();
        });

        li.textContent = todo.todo;
        li.appendChild(checkbox);
        li.appendChild(deleteTodo);
        todoList.appendChild(li);
      });
    } catch (error) {
      console.error(error);
    }
  });
});
