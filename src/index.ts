import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import cors from 'cors'
import loanRouter from './routes/loanRoutes'
import authRouter from './routes/adminRoutes'
import adminBlogRouter from './routes/adminBlog'

dotenv.config()
const PORT = process.env.PORT || 3001
export const app = express()

// middlewares
app.use(express.json())
app.use(cors())

// Routers
app.use("/api/v1", loanRouter)
app.use("/api/v1", authRouter)
app.use("/api/v1", adminBlogRouter)

async function startApp() {

    try {
        console.log("Connecting to DB...")
        await mongoose.connect(process.env.MONGO_URI!)
        console.log("Connected to DB successfully")
        app.listen(PORT, () => console.log(`Server listening on port ${PORT || 3001}...`))
    } catch (error) {
        console.log("Error connecting to database", error)
    }
}

startApp();