/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('orders', {
      id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
      user_id: {
        type: Sequelize.INTEGER, allowNull: false,
        references: { model: 'users', key: 'id' },
        onDelete: 'CASCADE',
      },
      status: {
        type: Sequelize.ENUM('pending', 'paid', 'shipped', 'delivered', 'cancelled'),
        defaultValue: 'pending', allowNull: false,
      },
      total: { type: Sequelize.DECIMAL(10, 2), allowNull: false },
      created_at: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.literal('NOW()') },
      updated_at: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.literal('NOW()') },
    })
  },
  async down(queryInterface) {
    await queryInterface.dropTable('orders')
    await queryInterface.sequelize.query('DROP TYPE IF EXISTS "enum_orders_status"')
  },
}
