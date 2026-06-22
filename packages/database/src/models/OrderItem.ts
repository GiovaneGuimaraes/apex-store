import {
  DataTypes,
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
  Sequelize,
} from 'sequelize'

export class OrderItem extends Model<InferAttributes<OrderItem>, InferCreationAttributes<OrderItem>> {
  declare id: CreationOptional<number>
  declare orderId: number
  declare productId: number
  declare quantity: CreationOptional<number>
  declare unit_price: number
  declare readonly createdAt: CreationOptional<Date>
  declare readonly updatedAt: CreationOptional<Date>
}

export function initOrderItem(sequelize: Sequelize): typeof OrderItem {
  OrderItem.init(
    {
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      orderId: { type: DataTypes.INTEGER, allowNull: false, field: 'order_id' },
      productId: { type: DataTypes.INTEGER, allowNull: false, field: 'product_id' },
      quantity: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 1 },
      unit_price: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
    },
    { sequelize, tableName: 'order_items', underscored: true },
  )
  return OrderItem
}
