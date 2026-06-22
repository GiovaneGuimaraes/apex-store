import { motion } from 'framer-motion'
import { ShoppingBag } from 'lucide-react'
import { Link } from 'react-router-dom'
import type { Product } from '@/types'
import { useCartStore } from '@/store/cartStore'

interface Props {
  product: Product
  index?: number
}

export default function ProductCard({ product, index = 0 }: Props) {
  const addItem = useCartStore((s) => s.addItem)

  return (
    <motion.div
      className="group"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      <Link to={`/products/${product.slug}`} className="block">
        <div className="relative bg-[#101010] rounded-2xl overflow-hidden aspect-square mb-3">
          {product.images?.[0] ? (
            <img
              src={product.images[0]}
              alt={product.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-700">
              <ShoppingBag className="w-12 h-12" />
            </div>
          )}
          {product.stock === 0 && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
              <span className="text-primary text-xs uppercase tracking-widest">Sold out</span>
            </div>
          )}
        </div>
      </Link>

      <div className="flex items-start justify-between gap-2">
        <div>
          <Link to={`/products/${product.slug}`}>
            <h3 className="text-primary text-sm font-medium hover:text-primary/70 transition-colors">
              {product.name}
            </h3>
          </Link>
          <p className="text-gray-500 text-xs mt-0.5">{product.category?.name}</p>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <span className="text-primary text-sm font-medium">
            R$ {product.price.toFixed(2)}
          </span>
          <button
            onClick={() => addItem(product)}
            disabled={product.stock === 0}
            className="w-8 h-8 bg-primary rounded-full flex items-center justify-center hover:bg-primary/80 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <ShoppingBag className="w-3.5 h-3.5 text-black" />
          </button>
        </div>
      </div>
    </motion.div>
  )
}
