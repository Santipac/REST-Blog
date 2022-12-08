import { Request, Response } from 'express'
import { UserService } from '../services/users.services'
import { controllerType } from './posts.controller'

// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export class UserController {
  public static async getAll(req: Request, res: Response): controllerType {
    const users = await UserService.getAll()
    return res.json({
      users,
    })
  }

  public static async getById(req: Request, res: Response): controllerType {
    const user = await UserService.getById(req.params.id)
    if (user === null) {
      return res.status(400).json({
        message: 'Could not find this user.',
      })
    }
    return res.json({
      user,
    })
  }

  public static async delete(req: Request, res: Response): controllerType {
    const user = await UserService.delete(req.params.id)
    if (user === null) {
      return res.status(400).json({
        message: 'Could not delete this user because doesnt exist.',
      })
    }
    return res.json({
      message: 'User deleted successfully',
      user: {
        id: user.id,
        email: user.email,
      },
    })
  }
}
