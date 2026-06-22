import { Router } from 'express'
import { z } from 'zod'
import validate from '../middleware/validate'
import * as authController from '../controllers/authController'

const router = Router()

const registerSchema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email(),
  password: z.string().min(6),
})

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
})

router.post('/register', validate(registerSchema), authController.register)
router.post('/login', validate(loginSchema), authController.login)
router.post('/refresh', authController.refresh)
router.delete('/logout', authController.logout)

export default router
