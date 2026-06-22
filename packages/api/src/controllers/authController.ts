import { Request, Response, NextFunction } from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { User } from 'apex-store-database'

// Use string literals so tsc can validate them as StringValue (ms library)
const ACCESS_EXPIRY = '15m' as const
const REFRESH_EXPIRY = '7d' as const

function signAccess(user: User): string {
  return jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET!, {
    expiresIn: ACCESS_EXPIRY,
  })
}

function signRefresh(user: User): string {
  return jwt.sign({ id: user.id }, process.env.JWT_REFRESH_SECRET!, {
    expiresIn: REFRESH_EXPIRY,
  })
}

export async function register(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { name, email, password } = req.body as { name: string; email: string; password: string }
    const existing = await User.findOne({ where: { email } })
    if (existing) {
      res.status(409).json({ error: 'Email already in use' })
      return
    }
    const password_hash = await bcrypt.hash(password, 10)
    const user = await User.create({ name, email, password_hash })
    res.status(201).json({ accessToken: signAccess(user), refreshToken: signRefresh(user) })
  } catch (err) {
    next(err)
  }
}

export async function login(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { email, password } = req.body as { email: string; password: string }
    const user = await User.findOne({ where: { email } })
    if (!user) {
      res.status(401).json({ error: 'Invalid credentials' })
      return
    }
    const valid = await bcrypt.compare(password, user.password_hash)
    if (!valid) {
      res.status(401).json({ error: 'Invalid credentials' })
      return
    }
    res.json({ accessToken: signAccess(user), refreshToken: signRefresh(user) })
  } catch (err) {
    next(err)
  }
}

export async function refresh(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { refreshToken } = req.body as { refreshToken?: string }
    if (!refreshToken) {
      res.status(401).json({ error: 'Missing refresh token' })
      return
    }
    const payload = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET!) as { id: number }
    const user = await User.findByPk(payload.id)
    if (!user) {
      res.status(401).json({ error: 'User not found' })
      return
    }
    res.json({ accessToken: signAccess(user), refreshToken: signRefresh(user) })
  } catch (err) {
    if ((err as Error).name === 'JsonWebTokenError') {
      res.status(401).json({ error: 'Invalid token' })
      return
    }
    next(err)
  }
}

export function logout(_req: Request, res: Response): void {
  res.status(204).send()
}
