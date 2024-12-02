import express , {Express} from "express"
import path from "path"
import mongoose, { Connection } from 'mongoose' 
import router from "./src/routes/index"



const app: Express = express()


const PORT: number = 3000

app.use(express.json())

app.use(express.static(path.join(__dirname,"../public")));

const mongoDB: string = "mongodb://127.0.0.1:27017/testdb"
mongoose.connect(mongoDB)
mongoose.Promise = Promise
const db: Connection = mongoose.connection

db.on("error", console.error.bind(console, "MongoDB connection error"))

app.use("/",router)

app.listen(PORT, () =>{
    console.log(`Server is running at http://localhost:${PORT}`)
})