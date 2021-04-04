import { Response, Request } from "express"
import { RequestWithUser } from "../../middleware/auth.middleware"
import Post from "./post"
import Comment from "../comment/comment"
import HTTPError from "../../httpError"

// GET /api/posts
export const getPosts = async (req: Request, res: Response, next: any) => {
  try {
    const pageSize = Number(req.query.pageSize) || 4
    const pageNumber = Number(req.query.page) || 1
    const offset = pageSize * (pageNumber - 1)

    const postAggregate = await Post.aggregate([
      {
        $facet: {
          posts: [
            { $skip: offset },
            { $limit: pageSize },
            {
              $lookup: {
                from: "users",
                localField: "createdBy",
                foreignField: "_id",
                as: "createdBy",
              },
            },
            {
              $project: {
                createdBy: {
                  password: 0,
                },
              },
            },
          ],
          count: [
            {
              $count: "postCount",
            },
          ],
        },
      },
    ])

    const { posts, count } = postAggregate[0]
    const { postCount } = count[0]
    const pageCount = Math.ceil(postCount / pageSize)

    res.send({
      success: 1,
      pageNumber: pageNumber,
      pageCount: pageCount,
      posts: posts,
    })
  } catch (err) {
    next(err)
  }
}

// GET /api/posts/:id
export const showPost = async (req: Request, res: Response, next: any) => {
  try {
    const post = await Post.findById(req.params.id).populate(
      "createdBy",
      "email"
    )

    if (!post) {
      throw new HTTPError("No matching posts found", 404)
    }

    const comments = await Comment.find({ post: post._id }).populate(
      "createdBy",
      "email"
    )

    res.send({ success: 1, post: post, comments: comments })
  } catch (err) {
    next(err)
  }
}

// POST /api/post
export const createPost = async (
  req: RequestWithUser,
  res: Response,
  next: any
) => {
  try {
    const { imageUrl, title, description } = req.body.post
    const createdBy = req.user._id
    const post = await Post.create({ imageUrl, title, description, createdBy })
    res.send({ success: 1, post: post })
  } catch (err) {
    next(err)
  }
}

// DELETE /api/posts/:id
export const deletePost = async (
  req: RequestWithUser,
  res: Response,
  next: any
) => {
  try {
    const post = await Post.findByIdAndDelete(req.params.id)

    if (!post) {
      throw new HTTPError("No matching posts found", 404)
    }

    if (post.createdBy.toString() !== req.user._id.toString()) {
      throw new HTTPError("Action not allowed", 401)
    }

    res.send({ success: 1, deleted: 1 })
  } catch (err) {
    next(err)
  }
}
