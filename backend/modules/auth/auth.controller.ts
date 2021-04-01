import { Request, Response } from "express"
import createToken from "../../utils/jwt"
import redisClient from "../../redis"
import { promisify } from "es6-promisify"
import jwt from "jsonwebtoken"
import User from "./user"
import HTTPError from "../../httpError"

// POST /api/auth/signup
export const createUser = async (req: Request, res: Response, next: any) => {
  try {
    const { email, password } = req.body

    const existingUser = await User.findOne({ email })
    if (existingUser) {
      throw new HTTPError(`User with email ${email} already exists.`, 401)
    }

    const newUser = await User.create({ email, password })

    const token = createToken(newUser._id)
    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60,
      path: "/",
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
    })

    res.send({ success: 1, loggedIn: 1, user: newUser })
  } catch (err) {
    next(err)
  }
}

// POST /api/auth/login
export const loginUser = async (req: Request, res: Response, next: any) => {
  try {
    const { email, password } = req.body
    const matchingUser = await User.findOne({ email })
    if (!matchingUser) {
      throw new HTTPError("Wrong email/password combination.", 401)
    }

    const isPasswordMatch = matchingUser.checkPassword(password)
    if (!isPasswordMatch) {
      throw new HTTPError("Wrong email/password combination.", 401)
    }

    const token = createToken(matchingUser._id)
    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60,
      path: "/",
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
    })

    res.send({ success: 1, loggedIn: 1, user: matchingUser })
  } catch (err) {
    next(err)
  }
}

// GET api/auth/status
export const checkStatus = async (req: Request, res: Response, next: any) => {
  try {
    const { token } = req.cookies

    const isMemberPromise = promisify(
      redisClient.sismember.bind(redisClient)
    ) as (key: string, member: string) => Promise<boolean>

    const isInBlacklist = await isMemberPromise("mindx-images-blacklist", token)

    if (!token || token === "deleted" || isInBlacklist) {
      return res
        .status(200)
        .send({ success: 1, loggedIn: 0, message: "User not logged in" })
    }

    const { _id } = jwt.verify(token, process.env.JWT_SECRET) as {
      _id: string
    }

    const user = await User.findById(_id)

    if (!user) {
      throw new HTTPError("Wrong credentials", 401)
    }

    const newToken = createToken(user._id)
    redisClient.sadd("mindx-images-blacklist", token)

    res.cookie("token", newToken, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60,
      path: "/",
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
    })

    res.send({ success: 1, loggedIn: 1, user: user })
  } catch (err) {
    next(err)
  }
}

// DELETE api/auth/logout
export const logoutUser = async (req: Request, res: Response, next: any) => {
  try {
    const { token } = req.cookies
    res.clearCookie("token")
    redisClient.sadd("mindx-images-blacklist", token)
    res.send({ success: 1, loggedOut: 1 })
  } catch (err) {
    next(err)
  }
}
