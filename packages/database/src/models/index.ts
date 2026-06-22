import { Sequelize } from 'sequelize'
import * as dotenv from 'dotenv'
import config from '../config/database'
import { User, initUser } from './User'
import { Category, initCategory } from './Category'
import { Product, initProduct } from './Product'
import { Order, initOrder } from './Order'
import { OrderItem, initOrderItem } from './OrderItem'
import { Cart, initCart } from './Cart'
import { CartItem, initCartItem } from './CartItem'
import { Review, initReview } from './Review'

dotenv.config()

const env = process.env.NODE_ENV ?? 'development'
const dbConfig = config[env]!

let sequelize: Sequelize

if (dbConfig.use_env_variable) {
  const connStr = process.env[dbConfig.use_env_variable]
  if (!connStr) throw new Error(`Env var ${dbConfig.use_env_variable} is not set`)
  sequelize = new Sequelize(connStr, dbConfig)
} else {
  sequelize = new Sequelize(
    dbConfig.database ?? '',
    dbConfig.username ?? '',
    dbConfig.password ?? '',
    dbConfig,
  )
}

// Init all models
initUser(sequelize)
initCategory(sequelize)
initProduct(sequelize)
initOrder(sequelize)
initOrderItem(sequelize)
initCart(sequelize)
initCartItem(sequelize)
initReview(sequelize)

// Associations
Category.hasMany(Product, { foreignKey: 'categoryId', as: 'products' })
Product.belongsTo(Category, { foreignKey: 'categoryId', as: 'category' })

User.hasMany(Order, { foreignKey: 'userId', as: 'orders' })
Order.belongsTo(User, { foreignKey: 'userId', as: 'user' })

Order.hasMany(OrderItem, { foreignKey: 'orderId', as: 'items' })
OrderItem.belongsTo(Order, { foreignKey: 'orderId', as: 'order' })
Product.hasMany(OrderItem, { foreignKey: 'productId' })
OrderItem.belongsTo(Product, { foreignKey: 'productId', as: 'product' })

User.hasOne(Cart, { foreignKey: 'userId', as: 'cart' })
Cart.belongsTo(User, { foreignKey: 'userId', as: 'user' })
Cart.hasMany(CartItem, { foreignKey: 'cartId', as: 'items' })
CartItem.belongsTo(Cart, { foreignKey: 'cartId', as: 'cart' })
Product.hasMany(CartItem, { foreignKey: 'productId' })
CartItem.belongsTo(Product, { foreignKey: 'productId', as: 'product' })

User.hasMany(Review, { foreignKey: 'userId', as: 'reviews' })
Product.hasMany(Review, { foreignKey: 'productId', as: 'reviews' })
Review.belongsTo(User, { foreignKey: 'userId', as: 'user' })
Review.belongsTo(Product, { foreignKey: 'productId', as: 'product' })

export {
  sequelize,
  Sequelize,
  User,
  Category,
  Product,
  Order,
  OrderItem,
  Cart,
  CartItem,
  Review,
}
