import { ShoppingBag, Search } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useCartStore } from '@/store/cartStore'

export default function Navbar() {
  const { openCart, count } = useCartStore()
  const itemCount = count()

  return (
    <header className="fixed top-0 left-0 right-0 z-30 flex items-center justify-between px-6 py-4 bg-black/80 backdrop-blur-md border-b border-white/5">
      <Link to="/" className="text-primary font-bold tracking-widest text-lg">
        APEX
      </Link>

      <nav className="hidden md:flex items-center gap-8">
        {['Sneakers', 'Apparel', 'Collabs', 'New Drops'].map((item) => (
          <Link
            key={item}
            to="/products"
            className="text-xs text-gray-400 hover:text-primary transition-colors uppercase tracking-widest"
          >
            {item}
          </Link>
        ))}
      </nav>

      <div className="flex items-center gap-4">
        <button className="text-gray-400 hover:text-primary transition-colors">
          <Search className="w-4 h-4" />
        </button>
        <button
          onClick={openCart}
          className="relative text-gray-400 hover:text-primary transition-colors"
        >
          <ShoppingBag className="w-4 h-4" />
          {itemCount > 0 && (
            <span className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-primary rounded-full flex items-center justify-center text-black text-[9px] font-bold">
              {itemCount > 9 ? '9+' : itemCount}
            </span>
          )}
        </button>
      </div>
    </header>
  )
}
