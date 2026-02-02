'use client'

import { useState } from 'react'
import { useCart } from '@/contexts/CartContext'
import Link from 'next/link'

export default function CartIcon() {
  const { cart } = useCart()
  const [isOpen, setIsOpen] = useState(false)

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

      {/* Cart Dropdown */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-xl border border-gray-200 z-50">
          <div className="p-4 border-b border-gray-200">
            <h3 className="font-semibold text-gray-900">Shopping Cart ({cart.itemCount} items)</h3>
          </div>
          
          {cart.items.length === 0 ? (
            <div className="p-8 text-center text-gray-500">
              <svg className="w-12 h-12 mx-auto mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              <p>Your cart is empty</p>
            </div>
          ) : (
            <>
              <div className="max-h-96 overflow-y-auto">
                {cart.items.map((item) => (
                  <div key={item._id} className="p-4 border-b border-gray-100 hover:bg-gray-50">
                    <div className="flex items-center space-x-4">
                      <img 
                        src={item.image} 
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900 text-sm line-clamp-1">{item.name}</h4>
                        <p className="text-xs text-gray-600">{item.fabric} • {item.color}</p>
                        <div className="flex items-center justify-between mt-1">
                          <span className="font-semibold text-primary-700">{item.price}</span>
                          <span className="text-sm text-gray-600">Qty: {item.quantity}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="p-4 border-t border-gray-200">
                <div className="flex justify-between items-center mb-3">
                  <span className="font-semibold text-gray-900">Total:</span>
                  <span className="text-xl font-bold text-primary-700">₹{cart.total.toLocaleString()}</span>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <Link
                    href="/cart"
                    className="bg-primary-600 text-white px-4 py-2 rounded-lg text-center text-sm font-medium hover:bg-primary-700 transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    View Cart
                  </Link>
                  <button
                    className="bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-green-700 transition-colors"
                    onClick={() => {
                      window.open(`https://wa.me/917907730095?text=Hi, I'd like to place an order for ${cart.itemCount} items with a total of ₹${cart.total.toLocaleString()}`, '_blank')
                      setIsOpen(false)
                    }}
                  >
                    Checkout
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      )}
      
      {/* Backdrop to close dropdown */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  )
}
