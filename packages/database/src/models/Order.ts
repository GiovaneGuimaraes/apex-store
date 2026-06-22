import {
  DataTypes,
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
  Sequelize,
} from 'sequelize'

export type OrderStatus = 'pending' | 'paid' | 'shipped' | 'delivered' | 'cancelled'

export class Order extends Model<InferAttributes<Order>, InferCreationAttributes<Order>> {
  declare id: CreationOptional<number>
  declare userId: number
  declare status: CreationOptional<OrderStatus>
  declare total: number
  declare readonly createdAt: CreationOptional<Date>
  declare readonly updatedAt: CreationOptional<Date>
}

export function initOrder(sequelize: Sequelize): typeof Order {
  Order.init(
    {
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      userId: { type: DataTypes.INTEGER, allowNull: false, field: 'user_id' },
      status: {
        type: DataTypes.ENUM('pending', 'paid', 'shipped', 'delivered', 'cancelled'),
        defaultValue: 'pending',
        allowNull: false,
      },
      total: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
    },
    { sequelize, tableName: 'orders', underscored: true },
  )
  return Order
}
