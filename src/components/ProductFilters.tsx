'use client'

import { useState } from 'react'

interface ProductFiltersProps {
  onSortChange: (sort: string) => void
  onFilterChange: (filters: {
    priceRange: string
    fabric: string
    stock: string
  }) => void
}

export default function ProductFilters({ onSortChange, onFilterChange }: ProductFiltersProps) {
  const [sortOption, setSortOption] = useState('featured')
  const [priceRange, setPriceRange] = useState('all')
  const [fabric, setFabric] = useState('all')
  const [stock, setStock] = useState('all')

  const handleSortChange = (value: string) => {
    setSortOption(value)
    onSortChange(value)
  }

  const handleFilterChange = (type: string, value: string) => {
    if (type === 'price') {
      setPriceRange(value)
    } else if (type === 'fabric') {
      setFabric(value)
    } else if (type === 'stock') {
      setStock(value)
    }
    
    onFilterChange({
      priceRange: type === 'price' ? value : priceRange,
      fabric: type === 'fabric' ? value : fabric,
      stock: type === 'stock' ? value : stock
    })
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Sort By */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Sort By</label>
          <select
            value={sortOption}
            onChange={(e) => handleSortChange(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          >
            <option value="featured">Featured</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="name">Name: A to Z</option>
            <option value="stock">In Stock First</option>
          </select>
        </div>

        {/* Price Range */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Price Range</label>
          <select
            value={priceRange}
            onChange={(e) => handleFilterChange('price', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          >
            <option value="all">All Prices</option>
            <option value="0-1000">Under ₹1,000</option>
            <option value="1000-3000">₹1,000 - ₹3,000</option>
            <option value="3000-6000">₹3,000 - ₹6,000</option>
            <option value="6000+">Above ₹6,000</option>
          </select>
        </div>

        {/* Fabric Type */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Fabric Type</label>
          <select
            value={fabric}
            onChange={(e) => handleFilterChange('fabric', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          >
            <option value="all">All Fabrics</option>
            <option value="cotton">Cotton</option>
            <option value="silk">Silk</option>
            <option value="handloom">Handloom</option>
            <option value="blend">Blend</option>
          </select>
        </div>

        {/* Stock Status */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Stock Status</label>
          <select
            value={stock}
            onChange={(e) => handleFilterChange('stock', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          >
            <option value="all">All Items</option>
            <option value="in-stock">In Stock</option>
            <option value="limited">Limited Stock</option>
          </select>
        </div>
      </div>

      {/* Active Filters Display */}
      <div className="mt-4 flex flex-wrap gap-2">
        {priceRange !== 'all' && (
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-primary-100 text-primary-800">
            Price: {priceRange}
            <button
              onClick={() => handleFilterChange('price', 'all')}
              className="ml-2 text-primary-600 hover:text-primary-800"
            >
              ×
            </button>
          </span>
        )}
        {fabric !== 'all' && (
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-primary-100 text-primary-800">
            Fabric: {fabric}
            <button
              onClick={() => handleFilterChange('fabric', 'all')}
              className="ml-2 text-primary-600 hover:text-primary-800"
            >
              ×
            </button>
          </span>
        )}
        {stock !== 'all' && (
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-primary-100 text-primary-800">
            Stock: {stock}
            <button
              onClick={() => handleFilterChange('stock', 'all')}
              className="ml-2 text-primary-600 hover:text-primary-800"
            >
              ×
            </button>
          </span>
        )}
      </div>
    </div>
  )
}
