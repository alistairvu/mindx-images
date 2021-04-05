import { Request, Response } from "express"
import createToken from "../../utils/jwt"
import jwt from "jsonwebtoken"
import User from "./user"
import HTTPError from "../../httpError"

// POST /api/auth/signup
export const createUser = async (req: Request, res: Response, next: any) => {
  try {
    const { email, password } = req.body.user

    const existingUser = await User.findOne({ email })
    if (existingUser) {
      throw new HTTPError(`User with email ${email} already exists.`, 401)
    }

    const newUser = await User.create({ email, password })

    const token = createToken(newUser._id)
    res.send({ success: 1, loggedIn: 1, user: newUser, token: token })
  } catch (err) {
    next(err)
  }
}

// POST /api/auth/login
export const loginUser = async (req: Request, res: Response, next: any) => {
  try {
    const { email, password } = req.body.user
    const matchingUser = await User.findOne({ email })
    if (!matchingUser) {
      throw new HTTPError("Wrong email/password combination.", 401)
    }

    const isPasswordMatch = matchingUser.checkPassword(password)
    if (!isPasswordMatch) {
      throw new HTTPError("Wrong email/password combination.", 401)
    }

    const token = createToken(matchingUser._id)
    res.send({ success: 1, loggedIn: 1, user: matchingUser, token: token })
  } catch (err) {
    next(err)
  }
}

// GET api/auth/status
export const checkStatus = async (req: Request, res: Response, next: any) => {
  try {
    const token = req.headers.authorization
    const rawToken = token.split(" ")[1]
    console.log(rawToken)

    if (
      !token ||
      !token.startsWith("Bearer ") ||
      !rawToken ||
      rawToken === "undefined"
    ) {
      return res
        .status(200)
        .send({ success: 1, loggedIn: 0, message: "User not logged in" })
    }

    const { _id } = jwt.verify(rawToken, process.env.JWT_SECRET) as {
      _id: string
    }

    const user = await User.findById(_id)

    if (!user) {
      throw new HTTPError("Wrong credentials", 401)
    }

    res.send({ success: 1, loggedIn: 1, user: user })
  } catch (err) {
    next(err)
  }
}

// DELETE api/auth/logout
export const logoutUser = async (req: Request, res: Response, next: any) => {
  try {
    res.send({ success: 1, loggedOut: 1 })
  } catch (err) {
    next(err)
  }
}
