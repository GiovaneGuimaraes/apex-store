import { Request, Response, NextFunction } from 'express'
import { Order, OrderItem, Cart, CartItem, Product, sequelize } from 'apex-store-database'
import type { OrderStatus } from 'apex-store-database'

export async function list(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const orders = await Order.findAll({
      where: { userId: req.user!.id },
      include: [{ model: OrderItem, as: 'items', include: [{ model: Product, as: 'product' }] }],
      order: [['createdAt', 'DESC']],
    })
    res.json(orders)
  } catch (err) {
    next(err)
  }
}

export async function getById(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const order = await Order.findOne({
      where: { id: req.params.id, userId: req.user!.id },
      include: [{ model: OrderItem, as: 'items', include: [{ model: Product, as: 'product' }] }],
    })
    if (!order) {
      res.status(404).json({ error: 'Order not found' })
      return
    }
    res.json(order)
  } catch (err) {
    next(err)
  }
}

type CartRow = Cart & { items?: Array<CartItem & { product?: Product }> }

export async function checkout(req: Request, res: Response, next: NextFunction): Promise<void> {
  const t = await sequelize.transaction()
  try {
    const cart = (await Cart.findOne({
      where: { userId: req.user!.id },
      include: [{ model: CartItem, as: 'items', include: [{ model: Product, as: 'product' }] }],
      transaction: t,
    })) as CartRow | null

    if (!cart?.items?.length) {
      await t.rollback()
      res.status(400).json({ error: 'Cart is empty' })
      return
    }

    const total = cart.items.reduce(
      (s, i) => s + (i.product?.price ?? 0) * (i.quantity ?? 0),
      0,
    )
    const order = await Order.create({ userId: req.user!.id, total }, { transaction: t })

    await OrderItem.bulkCreate(
      cart.items.map((i) => ({
        orderId: order.id!,
        productId: i.productId,
        quantity: i.quantity ?? 1,
        unit_price: i.product?.price ?? 0,
      })),
      { transaction: t },
    )

    for (const item of cart.items) {
      await Product.decrement('stock', {
        by: item.quantity ?? 1,
        where: { id: item.productId },
        transaction: t,
      })
    }

    await CartItem.destroy({ where: { cartId: cart.id! }, transaction: t })
    await t.commit()

    res.status(201).json(order)
  } catch (err) {
    await t.rollback()
    next(err)
  }
}

export async function updateStatus(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { status } = req.body as { status: OrderStatus }
    const [updated] = await Order.update({ status }, { where: { id: req.params.id } })
    if (!updated) {
      res.status(404).json({ error: 'Order not found' })
      return
    }
    res.json(await Order.findByPk(req.params.id))
  } catch (err) {
    next(err)
  }
}
