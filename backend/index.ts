import express from "express"
import dotenv from "dotenv"
import connectDB from "./db"
import cookieParser from "cookie-parser"
import { Request, Response } from "express"

import authRouter from "./modules/auth/auth.router"
import postRouter from "./modules/post/post.router"
import commentRouter from "./modules/comment/comment.router"
import { handleError } from "./httpError"

dotenv.config()
connectDB()

const app = express()
const port = process.env.PORT || 6960

app.use(express.json())
app.use(cookieParser())

app.use("/api/auth", authRouter)
app.use("/api/posts", postRouter)
app.use("/api/comments", commentRouter)

app.use("*", (req, res) =>
  res.status(404).send({ success: 0, message: "Route not found" })
)

app.use((err: any, req: Request, res: Response, next: any) => {
  handleError(err, res)
})

app.listen(port, () => {
  console.log("Listening on port 6960")
})
