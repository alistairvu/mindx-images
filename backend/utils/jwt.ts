import jwt from "jsonwebtoken"

export const generateAccessToken = (_id: string) => {
  const token = jwt.sign(
    { _id: _id },
    process.env.ACCESS_TOKEN_SECRET as string,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRE,
    }
  )
  return token
}

export const generateRefreshToken = (_id: string) => {
  const token = jwt.sign({ _id: _id }, process.env.REFRESH_TOKEN_SECRET)
  return token
}
