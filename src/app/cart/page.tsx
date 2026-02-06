'use client'

import { useCart } from '@/contexts/CartContext'
import Link from 'next/link'

function safeParsePrice(price: string | number): number {
  if (typeof price === 'number') return price
  return parseFloat(String(price).replace(/[₹,]/g, '')) || 0
}

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, clearCart } = useCart()

  if (cart.items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <div className="text-center">
            <svg className="w-16 h-16 sm:w-24 sm:h-24 mx-auto text-gray-300 mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            <h1 className="text-2xl sm:text-3xl font-serif text-gray-900 mb-3">Your cart is empty</h1>
            <p className="text-gray-600 mb-6 text-sm sm:text-base">Looks like you haven&apos;t added any products yet.</p>
            <Link
              href="/products"
              className="inline-flex items-center px-6 py-3 bg-primary-600 text-white font-medium rounded-lg hover:bg-primary-700 transition-colors text-sm sm:text-base"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <h1 className="text-2xl sm:text-3xl font-serif text-gray-900 mb-6">Shopping Cart ({cart.itemCount} items)</h1>
        
        <div className="lg:grid lg:grid-cols-12 lg:gap-x-8">
          {/* Cart Items */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <ul className="divide-y divide-gray-200">
                {cart.items.map((item) => (
                  <li key={item._id} className="p-4 sm:p-6">
                    <div className="flex space-x-3 sm:space-x-4">
                      <div className="flex-shrink-0">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-20 h-20 sm:w-28 sm:h-28 object-cover rounded-lg"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-start">
                          <div className="min-w-0 pr-2">
                            <h3 className="text-sm sm:text-lg font-medium text-gray-900 line-clamp-2">{item.name}</h3>
                            <p className="text-xs sm:text-sm text-gray-500 mt-0.5">{item.fabric} • {item.color}</p>
                            <p className="text-base sm:text-lg font-semibold text-primary-700 mt-1">₹{safeParsePrice(item.price).toLocaleString()}</p>
                          </div>
                          <button
                            onClick={() => removeFromCart(item._id)}
                            className="text-gray-400 hover:text-red-500 transition-colors flex-shrink-0 p-1"
                          >
                            <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          </button>
                        </div>
                        
                        <div className="flex flex-wrap items-center gap-2 sm:gap-4 mt-3">
                          <div className="flex items-center space-x-2">
                            <button
                              onClick={() => updateQuantity(item._id, item.quantity - 1)}
                              className="w-7 h-7 sm:w-8 sm:h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors text-sm"
                            >
                              -
                            </button>
                            <span className="w-8 text-center text-sm sm:text-base">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item._id, item.quantity + 1)}
                              className="w-7 h-7 sm:w-8 sm:h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors text-sm"
                            >
                              +
                            </button>
                          </div>
                          <span className="text-xs sm:text-sm text-gray-600">
                            = ₹{(safeParsePrice(item.price) * item.quantity).toLocaleString()}
                          </span>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
              
              <div className="p-4 sm:p-6 border-t border-gray-200">
                <button
                  onClick={clearCart}
                  className="text-sm text-gray-600 hover:text-red-600 transition-colors"
                >
                  Clear Cart
                </button>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-5 mt-6 lg:mt-0">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6 lg:sticky lg:top-8">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Order Summary</h2>
              
              <div className="space-y-3">
                <div className="flex justify-between text-sm sm:text-base">
                  <span className="text-gray-600">Subtotal ({cart.itemCount} items)</span>
                  <span className="font-medium">₹{cart.total.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm sm:text-base">
                  <span className="text-gray-600">Shipping</span>
                  <span className="font-medium text-green-600">Free</span>
                </div>
                <div className="border-t border-gray-200 pt-3">
                  <div className="flex justify-between">
                    <span className="text-base sm:text-lg font-semibold text-gray-900">Total</span>
                    <span className="text-base sm:text-lg font-bold text-primary-700">₹{cart.total.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              <div className="mt-6 space-y-3">
                <Link
                  href="/checkout"
                  className="w-full bg-primary-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-primary-700 transition-colors text-center block text-sm sm:text-base"
                >
                  Proceed to Checkout
                </Link>
                <Link
                  href="/products"
                  className="w-full bg-white border border-gray-300 text-gray-700 px-6 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors text-center block text-sm sm:text-base"
                >
                  Continue Shopping
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
