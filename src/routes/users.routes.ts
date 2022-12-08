import { Router } from 'express'
import { UserController } from '../controllers/users.controller'

const router = Router()

router.get('/', UserController.getAll)
router.get('/:id', UserController.getById)
router.patch('/:id')
router.delete('/:id', UserController.delete)

export default router
