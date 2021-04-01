import express from "express"
import { getPosts, showPost, createPost, deletePost } from "./post.controller"
import { protect } from "../../middleware/auth.middleware"

const router = express.Router()

router.route("/:id").get(showPost).delete(protect, deletePost)
router.route("/").get(getPosts).post(protect, createPost)

export default router
