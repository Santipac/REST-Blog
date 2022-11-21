import { Request, Response } from 'express'
import { login, register } from '../services/auth.services'
import { controllerType } from './posts.controller'

export const registerController = async (
  req: Request,
  res: Response
): controllerType => {
  const { email, name, password } = req.body
  const { user, success, message } = await register(name, email, password)
  return res.status(success ? 201 : 400).json({
    message,
    user,
  })
}
export const loginController = async (
  req: Request,
  res: Response
): controllerType => {
  const { email, password } = req.body
  const { token, message, refreshToken } = await login(email, password)
  if (token !== undefined) {
    res.cookie('jwt', refreshToken, {
      httpOnly: true,
      sameSite: 'none',
      maxAge: 24 * 60 * 60 * 1000,
    })
    return res.json({
      accessToken: token,
    })
  }
  return res.status(401).json({
    message,
  })
}

// export const refreshTokenController = async (
//   req: Request,
//   res: Response
// ): controllerType => {
//   const cookies = req.cookies
//   if (!cookies?.jwt) return res.sendStatus(401)
// }
