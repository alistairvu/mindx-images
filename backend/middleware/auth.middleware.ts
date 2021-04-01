import redisClient from "../redis"
import { promisify } from "es6-promisify"
import jwt from "jsonwebtoken"
import { Request, Response } from "express"
import User from "../modules/auth/user"
import HTTPError from "../httpError"

export interface RequestWithUser extends Request {
  user: {
    _id: string
    email: string
  }
}

export const protect = async (
  req: RequestWithUser,
  res: Response,
  next: any
) => {
  try {
    const { token } = req.cookies

    const isMemberPromise = promisify(
      redisClient.sismember.bind(redisClient)
    ) as (key: string, member: string) => Promise<boolean>

    const isInBlacklist = await isMemberPromise("mindx-images-blacklist", token)

    if (!token || token === "deleted" || isInBlacklist) {
      throw new HTTPError("User not authorised", 401)
    }

    const { _id } = jwt.verify(token, process.env.JWT_SECRET) as {
      _id: string
    }

    const user = await User.findById(_id)

    if (!user) {
      throw new HTTPError("User not authorised", 401)
    }

    next()
  } catch (err) {
    next(err)
  }
}
