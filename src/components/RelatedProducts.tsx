'use client'

import { useState, useEffect } from 'react'
import { Product } from '@/types/product'
import Link from 'next/link'
import { useCart } from '@/contexts/CartContext'

function safePrice(price: string | number): number {
  if (typeof price === 'number') return price
  return parseFloat(String(price).replace(/[₹,]/g, '')) || 0
}

interface RelatedProductsProps {
  currentProductId: string
  fabric?: string
  tags?: string[]
}

export default function RelatedProducts({ currentProductId, fabric, tags }: RelatedProductsProps) {
  const { addToCart } = useCart()
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [addedId, setAddedId] = useState<string | null>(null)

  useEffect(() => {
    const fetchRelated = async () => {
      try {
        // Fetch products and filter client-side for related ones
        const res = await fetch('/api/supabase/products?limit=20')
        const data = await res.json()
        if (data.success && data.products) {
          const filtered = data.products
            .filter((p: Product) => p._id !== currentProductId)
            .filter((p: Product) => {
              // Match by fabric or tags
              const fabricMatch = fabric && p.fabric?.toLowerCase().includes(fabric.toLowerCase())
              const tagMatch = tags && tags.length > 0 && p.tags?.some(t => tags.includes(t))
              return fabricMatch || tagMatch
            })
            .slice(0, 4)

          // If not enough related products, fill with random ones
          if (filtered.length < 4) {
            const remaining = data.products
              .filter((p: Product) => p._id !== currentProductId && !filtered.find((f: Product) => f._id === p._id))
              .slice(0, 4 - filtered.length)
            filtered.push(...remaining)
          }

          setProducts(filtered)
        }
      } catch {
        setProducts([])
      } finally {
        setLoading(false)
      }
    }
    fetchRelated()
  }, [currentProductId, fabric, tags])

  const handleAddToCart = (product: Product) => {
    addToCart({
      _id: product._id!,
      name: product.name,
      price: product.price,
      image: product.images?.[0] || '/sample-images/ProductSample.jpeg',
      fabric: product.fabric,
      color: product.color,
    })
    setAddedId(product._id!)
    setTimeout(() => setAddedId(null), 1500)
  }

  if (loading) {
    return (
      <div className="mt-12 sm:mt-16">
        <h2 className="text-xl sm:text-2xl font-serif text-gray-900 mb-6">You May Also Like</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="bg-white rounded-lg shadow animate-pulse overflow-hidden">
              <div className="bg-gray-200 h-40 sm:h-52"></div>
              <div className="p-3 space-y-2">
                <div className="h-3 bg-gray-200 rounded w-3/4"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  if (products.length === 0) return null

  return (
    <div className="mt-12 sm:mt-16">
      <div className="flex items-center mb-6">
        <div className="h-px flex-1 bg-gray-200"></div>
        <h2 className="text-xl sm:text-2xl font-serif text-gray-900 px-4">You May Also Like</h2>
        <div className="h-px flex-1 bg-gray-200"></div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
        {products.map((product) => (
          <div key={product._id} className="group">
            <div className="relative bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden">
              <Link href={`/products/${product._id}`}>
                <div className="relative bg-gray-100 overflow-hidden" style={{ paddingBottom: '120%' }}>
                  <img
                    src={product.images?.[0] || '/sample-images/ProductSample.jpeg'}
                    alt={product.name}
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  {product.compare_at_price && safePrice(product.compare_at_price) > safePrice(product.price) && (
                    <span className="absolute top-2 left-2 bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded">
                      {Math.round(((safePrice(product.compare_at_price) - safePrice(product.price)) / safePrice(product.compare_at_price)) * 100)}% OFF
                    </span>
                  )}
                </div>
              </Link>
              <div className="p-2.5 sm:p-3">
                <Link href={`/products/${product._id}`}>
                  <h3 className="text-xs sm:text-sm font-medium text-gray-900 mb-1 line-clamp-2 hover:text-primary-700 transition-colors">
                    {product.name}
                  </h3>
                </Link>
                <div className="flex items-center flex-wrap gap-1 mb-2">
                  <p className="text-sm sm:text-base font-bold text-primary-700">₹{safePrice(product.price).toLocaleString()}</p>
                  {product.compare_at_price && safePrice(product.compare_at_price) > safePrice(product.price) && (
                    <p className="text-[10px] sm:text-xs text-gray-400 line-through">₹{safePrice(product.compare_at_price).toLocaleString()}</p>
                  )}
                </div>
                <button
                  onClick={() => handleAddToCart(product)}
                  className={`w-full py-1.5 rounded text-xs font-medium transition-colors ${
                    addedId === product._id
                      ? 'bg-green-600 text-white'
                      : 'bg-primary-600 text-white hover:bg-primary-700'
                  }`}
                >
                  {addedId === product._id ? '✓ Added' : 'Add to Cart'}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
