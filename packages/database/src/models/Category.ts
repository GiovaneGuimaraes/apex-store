import {
  DataTypes,
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
  Sequelize,
} from 'sequelize'

export class Category extends Model<InferAttributes<Category>, InferCreationAttributes<Category>> {
  declare id: CreationOptional<number>
  declare name: string
  declare slug: string
  declare description: CreationOptional<string | null>
  declare readonly createdAt: CreationOptional<Date>
  declare readonly updatedAt: CreationOptional<Date>
}

export function initCategory(sequelize: Sequelize): typeof Category {
  Category.init(
    {
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      name: { type: DataTypes.STRING(80), allowNull: false },
      slug: { type: DataTypes.STRING(80), allowNull: false, unique: true },
      description: { type: DataTypes.TEXT },
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
    },
    { sequelize, tableName: 'categories', underscored: true },
  )
  return Category
}
