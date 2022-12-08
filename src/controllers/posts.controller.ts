import { Request, Response } from 'express'
import { PostService } from '../services/posts.services'

export type controllerType = Promise<Response<any, Record<string, any>>>

// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export class PostController {
  public static async create(req: Request, res: Response): controllerType {
    const created = await PostService.create(req.body)
    return res.status(created.success ? 201 : 400).json({
      data: created.data,
    })
  }

  public static async getAll(req: Request, res: Response): controllerType {
    const posts = await PostService.getAll()
    return res.status(200).json({
      posts,
    })
  }

  public static async getById(req: Request, res: Response): controllerType {
    const { id } = req.params
    const post = await PostService.getUnique(id)
    return res.status(200).json({
      post,
    })
  }

  public static async update(req: Request, res: Response): controllerType {
    const { id } = req.params
    const updated = await PostService.update(req.body, id)
    return res.status(updated.success ? 200 : 400).json({
      success: updated.success,
      data: updated.data,
    })
  }

  public static async delete(req: Request, res: Response): controllerType {
    const { id } = req.params
    const deleted = await PostService.delete(id)
    return res.status(deleted.success ? 200 : 400).json({
      success: deleted.success,
      data: deleted.data,
    })
  }
}
