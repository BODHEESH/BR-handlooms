'use client'

import { useState, useEffect } from 'react'
import { Product } from '@/types/product'
import Link from 'next/link'
import ProductFilters from '@/components/ProductFilters'
import { useCart } from '@/contexts/CartContext'

function safePrice(price: string | number): number {
  if (typeof price === 'number') return price
  return parseFloat(String(price).replace(/[₹,]/g, '')) || 0
}

async function getWomenProducts(): Promise<Product[]> {
  try {
    const response = await fetch(`/api/supabase/products?category=womens-collection&limit=50`, {
      cache: 'no-store'
    })
    if (!response.ok) return []
    const data = await response.json()
    return data.success ? data.products : []
  } catch (error) {
    console.error('Error fetching women products:', error)
    return []
  }
}

function sortProducts(products: Product[], sortOption: string): Product[] {
  const sorted = [...products]
  switch (sortOption) {
    case 'price-low':
      return sorted.sort((a, b) => safePrice(a.price) - safePrice(b.price))
    case 'price-high':
      return sorted.sort((a, b) => safePrice(b.price) - safePrice(a.price))
    case 'name':
      return sorted.sort((a, b) => a.name.localeCompare(b.name))
    case 'stock':
      return sorted.sort((a, b) => {
        const aStock = Number(a.stock) || 0
        const bStock = Number(b.stock) || 0
        return bStock - aStock
      })
    default:
      return sorted
  }
}

function filterProducts(products: Product[], filters: {
  priceRange: string
  fabric: string
  stock: string
}): Product[] {
  return products.filter(product => {
    const price = safePrice(product.price)
    if (filters.priceRange !== 'all') {
      switch (filters.priceRange) {
        case '0-1000': if (price > 1000) return false; break
        case '1000-3000': if (price < 1000 || price > 3000) return false; break
        case '3000-6000': if (price < 3000 || price > 6000) return false; break
        case '6000+': if (price < 6000) return false; break
      }
    }
    if (filters.fabric !== 'all') {
      if (!product.fabric?.toLowerCase().includes(filters.fabric.toLowerCase())) return false
    }
    if (filters.stock !== 'all') {
      const stockNum = Number(product.stock) || 0
      if (filters.stock === 'in-stock' && stockNum <= 0) return false
      if (filters.stock === 'limited' && (stockNum <= 0 || stockNum > 5)) return false
    }
    return true
  })
}

export default function WomenCollectionPage() {
  const { addToCart } = useCart()
  const [products, setProducts] = useState<Product[]>([])
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [addedId, setAddedId] = useState<string | null>(null)

  useEffect(() => {
    const init = async () => {
      setLoading(true)
      const data = await getWomenProducts()
      setProducts(data)
      setFilteredProducts(data)
      setLoading(false)
    }
    init()
  }, [])

  const handleSortChange = (sortOption: string) => {
    setFilteredProducts(sortProducts(filteredProducts, sortOption))
  }

  const handleFilterChange = (filters: { priceRange: string; fabric: string; stock: string }) => {
    setFilteredProducts(filterProducts(products, filters))
  }

  const handleAddToCart = (product: Product) => {
    addToCart({
      _id: product._id!,
      name: product.name,
      price: product.price,
      image: product.images?.[0] || '/sample-images/ProductSample.jpeg',
      fabric: product.fabric,
      color: product.color
    })
    setAddedId(product._id!)
    setTimeout(() => setAddedId(null), 1500)
  }

  return (
    <div className="bg-gradient-to-b from-white to-amber-50 min-h-screen">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary-700 to-primary-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
          <div className="text-center">
            <div className="flex items-center justify-center mb-3">
              <div className="h-px w-10 sm:w-16 bg-white/50"></div>
              <span className="mx-3 sm:mx-4 text-white text-xl sm:text-2xl">✦</span>
              <div className="h-px w-10 sm:w-16 bg-white/50"></div>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-white mb-3">
              Women&apos;s Collection
            </h1>
            <p className="mt-2 max-w-2xl mx-auto text-sm sm:text-lg text-green-50">
              Discover our exquisite range of traditional and contemporary handloom sarees, 
              each piece crafted with love and heritage.
            </p>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <ProductFilters onSortChange={handleSortChange} onFilterChange={handleFilterChange} />
      </div>

      {/* Products Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        {loading ? (
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="bg-white rounded-lg shadow animate-pulse overflow-hidden">
                <div className="bg-gray-200 h-48 sm:h-64"></div>
                <div className="p-3 sm:p-4 space-y-3">
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-5 bg-gray-200 rounded w-1/2"></div>
                  <div className="h-8 bg-gray-200 rounded"></div>
                </div>
              </div>
            ))}
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🧵</div>
            <h3 className="text-xl sm:text-2xl font-serif text-gray-900 mb-2">No products found</h3>
            <p className="text-gray-600 text-sm sm:text-base">Try adjusting your filters or check back soon for new arrivals.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
            {filteredProducts.map((product: Product) => (
              <div key={product._id} className="group">
                <div className="relative bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden">
                  {/* Product Image */}
                  <Link href={`/products/${product._id}`}>
                    <div className="relative bg-gray-100 overflow-hidden" style={{ paddingBottom: '120%' }}>
                      <img
                        src={product.images?.[0] || '/sample-images/ProductSample.jpeg'}
                        alt={product.name}
                        className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  </Link>

                  {/* Product Info */}
                  <div className="p-3 sm:p-4">
                    <Link href={`/products/${product._id}`}>
                      <h3 className="text-sm sm:text-base font-medium text-gray-900 mb-1 line-clamp-2 hover:text-primary-700 transition-colors">
                        {product.name}
                      </h3>
                    </Link>
                    <p className="text-xs text-gray-500 mb-2 line-clamp-1">{product.fabric} • {product.color}</p>
                    <div className="flex items-center justify-between mb-3">
                      <p className="text-lg sm:text-xl font-bold text-primary-700">₹{safePrice(product.price).toLocaleString()}</p>
                      <span className={`text-xs px-2 py-0.5 rounded-full ${Number(product.stock) > 0 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                        {Number(product.stock) > 0 ? 'In Stock' : 'Out of Stock'}
                      </span>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleAddToCart(product)}
                        className={`flex-1 py-2 px-3 rounded-md text-xs sm:text-sm font-medium transition-colors text-center ${
                          addedId === product._id
                            ? 'bg-green-600 text-white'
                            : 'bg-primary-600 text-white hover:bg-primary-700'
                        }`}
                      >
                        {addedId === product._id ? '✓ Added' : '🛒 Add to Cart'}
                      </button>
                      <a
                        href={`https://wa.me/917907730095?text=Hi, I'm interested in ${product.name} (₹${safePrice(product.price).toLocaleString()})`}
                        className="bg-green-600 text-white px-3 py-2 rounded-md text-xs sm:text-sm font-medium hover:bg-green-700 transition-colors inline-flex items-center"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        📱
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
