import jwt from "jsonwebtoken"

const createToken = (_id: string) => {
  const token = jwt.sign(
    { _id: _id, time: new Date() },
    process.env.JWT_SECRET as string,
    {
      expiresIn: "1h",
    }
  )
  return token
}

export default createToken
