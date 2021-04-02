import { promisify } from "es6-promisify"
import jwt from "jsonwebtoken"
import { Request, Response } from "express"
import User from "../modules/auth/user"
import HTTPError from "../httpError"
import { UserSchemaInterface } from "../modules/auth/user"

export interface RequestWithUser extends Request {
  user: UserSchemaInterface
}

export const protect = async (
  req: RequestWithUser,
  res: Response,
  next: any
) => {
  try {
    const { token } = req.cookies

    if (!token || token === "deleted") {
      throw new HTTPError("User not authorised", 401)
    }

    const { _id } = jwt.verify(token, process.env.JWT_SECRET) as {
      _id: string
    }

    const user = await User.findById(_id)

    if (!user) {
      throw new HTTPError("User not authorised", 401)
    }

    req.user = user
    next()
  } catch (err) {
    next(err)
  }
}
