import { Request, Response, NextFunction } from 'express'

export default function adminOnly(req: Request, res: Response, next: NextFunction): void {
  if (req.user?.role !== 'admin') {
    res.status(403).json({ error: 'Forbidden' })
    return
  }
  next()
}
