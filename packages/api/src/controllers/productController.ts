import { Request, Response, NextFunction } from 'express'
import type { InferCreationAttributes } from 'apex-store-database'
import { Product, Category, Review, User } from 'apex-store-database'

export async function list(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { category, page = '1', limit = '12', sort = 'createdAt' } = req.query as Record<string, string>
    const where: Record<string, unknown> = {}

    if (category) {
      const cat = await Category.findOne({ where: { slug: category } })
      if (cat) where['categoryId'] = cat.id
    }

    const { count, rows } = await Product.findAndCountAll({
      where,
      include: [{ model: Category, as: 'category' }],
      limit: parseInt(limit),
      offset: (parseInt(page) - 1) * parseInt(limit),
      order: [[sort, 'DESC']],
    })

    res.json({
      data: rows,
      total: count,
      page: parseInt(page),
      limit: parseInt(limit),
      totalPages: Math.ceil(count / parseInt(limit)),
    })
  } catch (err) {
    next(err)
  }
}

export async function getBySlug(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const product = await Product.findOne({
      where: { slug: req.params.slug },
      include: [
        { model: Category, as: 'category' },
        {
          model: Review,
          as: 'reviews',
          include: [{ model: User, as: 'user', attributes: ['name'] }],
        },
      ],
    })
    if (!product) {
      res.status(404).json({ error: 'Product not found' })
      return
    }
    res.json(product)
  } catch (err) {
    next(err)
  }
}

export async function create(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const product = await Product.create(req.body as InferCreationAttributes<Product>)
    res.status(201).json(product)
  } catch (err) {
    next(err)
  }
}

export async function update(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const [updated] = await Product.update(req.body as object, { where: { id: req.params.id } })
    if (!updated) {
      res.status(404).json({ error: 'Product not found' })
      return
    }
    res.json(await Product.findByPk(req.params.id))
  } catch (err) {
    next(err)
  }
}

export async function remove(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const deleted = await Product.destroy({ where: { id: req.params.id } })
    if (!deleted) {
      res.status(404).json({ error: 'Product not found' })
      return
    }
    res.status(204).send()
  } catch (err) {
    next(err)
  }
}

export async function listReviews(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const reviews = await Review.findAll({
      where: { productId: req.params.productId },
      include: [{ model: User, as: 'user', attributes: ['name'] }],
      order: [['createdAt', 'DESC']],
    })
    res.json(reviews)
  } catch (err) {
    next(err)
  }
}

export async function createReview(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { rating, comment } = req.body as { rating: number; comment: string }
    const review = await Review.create({
      userId: req.user!.id,
      productId: parseInt(req.params.productId),
      rating,
      comment,
    })
    res.status(201).json(review)
  } catch (err) {
    next(err)
  }
}
