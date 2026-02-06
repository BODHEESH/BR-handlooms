'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      {/* Hamburger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden relative w-8 h-8 flex flex-col justify-center items-center"
        aria-label="Toggle menu"
      >
        <span className={`block w-6 h-0.5 bg-gray-700 transition-all duration-300 ${isOpen ? 'rotate-45 translate-y-1.5' : ''}`}></span>
        <span className={`block w-6 h-0.5 bg-gray-700 transition-all duration-300 mt-1 ${isOpen ? 'opacity-0' : ''}`}></span>
        <span className={`block w-6 h-0.5 bg-gray-700 transition-all duration-300 mt-1 ${isOpen ? '-rotate-45 -translate-y-1.5' : ''}`}></span>
      </button>

      {/* Sidebar Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          ></div>
          
          {/* Sidebar */}
          <div className="fixed right-0 top-0 h-full w-80 bg-white shadow-2xl transform transition-transform duration-300 ease-in-out">
            <div className="flex flex-col h-full">
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-gray-200">
                <div className="text-center">
                  <h2 className="text-xl font-serif text-gray-900 tracking-wide">BR Handlooms</h2>
                  <p className="text-xs text-primary-700 tracking-widest">KUTHAMPULLY</p>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                  aria-label="Close menu"
                >
                  <span className="text-2xl text-gray-600">×</span>
                </button>
              </div>

              {/* Navigation Links */}
              <nav className="flex-1 p-6">
                <div className="space-y-4">
                  <Link
                    href="/"
                    className="block text-lg font-medium text-gray-700 hover:text-primary-600 transition-colors py-3 border-b border-gray-100"
                    onClick={() => setIsOpen(false)}
                  >
                    Home
                  </Link>
                  <Link
                    href="/products"
                    className="block text-lg font-medium text-gray-700 hover:text-primary-600 transition-colors py-3 border-b border-gray-100"
                    onClick={() => setIsOpen(false)}
                  >
                    All Products
                  </Link>
                  <Link
                    href="/womens-collection"
                    className="block text-lg font-medium text-gray-700 hover:text-primary-600 transition-colors py-3 border-b border-gray-100"
                    onClick={() => setIsOpen(false)}
                  >
                    Women's Collection
                  </Link>
                  <Link
                    href="/mens-wear"
                    className="block text-lg font-medium text-gray-700 hover:text-primary-600 transition-colors py-3 border-b border-gray-100"
                    onClick={() => setIsOpen(false)}
                  >
                    Men's Wear
                  </Link>
                  <Link
                    href="/celebrity-inspired"
                    className="block text-lg font-medium text-gray-700 hover:text-primary-600 transition-colors py-3 border-b border-gray-100"
                    onClick={() => setIsOpen(false)}
                  >
                    Celebrity Inspired
                  </Link>
                  <Link
                    href="/new-arrivals"
                    className="block text-lg font-medium text-gray-700 hover:text-primary-600 transition-colors py-3 border-b border-gray-100"
                    onClick={() => setIsOpen(false)}
                  >
                    New Arrivals
                  </Link>
                </div>
              </nav>

              {/* WhatsApp Button */}
              <div className="p-6 border-t border-gray-200">
                <a
                  href="https://wa.me/917907730095"
                  className="w-full bg-green-600 text-white px-6 py-3 rounded-md font-medium hover:bg-green-700 transition-colors inline-flex items-center justify-center"
                >
                  <span className="mr-2">📱</span> WhatsApp Order
                </a>
              </div>

              {/* Footer Info */}
              <div className="p-6 text-center text-sm text-gray-600 border-t border-gray-200">
                <p>Preserving Kerala's handloom heritage</p>
                <p className="mt-1">© 2024 BR Handlooms</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
