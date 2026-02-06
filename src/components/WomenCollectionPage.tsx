'use client'

import { useState, useEffect } from 'react'
import { Product } from '@/types/product'
import Link from 'next/link'
import ProductFilters from '@/components/ProductFilters'
import { useCart } from '@/contexts/CartContext'

async function getWomenProducts(): Promise<Product[]> {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
    console.log('getWomenProducts - Fetching from:', `${baseUrl}/api/supabase/products?category=womens-collection&limit=12`)
    
    const response = await fetch(`${baseUrl}/api/supabase/products?category=womens-collection&limit=12`, {
      cache: 'no-store'
    })
    
    console.log('getWomenProducts - Response status:', response.status)
    
    if (!response.ok) {
      console.error('Failed to fetch women products:', response.statusText)
      return []
    }
    
    const data = await response.json()
    console.log('getWomenProducts - Raw data:', data)
    console.log('getWomenProducts - Success:', data.success)
    console.log('getWomenProducts - Products array:', data.products)
    
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
      return sorted.sort((a, b) => parseInt(a.price.replace(/[₹,]/g, '')) - parseInt(b.price.replace(/[₹,]/g, '')))
    case 'price-high':
      return sorted.sort((a, b) => parseInt(b.price.replace(/[₹,]/g, '')) - parseInt(a.price.replace(/[₹,]/g, '')))
    case 'name':
      return sorted.sort((a, b) => a.name.localeCompare(b.name))
    case 'stock':
      return sorted.sort((a, b) => {
        if (a.stock === 'In Stock' && b.stock !== 'In Stock') return -1
        if (a.stock !== 'In Stock' && b.stock === 'In Stock') return 1
        return 0
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
    // Price filter
    const price = parseInt(product.price.replace(/[₹,]/g, ''))
    if (filters.priceRange !== 'all') {
      switch (filters.priceRange) {
        case '0-1000':
          if (price > 1000) return false
          break
        case '1000-3000':
          if (price < 1000 || price > 3000) return false
          break
        case '3000-6000':
          if (price < 3000 || price > 6000) return false
          break
        case '6000+':
          if (price < 6000) return false
          break
      }
    }

    // Fabric filter
    if (filters.fabric !== 'all') {
      const fabricMatch = product.fabric.toLowerCase().includes(filters.fabric.toLowerCase())
      if (!fabricMatch) return false
    }

    // Stock filter
    if (filters.stock !== 'all') {
      if (filters.stock === 'in-stock' && product.stock !== 'In Stock') return false
      if (filters.stock === 'limited' && product.stock !== 'Limited Stock') return false
    }

    return true
  })
}

export default function WomenCollectionPage() {
  const { addToCart } = useCart()
  const [products, setProducts] = useState<Product[]>([])
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([])

  useEffect(() => {
    const initializeProducts = async () => {
      console.log('WomenCollectionPage - Starting fetch...')
      const initialProducts = await getWomenProducts()
      console.log('WomenCollectionPage - Products fetched:', initialProducts)
      console.log('WomenCollectionPage - Products length:', initialProducts?.length)
      console.log('WomenCollectionPage - First product:', initialProducts?.[0])
      setProducts(initialProducts)
      setFilteredProducts(initialProducts) // Don't apply filters initially
      console.log('WomenCollectionPage - State updated')
    }
    initializeProducts()
  }, [])

  // Handle sort and filter changes
  const handleSortChange = (sortOption: string) => {
    const sorted = sortProducts(filteredProducts, sortOption)
    setFilteredProducts(sorted)
  }

  const handleFilterChange = (filters: {
    priceRange: string
    fabric: string
    stock: string
  }) => {
    const filtered = filterProducts(products, filters)
    setFilteredProducts(filtered)
  }

  return (
    <div className="bg-gradient-to-b from-white to-amber-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary-700 to-primary-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <div className="flex items-center justify-center mb-4">
              <div className="h-px w-16 bg-white/50"></div>
              <span className="mx-4 text-white text-2xl">✦</span>
              <div className="h-px w-16 bg-white/50"></div>
            </div>
            <h1 className="text-4xl font-serif text-white sm:text-5xl mb-4">
              Women's Collection
            </h1>
            <p className="mt-3 max-w-2xl mx-auto text-lg text-green-50">
              Discover our exquisite range of traditional and contemporary handloom sarees, 
              each piece crafted with love and heritage.
            </p>
          </div>
        </div>
      </div>

      {/* Filters - Temporarily disabled for debugging */}
      {/* <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <ProductFilters onSortChange={handleSortChange} onFilterChange={handleFilterChange} />
      </div> */}

      {/* Products Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {filteredProducts.map((product: Product) => (
            <div key={product._id} className="group">
              <div className="relative bg-white rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden">
                {/* Product Image */}
                <div className="aspect-w-4 aspect-h-5 bg-gray-100 relative overflow-hidden">
                  <img
                    src={product.images?.[0] || '/sample-images/ProductSample.jpeg'}
                    alt={product.name}
                    className="w-full h-full object-center object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                </div>

                {/* Product Info */}
                <div className="p-6">
                  <h3 className="text-xl font-serif text-gray-900 mb-2 line-clamp-2">
                    {product.name}
                  </h3>
                  <div className="flex items-center justify-between mb-4">
                    <p className="text-2xl font-serif text-primary-700">₹{product.price}</p>
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 border border-green-200">
                      ✓ {parseInt(product.stock) > 0 ? 'In Stock' : 'Out of Stock'}
                    </span>
                  </div>

                  {/* Product Details */}
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-sm text-gray-600">
                      <span className="font-medium mr-2">Fabric:</span>
                      <span>{product.fabric}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <span className="font-medium mr-2">Color:</span>
                      <span>{product.color}</span>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-3">
                    <Link
                      href={`/products/${product._id}`}
                      className="flex-1 bg-primary-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-primary-700 transition-colors text-center"
                    >
                      View Details
                    </Link>
                    <button
                      onClick={() => addToCart({
                        _id: product._id!,
                        name: product.name,
                        price: product.price,
                        image: product.images?.[0] || '/sample-images/ProductSample.jpeg',
                        fabric: product.fabric,
                        color: product.color
                      })}
                      className="bg-amber-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-amber-700 transition-colors inline-flex items-center"
                    >
                      🛒
                    </button>
                    <a
                      href={`https://wa.me/917907730095?text=Hi, I'm interested in ${product.name} (${product.price})`}
                      className="bg-green-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-green-700 transition-colors inline-flex items-center"
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

        {/* No Products Message */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🧵</div>
            <h3 className="text-2xl font-serif text-gray-900 mb-2">No products found</h3>
            <p className="text-gray-600">Try adjusting your filters or check back soon for new arrivals.</p>
            {/* Debug Info */}
            <div className="mt-4 p-4 bg-gray-100 rounded text-left max-w-2xl mx-auto">
              <p className="text-sm font-mono font-bold">Debug Info:</p>
              <p className="text-xs font-mono">Products length: {products.length}</p>
              <p className="text-xs font-mono">Filtered products length: {filteredProducts.length}</p>
              <p className="text-xs font-mono">First product exists: {products[0] ? 'YES' : 'NO'}</p>
              <p className="text-xs font-mono">First product name: {products[0]?.name || 'N/A'}</p>
              <p className="text-xs font-mono">First product price: {products[0]?.price || 'N/A'}</p>
              <p className="text-xs font-mono">First product stock: {products[0]?.stock || 'N/A'}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
