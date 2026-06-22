/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    const [categories] = await queryInterface.sequelize.query(
      `SELECT id, slug FROM categories`,
    )
    const catMap = Object.fromEntries(categories.map((c) => [c.slug, c.id]))

    await queryInterface.bulkInsert('products', [
      { name: 'Air Void Low', slug: 'air-void-low', description: 'Clean silhouette, midnight colourway. Suede upper, gum sole.', price: 899.90, stock: 5, images: '{}', category_id: catMap.sneakers, created_at: new Date(), updated_at: new Date() },
      { name: 'Drift Pro Mid', slug: 'drift-pro-mid', description: 'Street-ready mid-top with padded ankle collar.', price: 1149.90, stock: 3, images: '{}', category_id: catMap.sneakers, created_at: new Date(), updated_at: new Date() },
      { name: 'Phantom Run', slug: 'phantom-run', description: 'Featherlight performance runner. Mesh upper, reactive foam.', price: 749.90, stock: 0, images: '{}', category_id: catMap.sneakers, created_at: new Date(), updated_at: new Date() },
      { name: 'Apex OG High', slug: 'apex-og-high', description: 'The original silhouette that started it all.', price: 1299.90, stock: 2, images: '{}', category_id: catMap.sneakers, created_at: new Date(), updated_at: new Date() },
      { name: 'Noir Cargo Pant', slug: 'noir-cargo-pant', description: 'Technical utility trouser with bonded seams.', price: 549.90, stock: 8, images: '{}', category_id: catMap.apparel, created_at: new Date(), updated_at: new Date() },
      { name: 'Void Oversized Tee', slug: 'void-oversized-tee', description: 'Heavyweight 320gsm cotton drop-shoulder tee.', price: 299.90, stock: 15, images: '{}', category_id: catMap.apparel, created_at: new Date(), updated_at: new Date() },
      { name: 'Obsidian Hoodie', slug: 'obsidian-hoodie', description: 'Fleece-lined pull-over with kangaroo pocket.', price: 649.90, stock: 4, images: '{}', category_id: catMap.apparel, created_at: new Date(), updated_at: new Date() },
      { name: 'Shadow Coach Jacket', slug: 'shadow-coach-jacket', description: 'Nylon shell coach jacket. Water-resistant.', price: 799.90, stock: 6, images: '{}', category_id: catMap.apparel, created_at: new Date(), updated_at: new Date() },
      { name: 'APEX × Studio Collab Low', slug: 'apex-x-studio-low', description: 'Exclusive collaboration drop. Hand-numbered pairs.', price: 1799.90, stock: 1, images: '{}', category_id: catMap.collabs, created_at: new Date(), updated_at: new Date() },
      { name: 'APEX × Raw Denim High', slug: 'apex-x-raw-denim-high', description: 'Japanese selvedge denim upper on OG silhouette.', price: 2199.90, stock: 0, images: '{}', category_id: catMap.collabs, created_at: new Date(), updated_at: new Date() },
    ])
  },
  async down(queryInterface) {
    await queryInterface.bulkDelete('products', null, {})
  },
}
