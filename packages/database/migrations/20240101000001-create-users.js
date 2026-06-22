/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('users', {
      id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
      name: { type: Sequelize.STRING(100), allowNull: false },
      email: { type: Sequelize.STRING(255), allowNull: false, unique: true },
      password_hash: { type: Sequelize.STRING, allowNull: false },
      role: { type: Sequelize.ENUM('customer', 'admin'), defaultValue: 'customer', allowNull: false },
      created_at: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.literal('NOW()') },
      updated_at: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.literal('NOW()') },
    })
  },
  async down(queryInterface) {
    await queryInterface.dropTable('users')
    await queryInterface.sequelize.query('DROP TYPE IF EXISTS "enum_users_role"')
  },
}
