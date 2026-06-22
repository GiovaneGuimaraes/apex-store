import { Request, Response, NextFunction } from 'express'
import { Cart, CartItem, Product } from 'apex-store-database'

async function getOrCreateCart(userId: number): Promise<Cart> {
  const [cart] = await Cart.findOrCreate({ where: { userId }, defaults: { userId } })
  return cart
}

async function cartWithItems(cartId: number): Promise<Cart> {
  return Cart.findByPk(cartId, {
    include: [{ model: CartItem, as: 'items', include: [{ model: Product, as: 'product' }] }],
  }) as Promise<Cart>
}

function computeTotal(cart: Cart & { items?: Array<CartItem & { product?: Product }> }): number {
  return (cart.items ?? []).reduce((sum, i) => sum + (i.product?.price ?? 0) * (i.quantity ?? 0), 0)
}

export async function getCart(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const cart = await getOrCreateCart(req.user!.id)
    const full = await cartWithItems(cart.id!)
    res.json({ ...full.toJSON(), total: computeTotal(full) })
  } catch (err) {
    next(err)
  }
}

export async function addItem(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { productId, quantity = 1 } = req.body as { productId: number; quantity?: number }
    const product = await Product.findByPk(productId)
    if (!product) {
      res.status(404).json({ error: 'Product not found' })
      return
    }
    if ((product.stock ?? 0) < quantity) {
      res.status(400).json({ error: 'Insufficient stock' })
      return
    }

    const cart = await getOrCreateCart(req.user!.id)
    const [item, created] = await CartItem.findOrCreate({
      where: { cartId: cart.id!, productId },
      defaults: { cartId: cart.id!, productId, quantity },
    })
    if (!created) {
      await item.update({ quantity: (item.quantity ?? 0) + quantity })
    }

    const full = await cartWithItems(cart.id!)
    res.json({ ...full.toJSON(), total: computeTotal(full) })
  } catch (err) {
    next(err)
  }
}

export async function updateItem(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { quantity } = req.body as { quantity: number }
    const cart = await getOrCreateCart(req.user!.id)
    const item = await CartItem.findOne({ where: { id: req.params.itemId, cartId: cart.id! } })
    if (!item) {
      res.status(404).json({ error: 'Item not found' })
      return
    }
    if (quantity <= 0) {
      await item.destroy()
    } else {
      await item.update({ quantity })
    }
    const full = await cartWithItems(cart.id!)
    res.json({ ...full.toJSON(), total: computeTotal(full) })
  } catch (err) {
    next(err)
  }
}

export async function removeItem(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const cart = await getOrCreateCart(req.user!.id)
    const deleted = await CartItem.destroy({ where: { id: req.params.itemId, cartId: cart.id! } })
    if (!deleted) {
      res.status(404).json({ error: 'Item not found' })
      return
    }
    const full = await cartWithItems(cart.id!)
    res.json({ ...full.toJSON(), total: computeTotal(full) })
  } catch (err) {
    next(err)
  }
}

export async function clearCart(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const cart = await getOrCreateCart(req.user!.id)
    await CartItem.destroy({ where: { cartId: cart.id! } })
    res.status(204).send()
  } catch (err) {
    next(err)
  }
}
