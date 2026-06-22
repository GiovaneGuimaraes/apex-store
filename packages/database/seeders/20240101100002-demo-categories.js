/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert('categories', [
      { name: 'Sneakers', slug: 'sneakers', description: 'Premium footwear', created_at: new Date(), updated_at: new Date() },
      { name: 'Apparel', slug: 'apparel', description: 'Streetwear essentials', created_at: new Date(), updated_at: new Date() },
      { name: 'Collabs', slug: 'collabs', description: 'Limited edition collaborations', created_at: new Date(), updated_at: new Date() },
      { name: 'Accessories', slug: 'accessories', description: 'Caps, bags, socks', created_at: new Date(), updated_at: new Date() },
    ])
  },
  async down(queryInterface) {
    await queryInterface.bulkDelete('categories', null, {})
  },
}
