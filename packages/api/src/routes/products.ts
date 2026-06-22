import { Router } from 'express'
import auth from '../middleware/auth'
import adminOnly from '../middleware/adminOnly'
import * as ctrl from '../controllers/productController'

const router = Router()

router.get('/', ctrl.list)
router.get('/:slug', ctrl.getBySlug)
router.post('/', auth, adminOnly, ctrl.create)
router.put('/:id', auth, adminOnly, ctrl.update)
router.delete('/:id', auth, adminOnly, ctrl.remove)

router.get('/:productId/reviews', ctrl.listReviews)
router.post('/:productId/reviews', auth, ctrl.createReview)

export default router
