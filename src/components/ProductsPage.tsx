'use client'

import { useState, useEffect } from 'react'
import { Product } from '@/types/product'
import Link from 'next/link'
import ProductFilters from '@/components/ProductFilters'

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

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  const fetchProducts = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/supabase/products')
      const data = await response.json()
      
      if (data.success) {
        setProducts(data.products)
        setFilteredProducts(data.products)
      } else {
        console.error('Failed to fetch products:', data.error)
      }
    } catch (error) {
      console.error('Error fetching products:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchProducts()
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
              All Products
            </h1>
            <p className="mt-3 max-w-2xl mx-auto text-lg text-green-50">
              Explore our complete collection of authentic Kuthampully handloom textiles, 
              featuring traditional sarees, men's wear, and celebrity-inspired designs.
            </p>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <ProductFilters onSortChange={handleSortChange} onFilterChange={handleFilterChange} />
      </div>

      {/* Products Grid */}
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-4 pb-12">
        {loading ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-500 text-lg mb-4">
              {products.length === 0 
                ? "No products added yet. Send a message to your Telegram bot to add products!"
                : "No products match your filters. Try adjusting your filters."
              }
            </div>
            {products.length === 0 && (
              <div className="bg-gray-100 rounded-lg p-6 max-w-md mx-auto">
                <h3 className="font-semibold text-gray-700 mb-2">How to add products:</h3>
                <p className="text-sm text-gray-600">
                  Send a message to your Telegram bot with this format:
                </p>
                <pre className="bg-white p-3 rounded mt-2 text-xs text-left">
                  {`#NewArrival

                  Product Name: [Name]
                  Fabric: [Fabric]
                  Color: [Color]
                  Price: [Price]
                  Stock: [Stock]

                  #tag1 #tag2`}
                </pre>
              </div>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {filteredProducts.map((product: Product) => (
            <div key={product._id} className="group h-full flex flex-col">
              <div className="relative bg-white rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden flex flex-col h-full">
                {/* Product Image */}
                <Link href={`/products/${product._id}`} className="aspect-[3/3] bg-gray-100 relative overflow-hidden flex-shrink-0 block">
                  <img
                    src={product.images?.[0] || '/sample-images/ProductSample.jpeg'}
                    alt={product.name}
                    className="w-full h-full object-center object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 flex items-center justify-center">
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white/90 text-gray-900 px-4 py-2 rounded-lg text-sm font-medium">
                      View Details
                    </div>
                  </div>
                </Link>

                {/* Product Info */}
                <div className="p-6 flex-grow flex flex-col">
                  <h3 className="text-xl font-serif text-gray-900 mb-2 line-clamp-2">
                    {product.name}
                  </h3>
                  <div className="flex items-center justify-between mb-4">
                    <p className="text-2xl font-serif text-primary-700">{product.price}</p>
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 border border-green-200">
                      ✓ {product.stock}
                    </span>
                  </div>

                  {/* Product Details */}
                  <div className="space-y-2 mb-4 flex-grow">
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
                  <div className="flex gap-3 mt-auto">
                    <Link
                      href={`/products/${product._id}`}
                      className="flex-1 bg-primary-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-primary-700 transition-colors text-center"
                    >
                      View Details
                    </Link>
                    <a
                      href={`https://wa.me/917907730095?text=Hi, I'm interested in ${product.name} (${product.price})`}
                      className="bg-green-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-green-700 transition-colors inline-flex items-center"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <span className="mr-1">📱</span>
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
