import { Router } from 'express'
import { AuthController } from '../controllers/auth.controller'
import { verifyJWT } from '../middlewares/verifyJWT'

const router = Router()

router.post('/', AuthController.login)
router.post('/signup', AuthController.register)
router.get('/refresh', verifyJWT, AuthController.revalidate)

export default router
