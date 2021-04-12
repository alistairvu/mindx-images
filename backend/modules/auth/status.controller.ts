import { Request, Response, NextFunction } from "express"
import jwt from "jsonwebtoken"

import User from "./user"
import { generateAccessToken } from "../../utils/jwt"

// GET /api/auth/status
export const getLoginStatus = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { refreshToken } = req.cookies

    if (!refreshToken) {
      return res.send({ success: 1, loggedIn: 0 })
    }

    let _id: string

    try {
      const payload = jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET
      ) as {
        _id: string
      }
      _id = payload._id
    } catch (error) {
      return res.send({ success: 1, loggedIn: 0 })
    }

    const user = await User.findById(_id)

    if (!user && !user.refreshTokens.includes(refreshToken)) {
      return res.send({ success: 1, loggedIn: 0 })
    }

    const accessToken = generateAccessToken(_id)

    return res.send({
      success: 1,
      loggedIn: 1,
      user: { _id: user._id, email: user.email },
      token: accessToken,
    })
  } catch (err) {
    next(err)
  }
}
