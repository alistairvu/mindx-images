import jwt from "jsonwebtoken"

const createToken = (_id: string) => {
  const token = jwt.sign(
    { _id: _id, time: new Date() },
    process.env.JWT_SECRET as string,
    {
      expiresIn: "7d",
    }
  )
  return token
}

export default createToken
