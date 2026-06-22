import {
  DataTypes,
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
  Sequelize,
} from 'sequelize'

export class CartItem extends Model<InferAttributes<CartItem>, InferCreationAttributes<CartItem>> {
  declare id: CreationOptional<number>
  declare cartId: number
  declare productId: number
  declare quantity: CreationOptional<number>
  declare readonly createdAt: CreationOptional<Date>
  declare readonly updatedAt: CreationOptional<Date>
}

export function initCartItem(sequelize: Sequelize): typeof CartItem {
  CartItem.init(
    {
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      cartId: { type: DataTypes.INTEGER, allowNull: false, field: 'cart_id' },
      productId: { type: DataTypes.INTEGER, allowNull: false, field: 'product_id' },
      quantity: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 1 },
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
    },
    { sequelize, tableName: 'cart_items', underscored: true },
  )
  return CartItem
}
