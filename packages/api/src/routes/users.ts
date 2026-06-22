import { Router } from 'express'
import auth from '../middleware/auth'
import adminOnly from '../middleware/adminOnly'
import * as ctrl from '../controllers/userController'

const router = Router()

router.get('/me', auth, ctrl.me)
router.put('/me', auth, ctrl.update)
router.get('/', auth, adminOnly, ctrl.list)

export default router
