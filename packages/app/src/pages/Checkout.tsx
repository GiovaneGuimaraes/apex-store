import { ArrowRight } from 'lucide-react'
import { useCartStore } from '@/store/cartStore'
import { Link } from 'react-router-dom'

export default function Checkout() {
  const { items, total, clearCart } = useCartStore()

  if (items.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-6">
        <p className="text-gray-500">Nothing in your cart.</p>
        <Link to="/products" className="text-primary underline underline-offset-2 text-sm">
          Back to store
        </Link>
      </div>
    )
  }

  return (
    <div className="min-h-screen pt-24 pb-20 px-4 md:px-8 max-w-4xl mx-auto">
      <h1 className="text-primary text-3xl md:text-5xl font-medium mb-10">Checkout</h1>

      <div className="grid md:grid-cols-2 gap-10">
        {/* Order summary */}
        <div className="space-y-4">
          <h2 className="text-primary text-sm uppercase tracking-widest mb-4">Order Summary</h2>
          {items.map((item) => (
            <div key={item.id} className="flex items-center justify-between py-3 border-b border-white/5">
              <div>
                <p className="text-primary text-sm">{item.product.name}</p>
                <p className="text-gray-500 text-xs">Qty: {item.quantity}</p>
              </div>
              <p className="text-primary text-sm">
                R$ {(item.product.price * item.quantity).toFixed(2)}
              </p>
            </div>
          ))}
          <div className="flex items-center justify-between pt-2">
            <span className="text-gray-400">Total</span>
            <span className="text-primary font-medium text-lg">R$ {total().toFixed(2)}</span>
          </div>
        </div>

        {/* Contact form */}
        <form
          className="space-y-4"
          onSubmit={(e) => {
            e.preventDefault()
            clearCart()
            alert('Order placed! (mock)')
          }}
        >
          <h2 className="text-primary text-sm uppercase tracking-widest mb-4">Contact</h2>
          {['Full name', 'Email', 'Address', 'City', 'Postal code'].map((label) => (
            <div key={label}>
              <label className="text-gray-400 text-xs block mb-1">{label}</label>
              <input
                required
                className="w-full bg-[#101010] border border-white/5 rounded-xl px-4 py-2.5 text-primary text-sm focus:outline-none focus:border-primary/40 transition-colors"
              />
            </div>
          ))}
          <button
            type="submit"
            className="group flex items-center justify-between w-full bg-primary rounded-full px-5 py-2.5 mt-4 hover:bg-primary/90 transition-colors"
          >
            <span className="text-black font-medium text-sm">Place order</span>
            <span className="bg-black rounded-full w-8 h-8 flex items-center justify-center group-hover:scale-110 transition-transform">
              <ArrowRight className="w-3.5 h-3.5 text-primary" />
            </span>
          </button>
        </form>
      </div>
    </div>
  )
}
