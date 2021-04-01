import { Response } from "express"

export default class HTTPError extends Error {
  status: number

  constructor(message: string, status: number) {
    super(message)
    this.status = status || 500
  }
}

export const handleError = (err: any, res: Response) => {
  const { status, message } = err
  res.status(status || 500).send({ success: 0, message: message })
}
