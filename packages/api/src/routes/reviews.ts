import { Router } from 'express'
import auth from '../middleware/auth'
import * as ctrl from '../controllers/reviewController'

const router = Router()

router.delete('/:id', auth, ctrl.remove)

export default router
