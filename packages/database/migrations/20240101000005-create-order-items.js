/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('order_items', {
      id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
      order_id: {
        type: Sequelize.INTEGER, allowNull: false,
        references: { model: 'orders', key: 'id' },
        onDelete: 'CASCADE',
      },
      product_id: {
        type: Sequelize.INTEGER, allowNull: false,
        references: { model: 'products', key: 'id' },
        onDelete: 'RESTRICT',
      },
      quantity: { type: Sequelize.INTEGER, allowNull: false, defaultValue: 1 },
      unit_price: { type: Sequelize.DECIMAL(10, 2), allowNull: false },
      created_at: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.literal('NOW()') },
      updated_at: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.literal('NOW()') },
    })
  },
  async down(queryInterface) {
    await queryInterface.dropTable('order_items')
  },
}
