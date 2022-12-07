import { Request, Response } from 'express'
import { AuthService } from '../services/auth.services'
import { TokenService } from '../services/jwt.services'
import { controllerType } from './posts.controller'

export const registerController = async (
  req: Request,
  res: Response
): controllerType => {
  const { email, name, password } = req.body
  const { user, success, message } = await AuthService.register(
    name,
    email,
    password
  )
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
  const { token, message } = await AuthService.login(email, password)
  if (token !== undefined) {
    return res.json({
      accessToken: token,
    })
  }
  return res.status(401).json({
    message,
  })
}

export const revalidateUserController = async (
  req: Request,
  res: Response
): controllerType => {
  const { id, email } = req
  const token = await TokenService.generate(id, email)
  return res.status(200).json({
    ok: true,
    token,
  })
}
