import { Request, Response } from 'express'
import { PostService } from '../services/posts.services'

export type controllerType = Promise<Response<any, Record<string, any>>>

export const createPost = async (
  req: Request,
  res: Response
): controllerType => {
  const created = await PostService.create(req.body)
  return res.status(created.success ? 201 : 400).json({
    data: created.data,
  })
}

export const getAllPosts = async (
  req: Request,
  res: Response
): controllerType => {
  const posts = await PostService.getAll()
  return res.status(200).json({
    posts,
  })
}

export const getPostById = async (
  req: Request,
  res: Response
): controllerType => {
  const { id } = req.params
  const post = await PostService.getUnique(id)
  return res.status(200).json({
    post,
  })
}

export const updatePostById = async (
  req: Request,
  res: Response
): controllerType => {
  const { id } = req.params
  const updated = await PostService.update(req.body, id)
  return res.status(updated.success ? 200 : 400).json({
    success: updated.success,
    data: updated.data,
  })
}

export const deletePostById = async (
  req: Request,
  res: Response
): controllerType => {
  const deleted = await PostService.delete(req.params.id)
  return res.status(deleted.success ? 200 : 400).json({
    success: deleted.success,
    data: deleted.data,
  })
}
