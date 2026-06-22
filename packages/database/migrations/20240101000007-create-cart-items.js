/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('cart_items', {
      id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
      cart_id: {
        type: Sequelize.INTEGER, allowNull: false,
        references: { model: 'carts', key: 'id' },
        onDelete: 'CASCADE',
      },
      product_id: {
        type: Sequelize.INTEGER, allowNull: false,
        references: { model: 'products', key: 'id' },
        onDelete: 'CASCADE',
      },
      quantity: { type: Sequelize.INTEGER, allowNull: false, defaultValue: 1 },
      created_at: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.literal('NOW()') },
      updated_at: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.literal('NOW()') },
    })
  },
  async down(queryInterface) {
    await queryInterface.dropTable('cart_items')
  },
}
