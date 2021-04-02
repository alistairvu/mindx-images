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
    const token = req.headers.authorization
    const rawToken = token.split(" ")[1]

    if (!token || rawToken === "undefined" || !token.startsWith("Bearer ")) {
      console.log("no authorization")
      return res
        .status(200)
        .send({ success: 1, loggedIn: 0, message: "User not logged in" })
    }

    const { _id } = jwt.verify(rawToken, process.env.JWT_SECRET) as {
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
