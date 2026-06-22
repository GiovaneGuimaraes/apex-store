import {
  DataTypes,
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
  Sequelize,
} from 'sequelize'

export class Product extends Model<InferAttributes<Product>, InferCreationAttributes<Product>> {
  declare id: CreationOptional<number>
  declare name: string
  declare slug: string
  declare description: CreationOptional<string | null>
  declare price: number
  declare stock: CreationOptional<number>
  declare images: CreationOptional<string[]>
  declare categoryId: number
  declare readonly createdAt: CreationOptional<Date>
  declare readonly updatedAt: CreationOptional<Date>
}

export function initProduct(sequelize: Sequelize): typeof Product {
  Product.init(
    {
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      name: { type: DataTypes.STRING(150), allowNull: false },
      slug: { type: DataTypes.STRING(150), allowNull: false, unique: true },
      description: { type: DataTypes.TEXT },
      price: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
      stock: { type: DataTypes.INTEGER, defaultValue: 0, allowNull: false },
      images: { type: DataTypes.ARRAY(DataTypes.TEXT), defaultValue: [] },
      categoryId: { type: DataTypes.INTEGER, allowNull: false, field: 'category_id' },
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
    },
    { sequelize, tableName: 'products', underscored: true },
  )
  return Product
}
