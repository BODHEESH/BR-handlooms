'use client'

import { useState } from 'react'
import { useWishlist } from '@/contexts/WishlistContext'
import Link from 'next/link'

export default function WishlistIcon() {
  const { wishlist } = useWishlist()
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="relative">
      {/* Wishlist Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 text-gray-600 hover:text-primary-700 transition-colors"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
        {wishlist.itemCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
            {wishlist.itemCount}
          </span>
        )}
      </button>

      {/* Wishlist Dropdown */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-xl border border-gray-200 z-50">
          <div className="p-4 border-b border-gray-200">
            <h3 className="font-semibold text-gray-900">Wishlist ({wishlist.itemCount} items)</h3>
          </div>
          
          {wishlist.items.length === 0 ? (
            <div className="p-8 text-center text-gray-500">
              <svg className="w-12 h-12 mx-auto mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
              <p>Your wishlist is empty</p>
            </div>
          ) : (
            <>
              <div className="max-h-96 overflow-y-auto">
                {wishlist.items.map((item) => (
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
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="p-4 border-t border-gray-200">
                <Link
                  href="/wishlist"
                  className="block w-full bg-primary-600 text-white px-4 py-2 rounded-lg text-center text-sm font-medium hover:bg-primary-700 transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  View Wishlist
                </Link>
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
