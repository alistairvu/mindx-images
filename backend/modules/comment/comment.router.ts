import express from "express"
import { getComments, deleteComment, createComment } from "./comment.controller"
import { protect } from "../../middleware/auth.middleware"

const router = express.Router()

router.route("/post/:id").get(getComments)
router.route("/:id").delete(protect, deleteComment)
router.route("/").post(protect, createComment)

export default router
