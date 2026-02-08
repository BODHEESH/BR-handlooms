'use client'

import { useState, useEffect } from 'react'
import { useCart } from '@/contexts/CartContext'
import Link from 'next/link'

export default function CartIcon() {
  const { cart } = useCart()
  const [isOpen, setIsOpen] = useState(false)

  // Prevent body scroll when mobile panel is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  const cartContent = (
    <>
      {cart.items.length === 0 ? (
        <div className="p-8 text-center text-gray-500 flex-1 flex flex-col items-center justify-center">
          <svg className="w-16 h-16 mb-4 text-gray-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          <p className="text-base font-medium text-gray-700 mb-1">Your cart is empty</p>
          <p className="text-sm text-gray-400">Add some products to get started</p>
          <Link
            href="/products"
            className="mt-4 px-6 py-2 bg-primary-600 text-white rounded-lg text-sm font-medium hover:bg-primary-700 transition-colors"
            onClick={() => setIsOpen(false)}
          >
            Browse Products
          </Link>
        </div>
      ) : (
        <>
          <div className="flex-1 overflow-y-auto">
            {cart.items.map((item) => (
              <div key={item._id} className="p-3 sm:p-4 border-b border-gray-100 hover:bg-gray-50">
                <div className="flex items-center space-x-3">
                  <img 
                    src={item.image} 
                    alt={item.name}
                    className="w-16 h-20 sm:w-16 sm:h-16 object-cover rounded-lg flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-gray-900 text-sm line-clamp-2">{item.name}</h4>
                    <p className="text-xs text-gray-500 mt-0.5">{item.fabric} • {item.color}</p>
                    <div className="flex items-center justify-between mt-1.5">
                      <span className="font-bold text-primary-700">₹{Number(String(item.price).replace(/[₹,]/g, '')).toLocaleString()}</span>
                      <span className="text-sm text-gray-500 bg-gray-100 px-2 py-0.5 rounded">x{item.quantity}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="p-4 border-t border-gray-200 bg-white">
            <div className="flex justify-between items-center mb-3">
              <span className="font-semibold text-gray-900">Subtotal:</span>
              <span className="text-xl font-bold text-primary-700">₹{cart.total.toLocaleString()}</span>
            </div>
            <p className="text-xs text-gray-400 mb-3">Shipping calculated at checkout</p>
            <div className="grid grid-cols-2 gap-2">
              <Link
                href="/cart"
                className="bg-primary-600 text-white px-4 py-2.5 rounded-lg text-center text-sm font-medium hover:bg-primary-700 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                View Cart
              </Link>
              <Link
                href="/checkout"
                className="bg-green-600 text-white px-4 py-2.5 rounded-lg text-center text-sm font-medium hover:bg-green-700 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Checkout
              </Link>
            </div>
          </div>
        </>
      )}
    </>
  )

  return (
    <div className="relative">
      {/* Cart Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 text-gray-600 hover:text-primary-700 transition-colors"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
        {cart.itemCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-primary-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
            {cart.itemCount}
          </span>
        )}
      </button>

      {/* Mobile: Full-screen slide-up panel */}
      {isOpen && (
        <div className="sm:hidden fixed inset-0 z-50">
          <div className="absolute inset-0 bg-black/40" onClick={() => setIsOpen(false)} />
          <div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-2xl max-h-[85vh] flex flex-col animate-slide-up">
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <h3 className="font-semibold text-gray-900 text-lg">Cart ({cart.itemCount})</h3>
              <button onClick={() => setIsOpen(false)} className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 text-gray-600">
                ✕
              </button>
            </div>
            {cartContent}
          </div>
        </div>
      )}

      {/* Desktop: Dropdown */}
      {isOpen && (
        <div className="hidden sm:block absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-xl border border-gray-200 z-50 max-h-[70vh] flex flex-col">
          <div className="p-4 border-b border-gray-200">
            <h3 className="font-semibold text-gray-900">Shopping Cart ({cart.itemCount} items)</h3>
          </div>
          {cartContent}
        </div>
      )}
      
      {/* Desktop backdrop */}
      {isOpen && (
        <div 
          className="hidden sm:block fixed inset-0 z-40" 
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  )
}
