import { Request, Response, NextFunction } from 'express'
import jwt, { JwtPayload } from 'jsonwebtoken'

interface AuthPayload extends JwtPayload {
  id: number
  role: string
}

export default function auth(req: Request, res: Response, next: NextFunction): void {
  const header = req.headers.authorization
  if (!header?.startsWith('Bearer ')) {
    res.status(401).json({ error: 'Missing token' })
    return
  }
  try {
    req.user = jwt.verify(header.slice(7), process.env.JWT_SECRET!) as AuthPayload
    next()
  } catch {
    res.status(401).json({ error: 'Invalid or expired token' })
  }
}
