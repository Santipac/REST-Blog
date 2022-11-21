import { Router } from 'express'
import {
  createPost,
  deletePostById,
  getAllPosts,
  getPostById,
  updatePostById,
} from '../controllers/posts.controller'
const router = Router()

router.post('/', createPost)
router.get('/', getAllPosts)
router.get('/:id', getPostById)
router.patch('/:id', updatePostById)
router.delete('/:id', deletePostById)
export default router
