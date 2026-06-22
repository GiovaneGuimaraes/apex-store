import { Request, Response, NextFunction } from 'express'
import { Review } from 'apex-store-database'

export async function remove(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const review = await Review.findByPk(req.params.id)
    if (!review) {
      res.status(404).json({ error: 'Review not found' })
      return
    }
    if (review.userId !== req.user!.id && req.user!.role !== 'admin') {
      res.status(403).json({ error: 'Forbidden' })
      return
    }
    await review.destroy()
    res.status(204).send()
  } catch (err) {
    next(err)
  }
}
