import { Router } from 'express'
import auth from '../middleware/auth'
import * as ctrl from '../controllers/cartController'

const router = Router()

router.use(auth)
router.get('/', ctrl.getCart)
router.post('/items', ctrl.addItem)
router.put('/items/:itemId', ctrl.updateItem)
router.delete('/items/:itemId', ctrl.removeItem)
router.delete('/', ctrl.clearCart)

export default router
