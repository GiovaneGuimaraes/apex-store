import { Request, Response, NextFunction } from 'express'
import { User } from 'apex-store-database'

export async function me(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const user = await User.findByPk(req.user!.id, {
      attributes: { exclude: ['password_hash'] },
    })
    res.json(user)
  } catch (err) {
    next(err)
  }
}

export async function update(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { name } = req.body as { name: string }
    await User.update({ name }, { where: { id: req.user!.id } })
    res.json(
      await User.findByPk(req.user!.id, { attributes: { exclude: ['password_hash'] } }),
    )
  } catch (err) {
    next(err)
  }
}

export async function list(_req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    res.json(await User.findAll({ attributes: { exclude: ['password_hash'] } }))
  } catch (err) {
    next(err)
  }
}
