'use client'

import { useState, useEffect, useRef } from 'react'
import { Product } from '@/types/product'
import Link from 'next/link'

function safePrice(price: string | number): number {
  if (typeof price === 'number') return price
  return parseFloat(String(price).replace(/[₹,]/g, '')) || 0
}

export default function SearchBar() {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<Product[]>([])
  const [isOpen, setIsOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const debounceRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleSearch = (value: string) => {
    setQuery(value)
    if (debounceRef.current) clearTimeout(debounceRef.current)

    if (value.trim().length < 2) {
      setResults([])
      setIsOpen(false)
      return
    }

    setLoading(true)
    debounceRef.current = setTimeout(async () => {
      try {
        const res = await fetch(`/api/supabase/products?search=${encodeURIComponent(value.trim())}&limit=8`)
        const data = await res.json()
        if (data.success) {
          setResults(data.products)
          setIsOpen(true)
        }
      } catch {
        setResults([])
      } finally {
        setLoading(false)
      }
    }, 300)
  }

  const handleResultClick = () => {
    setIsOpen(false)
    setQuery('')
    setResults([])
  }

  return (
    <div ref={containerRef} className="relative w-full max-w-md">
      <div className="relative">
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => handleSearch(e.target.value)}
          onFocus={() => results.length > 0 && setIsOpen(true)}
          placeholder="Search sarees, mundus..."
          className="w-full pl-9 pr-4 py-2 text-sm border border-gray-200 rounded-lg bg-gray-50 focus:bg-white focus:border-primary-400 focus:ring-1 focus:ring-primary-200 outline-none transition-all"
        />
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">🔍</span>
        {loading && (
          <span className="absolute right-3 top-1/2 -translate-y-1/2">
            <span className="block w-4 h-4 border-2 border-primary-300 border-t-transparent rounded-full animate-spin"></span>
          </span>
        )}
      </div>

      {/* Results Dropdown */}
      {isOpen && results.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-white rounded-lg shadow-xl border border-gray-100 z-50 max-h-80 overflow-y-auto">
          {results.map((product) => (
            <Link
              key={product._id}
              href={`/products/${product._id}`}
              onClick={handleResultClick}
              className="flex items-center gap-3 px-3 py-2.5 hover:bg-amber-50 transition-colors border-b border-gray-50 last:border-0"
            >
              <img
                src={product.images?.[0] || '/sample-images/ProductSample.jpeg'}
                alt={product.name}
                className="w-10 h-12 object-cover rounded flex-shrink-0"
              />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">{product.name}</p>
                <p className="text-xs text-gray-500">{product.fabric} • {product.color}</p>
              </div>
              <p className="text-sm font-bold text-primary-700 flex-shrink-0">₹{safePrice(product.price).toLocaleString()}</p>
            </Link>
          ))}
          <Link
            href={`/products?search=${encodeURIComponent(query)}`}
            onClick={handleResultClick}
            className="block text-center text-sm text-primary-600 font-medium py-2.5 hover:bg-primary-50 transition-colors"
          >
            View all results →
          </Link>
        </div>
      )}

      {isOpen && query.trim().length >= 2 && results.length === 0 && !loading && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-white rounded-lg shadow-xl border border-gray-100 z-50 p-4 text-center">
          <p className="text-sm text-gray-500">No products found for &quot;{query}&quot;</p>
        </div>
      )}
    </div>
  )
}
