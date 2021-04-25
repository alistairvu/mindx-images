import express from "express"
import dotenv from "dotenv"
import connectDB from "./db"
import cookieParser from "cookie-parser"
import { Request, Response } from "express"
import { Server } from "socket.io"
import http from "http"

import authRouter from "./modules/auth/auth.router"
import postRouter from "./modules/post/post.router"
import commentRouter from "./modules/comment/comment.router"

import { handleError } from "./httpError"
import path from "path"

dotenv.config()
connectDB()

const app = express()
const port = process.env.PORT || 6960
const server = http.createServer(app)
const io = new Server(server)

app.use((req: Request, res, next) => {
  req.io = io
  next()
})

app.use(express.json())
app.use(cookieParser())

app.use("/api/auth", authRouter)
app.use("/api/posts", postRouter)
app.use("/api/comments", commentRouter)

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/build")))

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "../frontend/build/index.html"))
  )
}

app.use("*", (req, res) =>
  res.status(404).send({ success: 0, message: "Route not found" })
)

app.use((err: any, req: Request, res: Response, next: any) => {
  handleError(err, res)
})

io.on("connection", (socket) => {
  socket.emit("connected")

  socket.on("join-room", (postId) => {
    socket.join(postId)
  })

  socket.on("leave-room", (postId) => {
    console.log(`Someone left room ${postId}`)
    socket.leave(postId)
  })
})

server.listen(port, () => {
  console.log("Listening on port 6960")
})
