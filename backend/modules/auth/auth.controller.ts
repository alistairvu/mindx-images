import { Request, Response } from "express"
import { generateAccessToken, generateRefreshToken } from "../../utils/jwt"
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

    const accessToken = generateAccessToken(newUser._id)
    const refreshToken = generateRefreshToken(newUser._id)

    newUser.refreshTokens.push(refreshToken)
    newUser.save()

    res.cookie("refreshToken", refreshToken, {
      path: "/",
      secure: process.env.NODE_ENV === "production",
      httpOnly: true,
      maxAge: 10 * 365 * 24 * 3600 * 1000,
    })
    res.send({
      success: 1,
      loggedIn: 1,
      user: { _id: newUser._id, email: newUser.email },
      token: accessToken,
    })
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

    const accessToken = generateAccessToken(matchingUser._id)
    const refreshToken = generateRefreshToken(matchingUser._id)

    matchingUser.refreshTokens.push(refreshToken)
    matchingUser.save()

    res.cookie("refreshToken", refreshToken, {
      path: "/",
      secure: process.env.NODE_ENV === "production",
      httpOnly: true,
      maxAge: 10 * 365 * 24 * 3600 * 1000,
    })

    res.send({
      success: 1,
      loggedIn: 1,
      user: { _id: matchingUser._id, email: matchingUser.email },
      token: accessToken,
    })
  } catch (err) {
    next(err)
  }
}

// DELETE api/auth/logout
export const logoutUser = async (req: Request, res: Response, next: any) => {
  try {
    const { refreshToken } = req.cookies
    const { _id } = jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET
    ) as { _id: string }

    await User.findByIdAndUpdate(_id, {
      $pull: {
        refreshTokens: refreshToken,
      },
    })

    res.clearCookie("refreshToken")

    res.send({ success: 1, loggedOut: 1 })
  } catch (err) {
    next(err)
  }
}
