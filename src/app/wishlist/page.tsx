'use client'

import { useWishlist } from '@/contexts/WishlistContext'
import { useCart } from '@/contexts/CartContext'
import Link from 'next/link'
import Image from 'next/image'

export default function WishlistPage() {
  const { wishlist, removeFromWishlist } = useWishlist()
  const { addToCart } = useCart()

  if (wishlist.items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <svg className="w-24 h-24 mx-auto text-gray-300 mb-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
            <h1 className="text-3xl font-serif text-gray-900 mb-4">Your wishlist is empty</h1>
            <p className="text-gray-600 mb-8">Save products you love for later by adding them to your wishlist.</p>
            <Link
              href="/products"
              className="inline-flex items-center px-8 py-3 bg-primary-600 text-white font-medium rounded-lg hover:bg-primary-700 transition-colors"
            >
              Browse Products
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-serif text-gray-900">My Wishlist ({wishlist.itemCount} items)</h1>
          <Link
            href="/products"
            className="text-primary-600 hover:text-primary-700 font-medium"
          >
            Continue Shopping →
          </Link>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {wishlist.items.map((item) => (
            <div key={item._id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden group">
              <div className="aspect-[4/5] bg-gray-100 relative overflow-hidden">
                <Image
                  src={item.image}
                  alt={item.name}
                  width={300}
                  height={375}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <button
                  onClick={() => removeFromWishlist(item._id)}
                  className="absolute top-4 right-4 w-10 h-10 bg-white/90 rounded-full flex items-center justify-center hover:bg-white transition-colors shadow-md"
                >
                  <svg className="w-5 h-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
              
              <div className="p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-2 line-clamp-2">{item.name}</h3>
                <p className="text-sm text-gray-600 mb-3">{item.fabric} • {item.color}</p>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xl font-bold text-primary-700">{item.price}</span>
                </div>
                
                <div className="space-y-2">
                  <Link
                    href={`/products/${item._id}`}
                    className="w-full bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors text-center block"
                  >
                    View Details
                  </Link>
                  <button
                    onClick={() => {
                      addToCart({
                        _id: item._id,
                        name: item.name,
                        price: item.price,
                        image: item.image,
                        fabric: item.fabric,
                        color: item.color
                      })
                      removeFromWishlist(item._id)
                    }}
                    className="w-full bg-primary-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-primary-700 transition-colors"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
