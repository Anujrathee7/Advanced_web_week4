import { Request, Response, Router } from "express";
import { User,ITodo,IUser } from "../models/User";

const router: Router = Router();

// Add or update a user with a new todo
router.post("/add", async (req: Request, res: Response) => {
  const { name, todo } = req.body;

  try {
    let user = await User.findOne({ name });

    if (user) {
      user.todos.push({ todo, checked: false });
      await user.save();
      res.status(200).send("Todo added successfully.");
    } else {
      const newUser = new User({ name, todos: [{ todo, checked: false }] });
      await newUser.save();
      res.status(201).send("User created and todo added successfully.");
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Error adding todo.");
  }
});

// Get todos for a specific user
router.get("/todos/:id", async (req: Request, res: Response) => {
  try {
    const user = await User.findOne({ name: req.params.id });
    if (user) {
      res.json({ todos: user.todos });
    } else {
      res.status(404).send("User not found.");
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Error fetching todos.");
  }
});

// Delete a specific todo
router.put("/update", async (req: Request, res: Response) => {
  const { name, todoIndex } = req.body;

  try {
    const user = await User.findOne({ name });
    if (user && user.todos[todoIndex]) {
      user.todos.splice(todoIndex, 1);
      await user.save();
      res.status(200).send("Todo deleted successfully.");
    } else {
      res.status(404).send("Todo or user not found.");
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Error deleting todo.");
  }
});

// Delete a user
router.delete("/delete", async (req: Request, res: Response) => {
  const { name } = req.body;

  try {
    const user = await User.findOneAndDelete({ name });
    if (user) {
      res.status(200).send("User deleted successfully.");
    } else {
      res.status(404).send("User not found.");
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Error deleting user.");
  }
});

// Update todo checked status
router.put("/updateTodo", async (req: Request, res: Response) => {
  const { name, todo, checked } = req.body;

  try {
    const user = await User.findOne({ name });
    if (user) {
      const todoItem = user.todos.find((t) => t.todo === todo);
      if (todoItem) {
        todoItem.checked = checked;
        await user.save();
        res.status(200).send("Todo updated successfully.");
      } else {
        res.status(404).send("Todo not found.");
      }
    } else {
      res.status(404).send("User not found.");
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Error updating todo.");
  }
});

export default router;
