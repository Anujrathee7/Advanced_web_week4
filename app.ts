import express , {Express} from "express"
import path from "path"

import router from "./src/routes/index"



const app: Express = express()


const PORT: number = 3000

app.use(express.json())

app.use(express.static(path.join(__dirname,"../public")));

app.use("/",router)

app.listen(PORT, () =>{
    console.log(`Server is running at http://localhost:${PORT}`)
})