import { Router } from 'express'
import {
  loginController,
  registerController,
  revalidateUserController,
} from '../controllers/auth.controller'
import { verifyJWT } from '../middlewares/verifyJWT'

const router = Router()

router.post('/signup', registerController)
router.post('/', loginController)
router.get('/refresh', verifyJWT, revalidateUserController)

export default router
