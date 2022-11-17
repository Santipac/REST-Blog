import { Router } from 'express'
import {
  deleteUser,
  getAllUsers,
  getUserById,
} from '../controllers/users.controller'

const router = Router()

router.get('/', getAllUsers)
router.get('/:id', getUserById)
router.patch('/:id')
router.delete('/:id', deleteUser)

export default router
