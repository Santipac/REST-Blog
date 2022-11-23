import { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import config from '../config'

interface IDecode {
  email: string
  id: string
}

type validateMiddleware = Response<any, Record<string, any>> | undefined

export const verifyJWT = (
  req: Request,
  res: Response,
  next: NextFunction
): validateMiddleware => {
  const authHeader = req.headers.authorization
  if (authHeader === undefined) return res.sendStatus(401)
  const token = authHeader.split(' ')[1]
  try {
    const decoded = jwt.verify(token, config.JWT_SECRET) as IDecode
    req.email = decoded.email
    req.id = decoded.id
  } catch (error) {
    return res.sendStatus(403)
  }
  next()
}
