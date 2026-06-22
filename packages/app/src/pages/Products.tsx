import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { productsApi, categoriesApi } from '@/services/api'
import ProductCard from '@/components/store/ProductCard'
import type { Product } from '@/types'

const MOCK_PRODUCTS: Product[] = [
  {
    id: 1, name: 'Air Void Low', slug: 'air-void-low', description: 'Clean silhouette, midnight colourway.',
    price: 899.90, stock: 5, images: ['/products/air-void-low.svg'], categoryId: 1,
    category: { id: 1, name: 'Sneakers', slug: 'sneakers', description: '' },
  },
  {
    id: 2, name: 'Drift Pro Mid', slug: 'drift-pro-mid', description: 'Street-ready mid-top.',
    price: 1149.90, stock: 3, images: ['/products/drift-pro-mid.svg'], categoryId: 1,
    category: { id: 1, name: 'Sneakers', slug: 'sneakers', description: '' },
  },
  {
    id: 3, name: 'Phantom Run', slug: 'phantom-run', description: 'Featherlight performance runner.',
    price: 749.90, stock: 0, images: ['/products/phantom-run.svg'], categoryId: 1,
    category: { id: 1, name: 'Sneakers', slug: 'sneakers', description: '' },
  },
  {
    id: 4, name: 'APEX OG High', slug: 'apex-og-high', description: 'The original silhouette. Elevated.',
    price: 1299.90, stock: 2, images: ['/products/apex-og-high.svg'], categoryId: 1,
    category: { id: 1, name: 'Sneakers', slug: 'sneakers', description: '' },
  },
  {
    id: 5, name: 'Noir Cargo Pant', slug: 'noir-cargo-pant', description: 'Technical utility trouser.',
    price: 549.90, stock: 8, images: ['/products/noir-cargo-pant.svg'], categoryId: 2,
    category: { id: 2, name: 'Apparel', slug: 'apparel', description: '' },
  },
  {
    id: 6, name: 'Void Oversized Tee', slug: 'void-oversized-tee', description: 'Heavyweight cotton drop-shoulder.',
    price: 299.90, stock: 15, images: ['/products/void-oversized-tee.svg'], categoryId: 2,
    category: { id: 2, name: 'Apparel', slug: 'apparel', description: '' },
  },
  {
    id: 7, name: 'Obsidian Hoodie', slug: 'obsidian-hoodie', description: 'Fleece-lined streetwear staple.',
    price: 649.90, stock: 4, images: ['/products/obsidian-hoodie.svg'], categoryId: 2,
    category: { id: 2, name: 'Apparel', slug: 'apparel', description: '' },
  },
  {
    id: 8, name: 'Shadow Coach Jacket', slug: 'shadow-coach-jacket', description: 'Packable nylon windbreaker.',
    price: 849.90, stock: 6, images: ['/products/shadow-coach-jacket.svg'], categoryId: 2,
    category: { id: 2, name: 'Apparel', slug: 'apparel', description: '' },
  },
  {
    id: 9, name: 'APEX × Studio Low', slug: 'apex-x-studio-low', description: 'Artist collab. Contrast panels.',
    price: 1499.90, stock: 1, images: ['/products/apex-x-studio-low.svg'], categoryId: 3,
    category: { id: 3, name: 'Collabs', slug: 'collabs', description: '' },
  },
  {
    id: 10, name: 'APEX × Raw Denim High', slug: 'apex-x-raw-denim-high', description: 'Selvedge denim boot collab.',
    price: 1899.90, stock: 1, images: ['/products/apex-x-raw-denim-high.svg'], categoryId: 3,
    category: { id: 3, name: 'Collabs', slug: 'collabs', description: '' },
  },
]

const CATEGORIES = ['All', 'Sneakers', 'Apparel', 'Collabs']

export default function Products() {
  const [activeCategory, setActiveCategory] = useState('All')

  const filtered = activeCategory === 'All'
    ? MOCK_PRODUCTS
    : MOCK_PRODUCTS.filter((p) => p.category?.name === activeCategory)

  return (
    <div className="min-h-screen pt-24 pb-20 px-4 md:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-10">
        <h1 className="text-primary text-4xl md:text-6xl font-medium tracking-tight mb-2">
          All Products
        </h1>
        <p className="text-gray-500 text-sm">{filtered.length} items</p>
      </div>

      {/* Category filter */}
      <div className="flex items-center gap-3 mb-10 overflow-x-auto pb-2">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-1.5 rounded-full text-xs uppercase tracking-widest whitespace-nowrap transition-colors ${
              activeCategory === cat
                ? 'bg-primary text-black'
                : 'border border-white/10 text-gray-400 hover:text-primary hover:border-primary'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filtered.map((product, i) => (
          <ProductCard key={product.id} product={product} index={i} />
        ))}
      </div>
    </div>
  )
}
