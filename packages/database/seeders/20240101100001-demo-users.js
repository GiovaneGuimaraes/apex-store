const bcrypt = require('bcryptjs')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    const hash = await bcrypt.hash('password123', 10)
    await queryInterface.bulkInsert('users', [
      { name: 'Admin APEX', email: 'admin@apexstore.com', password_hash: hash, role: 'admin', created_at: new Date(), updated_at: new Date() },
      { name: 'João Silva', email: 'joao@email.com', password_hash: hash, role: 'customer', created_at: new Date(), updated_at: new Date() },
      { name: 'Maria Souza', email: 'maria@email.com', password_hash: hash, role: 'customer', created_at: new Date(), updated_at: new Date() },
    ])
  },
  async down(queryInterface) {
    await queryInterface.bulkDelete('users', null, {})
  },
}
