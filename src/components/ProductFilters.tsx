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
  const [isOpen, setIsOpen] = useState(false)

  const activeFilterCount = [priceRange !== 'all', fabric !== 'all', stock !== 'all', sortOption !== 'featured'].filter(Boolean).length

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
    <div className="mb-4 sm:mb-6">
      {/* Mobile: Filter toggle button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden w-full flex items-center justify-between bg-white rounded-lg shadow-sm border border-gray-200 px-4 py-3"
      >
        <div className="flex items-center gap-2">
          <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
          </svg>
          <span className="text-sm font-medium text-gray-700">Filters & Sort</span>
          {activeFilterCount > 0 && (
            <span className="bg-primary-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
              {activeFilterCount}
            </span>
          )}
        </div>
        <svg className={`w-5 h-5 text-gray-500 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Filter content: always visible on lg+, toggle on mobile */}
      <div className={`${isOpen ? 'block' : 'hidden'} lg:block mt-3 lg:mt-0`}>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
            {/* Sort By */}
            <div>
              <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">Sort By</label>
              <select
                value={sortOption}
                onChange={(e) => handleSortChange(e.target.value)}
                className="w-full px-2 sm:px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
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
              <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">Price Range</label>
              <select
                value={priceRange}
                onChange={(e) => handleFilterChange('price', e.target.value)}
                className="w-full px-2 sm:px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
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
              <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">Fabric Type</label>
              <select
                value={fabric}
                onChange={(e) => handleFilterChange('fabric', e.target.value)}
                className="w-full px-2 sm:px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
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
              <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">Stock Status</label>
              <select
                value={stock}
                onChange={(e) => handleFilterChange('stock', e.target.value)}
                className="w-full px-2 sm:px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              >
                <option value="all">All Items</option>
                <option value="in-stock">In Stock</option>
                <option value="limited">Limited Stock</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Active Filters Display - always visible */}
      {activeFilterCount > 0 && (
        <div className="mt-3 flex flex-wrap gap-2">
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
      )}
    </div>
  )
}
