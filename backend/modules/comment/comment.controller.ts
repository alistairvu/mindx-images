import { Response, Request } from "express"
import { RequestWithUser } from "../../middleware/auth.middleware"
import Comment from "./comment"
import Post from "../post/post"
import HTTPError from "../../httpError"

// GET /api/comments/post/:id
export const getComments = async (req: Request, res: Response, next: any) => {
  try {
    const postId = req.params.id
    const post = await Post.findById(postId).populate("createdBy")

    if (!post) {
      throw new HTTPError("No matching posts found", 404)
    }

    const comments = await Comment.find({
      post: postId,
    })
    res.send({ success: 1, comments: comments })
  } catch (err) {
    next(err)
  }
}

// POST /api/comments
export const createComment = async (
  req: RequestWithUser,
  res: Response,
  next: any
) => {
  try {
    const { postId, content } = req.body
    const post = await Post.findById(postId)

    if (!post) {
      throw new HTTPError("No matching posts found", 404)
    }

    const comment = await Comment.create({
      content: content,
      post: postId,
      createdBy: req.user._id,
    })

    res.send({ success: 1, comment: comment })
  } catch (err) {
    next(err)
  }
}

// DELETE /api/comments/:id
export const deleteComment = async (
  req: RequestWithUser,
  res: Response,
  next: any
) => {
  try {
    const commentId = req.params.id
    await Comment.findByIdAndDelete(commentId)
    res.send({ success: 1, deleted: 1 })
  } catch (err) {
    next(err)
  }
}
