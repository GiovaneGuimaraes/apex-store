import { Request, Response, NextFunction } from 'express'
import type { InferCreationAttributes } from 'apex-store-database'
import { Category } from 'apex-store-database'

export async function list(_req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    res.json(await Category.findAll({ order: [['name', 'ASC']] }))
  } catch (err) {
    next(err)
  }
}

export async function getBySlug(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const cat = await Category.findOne({ where: { slug: req.params.slug } })
    if (!cat) {
      res.status(404).json({ error: 'Category not found' })
      return
    }
    res.json(cat)
  } catch (err) {
    next(err)
  }
}

export async function create(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    res.status(201).json(await Category.create(req.body as InferCreationAttributes<Category>))
  } catch (err) {
    next(err)
  }
}

export async function update(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const [updated] = await Category.update(req.body as object, { where: { id: req.params.id } })
    if (!updated) {
      res.status(404).json({ error: 'Category not found' })
      return
    }
    res.json(await Category.findByPk(req.params.id))
  } catch (err) {
    next(err)
  }
}

export async function remove(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const deleted = await Category.destroy({ where: { id: req.params.id } })
    if (!deleted) {
      res.status(404).json({ error: 'Category not found' })
      return
    }
    res.status(204).send()
  } catch (err) {
    next(err)
  }
}
