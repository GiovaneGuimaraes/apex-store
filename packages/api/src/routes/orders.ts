import { Router } from 'express'
import auth from '../middleware/auth'
import adminOnly from '../middleware/adminOnly'
import * as ctrl from '../controllers/orderController'

const router = Router()

router.use(auth)
router.get('/', ctrl.list)
router.get('/:id', ctrl.getById)
router.post('/', ctrl.checkout)
router.put('/:id/status', adminOnly, ctrl.updateStatus)

export default router
