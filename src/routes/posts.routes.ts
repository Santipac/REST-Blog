import { Router } from 'express'
import { PostController } from '../controllers/posts.controller'
const router = Router()

router.post('/', PostController.create)
router.get('/', PostController.getAll)
router.get('/:id', PostController.getById)
router.patch('/:id', PostController.update)
router.delete('/:id', PostController.delete)
export default router
