import {
  DataTypes,
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
  Sequelize,
} from 'sequelize'

export class Review extends Model<InferAttributes<Review>, InferCreationAttributes<Review>> {
  declare id: CreationOptional<number>
  declare userId: number
  declare productId: number
  declare rating: number
  declare comment: CreationOptional<string | null>
  declare readonly createdAt: CreationOptional<Date>
  declare readonly updatedAt: CreationOptional<Date>
}

export function initReview(sequelize: Sequelize): typeof Review {
  Review.init(
    {
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      userId: { type: DataTypes.INTEGER, allowNull: false, field: 'user_id' },
      productId: { type: DataTypes.INTEGER, allowNull: false, field: 'product_id' },
      rating: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: { min: 1, max: 5 },
      },
      comment: { type: DataTypes.TEXT },
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
    },
    { sequelize, tableName: 'reviews', underscored: true },
  )
  return Review
}
