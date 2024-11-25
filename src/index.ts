import { Request, response, Response, Router } from "express";
import fs from "fs";

import { compile } from "morgan";
import { todo } from "node:test";

const router: Router = Router();

type TUser = { name: string; todos: string[] };

let users: TUser[] = [];


router.put("/update", (req: Request, res: Response)=>{
    const {name,todoIndex} = req.body

    const user = users.find(u => u.name.toLowerCase() == name.toLowerCase())
    
    user?.todos.splice(todoIndex,1)

    console.log(users)
    
    write_data()

    res.send("Todo deleted successfully.")
})

router.delete('/delete',(req: Request, res: Response)=>{
    const {name} : {name:string} = req.body

    const userIndex = users.findIndex(u => u.name.toLowerCase() == name.toLowerCase())
    if (userIndex === -1) {
        res.status(404).send('User not found.');
        return  
    }
    
    
    users.splice(userIndex,1);
    
    write_data()
    res.send('User deleted successfully.')
    console.log(users)
})


router.get("/todos/:id",(req: Request, res: Response)=>{
    const userName= req.params.id

    const existingUser = users.find(
        (user) =>user.name.toLocaleLowerCase() === userName.toLocaleLowerCase()
      );
    
    if(existingUser){
        res.json({todos: existingUser.todos})
        return
    }

    res.status(404).send('User not found');
})

router.post("/add", (req: Request, res: Response) => {
  const { name, todo } = req.body;

  const existingUser = users.find(
    (user) => user.name.toLocaleLowerCase() === name.toLocaleLowerCase()
  );

  if (existingUser) {
    existingUser.todos.push(todo);
    write_data();
    res.status(200).send(`Todo added successfully for user ${name}.`);
    return;
  }

  const newUser: TUser = {
    name: name,
    todos: [todo],
  };
  users.push(newUser);
  write_data();
  res.status(200).send(`Todo added successfully for user ${name}.`);
});

/* Functions to read and write data to the database file*/

function write_data() {
  fs.writeFile(
    "data.json", 
    JSON.stringify(users),
    (err: NodeJS.ErrnoException | null) => {
      if (err) {
        console.error(err);
        return;
      }
    }
  );
}

function initializeDataFile() {
    if(!fs.existsSync("data.json")){
        fs.writeFileSync("data.json",JSON.stringify([]));
        console.log("data.json created.")
    }else{
        const data = fs.readFileSync("data.json","utf-8")
        users = JSON.parse(data) as TUser[];
        console.log("Data loaded from Json File")
    }
}   

initializeDataFile()

export default router;
