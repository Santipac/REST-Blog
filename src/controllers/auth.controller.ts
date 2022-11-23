import { Request, Response } from 'express'
import { generateJWT } from '../helpers/jwt'
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
  const { token, message } = await login(email, password)
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
  const token = await generateJWT(id, email)
  return res.status(200).json({
    ok: true,
    token,
  })
}
