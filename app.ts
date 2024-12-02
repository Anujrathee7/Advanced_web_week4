import express , {Express} from "express"
import path from "path"
import mongoose from "mongoose"

import router from "./src/routes/index"



const app: Express = express()


const PORT: number = 3000

app.use(express.json())

app.use(express.static(path.join(__dirname,"../public")));

mongoose.connect("mongodb://127.0.0.1:27017/testdb", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  } as mongoose.ConnectOptions)
    .then(() => console.log("MongoDB connected successfully"))
    .catch((err) => console.error("MongoDB connection error:", err));

app.use("/",router)

app.listen(PORT, () =>{
    console.log(`Server is running at http://localhost:${PORT}`)
})