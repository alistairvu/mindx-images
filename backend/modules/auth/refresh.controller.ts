import { Request, Response, NextFunction } from "express"
import jwt from "jsonwebtoken"

import User from "./user"
import { generateAccessToken } from "../../utils/jwt"
import { sismemberAsync } from "../../redis"
import HTTPError from "../../httpError"

// GET /api/auth/refresh
export const refreshAccessToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { refreshToken } = req.cookies

    if (!refreshToken) {
      throw new HTTPError("No refresh tokens", 401)
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
      throw new HTTPError("Invalid refresh token", 401)
    }

    const user = await User.findById(_id)
    if (!user) {
      throw new HTTPError("Invalid refresh token", 401)
    }

    const isRefreshToken = await sismemberAsync(
      `mindx-images-${_id}`,
      refreshToken
    )
    if (!isRefreshToken) {
      throw new HTTPError("Invalid refresh token", 401)
    }

    const accessToken = generateAccessToken(_id)

    return res.send({
      success: 1,
      token: accessToken,
    })
  } catch (err) {
    next(err)
  }
}
