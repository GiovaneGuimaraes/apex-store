/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('products', {
      id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
      name: { type: Sequelize.STRING(150), allowNull: false },
      slug: { type: Sequelize.STRING(150), allowNull: false, unique: true },
      description: { type: Sequelize.TEXT },
      price: { type: Sequelize.DECIMAL(10, 2), allowNull: false },
      stock: { type: Sequelize.INTEGER, defaultValue: 0, allowNull: false },
      images: { type: Sequelize.ARRAY(Sequelize.TEXT), defaultValue: [] },
      category_id: {
        type: Sequelize.INTEGER, allowNull: false,
        references: { model: 'categories', key: 'id' },
        onDelete: 'RESTRICT',
      },
      created_at: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.literal('NOW()') },
      updated_at: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.literal('NOW()') },
    })
  },
  async down(queryInterface) {
    await queryInterface.dropTable('products')
  },
}
