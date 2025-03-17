const express=require("express")
const { default: mongoose } = require("mongoose")
const dotenv=require("dotenv")

const cors=require("cors")
const cookieParser=require("cookie-parser")

const authRouter=require("./routes/auth")
const userRouter=require("./routes/users")
const postRouter=require("./routes/posts")
const commentRouter=require("./routes/comments")


const app=express()

dotenv.config()

//middlewares
app.use(express.json())
app.use(cookieParser())
app.use(cors({origin:"http://localhost:5173",credentials:true}))

app.use("/api/auth",authRouter)
app.use("/api/users",userRouter)
app.use("/api/posts",postRouter)
app.use("/api/comments",commentRouter)



//connect to db
const connectDB=async()=>{
    try {
        await mongoose.connect(process.env.MONGODB)
        console.log("MONGO DB connected!")
    } catch (error) {
        console.log(error)
    }
}

app.listen(5000,()=>{
    connectDB()
    console.log("Listen to port 5000");
    
})