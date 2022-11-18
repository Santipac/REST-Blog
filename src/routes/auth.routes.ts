import { Router } from 'express'
import {
  loginController,
  registerController,
} from '../controllers/auth.controller'

const router = Router()

router.post('/signup', registerController)
router.post('/', loginController)

export default router
