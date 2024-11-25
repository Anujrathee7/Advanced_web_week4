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
      if (response.ok) {
        messageElement.textContent = message;
      }
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

      data.todos.forEach((todo, index) => {
        console.log(todo);
        const li = document.createElement("li");
        const deleteTodo = document.createElement("a");

        deleteTodo.href = "#";
        deleteTodo.textContent = "Delete";
        deleteTodo.classList.add("delete-task");
        deleteTodo.setAttribute('data-index', index.toString());
        li.textContent = todo;
        li.appendChild(deleteTodo)
        todoList.appendChild(li);
      });

      const button = document.createElement("button");
      button.id = "deleteUser";
      button.innerText = "Delete";

      button.addEventListener("click", async () => {
        const deleteUser = await fetch("/delete", {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name }),
        });

        const res = await deleteUser.text();
        if (deleteUser.ok) {
          todoList.innerHTML = "";
        }
      });

      todoList.appendChild(button);

      console.log;
    } catch (error) {
      console.log(error);
      return;
    }
  });


  document.getElementById('todoList').addEventListener('click', async (event)=>{
    const target = event.target

    if(target && target.classList.contains('delete-task')){
      const todoElement = target;
      const index = todoElement.getAttribute('data-index');
      const userName = document.getElementById('searchInput').value;
      
      const deleteTodo = await fetch('/update',{
        method: "PUT",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: userName,
          todoIndex: index
        })
      })

      const response = await deleteTodo.text()

      console.log(response)
        todoElement.closest('li').remove();
    }
  })
