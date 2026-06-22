import {
  DataTypes,
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
  Sequelize,
} from 'sequelize'

export class User extends Model<InferAttributes<User>, InferCreationAttributes<User>> {
  declare id: CreationOptional<number>
  declare name: string
  declare email: string
  declare password_hash: string
  declare role: CreationOptional<'customer' | 'admin'>
  declare readonly createdAt: CreationOptional<Date>
  declare readonly updatedAt: CreationOptional<Date>
}

export function initUser(sequelize: Sequelize): typeof User {
  User.init(
    {
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      name: { type: DataTypes.STRING(100), allowNull: false },
      email: { type: DataTypes.STRING(255), allowNull: false, unique: true },
      password_hash: { type: DataTypes.STRING, allowNull: false },
      role: {
        type: DataTypes.ENUM('customer', 'admin'),
        defaultValue: 'customer',
        allowNull: false,
      },
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
    },
    { sequelize, tableName: 'users', underscored: true },
  )
  return User
}
