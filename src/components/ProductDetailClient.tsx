'use client'

import { Product } from '@/types/product'
import Link from 'next/link'
import ProductGallery from '@/components/ProductGallery'
import RelatedProducts from '@/components/RelatedProducts'
import { useCart } from '@/contexts/CartContext'
import { useState, useEffect, useRef } from 'react'

function safePrice(price: string | number): number {
  if (typeof price === 'number') return price
  return parseFloat(String(price).replace(/[₹,]/g, '')) || 0
}

interface ProductDetailClientProps {
  product: Product
}

function UrgencyTimer() {
  const [timeLeft, setTimeLeft] = useState({ hours: 0, minutes: 0, seconds: 0 })

  useEffect(() => {
    // Generate a fake deadline: random hours (1-5), random minutes
    const seed = new Date().getDate() + new Date().getMonth()
    const fakeHours = (seed % 4) + 1
    const fakeMinutes = (seed * 7) % 60
    const fakeSeconds = (seed * 13) % 60

    let totalSeconds = fakeHours * 3600 + fakeMinutes * 60 + fakeSeconds

    const timer = setInterval(() => {
      totalSeconds -= 1
      if (totalSeconds <= 0) {
        totalSeconds = 3 * 3600 + 30 * 60 // Reset to 3h 30m
      }
      const h = Math.floor(totalSeconds / 3600)
      const m = Math.floor((totalSeconds % 3600) / 60)
      const s = totalSeconds % 60
      setTimeLeft({ hours: h, minutes: m, seconds: s })
    }, 1000)

    // Set initial
    const h = Math.floor(totalSeconds / 3600)
    const m = Math.floor((totalSeconds % 3600) / 60)
    const s = totalSeconds % 60
    setTimeLeft({ hours: h, minutes: m, seconds: s })

    return () => clearInterval(timer)
  }, [])

  return (
    <div className="bg-gradient-to-r from-red-50 to-orange-50 border border-red-200 rounded-lg p-3 sm:p-4">
      <div className="flex items-center gap-2 mb-2">
        <span className="text-red-600 text-lg">🔥</span>
        <span className="text-sm font-bold text-red-700 uppercase tracking-wide">Hurry! Limited Stock</span>
      </div>
      <div className="flex items-center gap-2">
        <span className="text-xs text-red-600 font-medium">Offer ends in:</span>
        <div className="flex items-center gap-1">
          <span className="bg-red-600 text-white text-sm font-bold px-2 py-1 rounded min-w-[32px] text-center">
            {String(timeLeft.hours).padStart(2, '0')}
          </span>
          <span className="text-red-600 font-bold">:</span>
          <span className="bg-red-600 text-white text-sm font-bold px-2 py-1 rounded min-w-[32px] text-center">
            {String(timeLeft.minutes).padStart(2, '0')}
          </span>
          <span className="text-red-600 font-bold">:</span>
          <span className="bg-red-600 text-white text-sm font-bold px-2 py-1 rounded min-w-[32px] text-center">
            {String(timeLeft.seconds).padStart(2, '0')}
          </span>
        </div>
      </div>
    </div>
  )
}

function parseDescription(description: string) {
  const sections: { label: string; value: string }[] = []
  let mainText = ''

  // Try to extract key-value pairs like "Length: 6.25 meters", "Fabric: Premium Tisshu"
  const lines = description.split(/\n|(?<=[.!?])\s+(?=[A-Z])/)
  const kvPattern = /^([\w\s]+?):\s*(.+)$/

  const textParts: string[] = []

  for (const line of lines) {
    const trimmed = line.trim()
    if (!trimmed) continue
    const match = trimmed.match(kvPattern)
    if (match && match[1].split(' ').length <= 4) {
      sections.push({ label: match[1].trim(), value: match[2].trim() })
    } else {
      textParts.push(trimmed)
    }
  }

  mainText = textParts.join(' ')

  return { mainText, sections }
}

export default function ProductDetailClient({ product }: ProductDetailClientProps) {
  const { addToCart } = useCart()
  const [quantity, setQuantity] = useState(1)
  const [includeBlouse, setIncludeBlouse] = useState(false)
  const [blouseMeters, setBlouseMeters] = useState(1)
  const [showAddedToCart, setShowAddedToCart] = useState(false)
  const [showStickyBar, setShowStickyBar] = useState(false)
  const addToCartRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setShowStickyBar(!entry.isIntersecting)
      },
      { threshold: 0 }
    )
    if (addToCartRef.current) {
      observer.observe(addToCartRef.current)
    }
    return () => observer.disconnect()
  }, [])

  const sellingPrice = safePrice(product.price)
  const comparePrice = product.compare_at_price ? safePrice(product.compare_at_price) : 0
  const hasDiscount = comparePrice > sellingPrice
  const discountPercent = hasDiscount ? Math.round(((comparePrice - sellingPrice) / comparePrice) * 100) : 0

  const blousePrice = product.blouse_price ? safePrice(product.blouse_price) : 0
  const hasBlouse = blousePrice > 0 || (product.blouse_details && product.blouse_details.trim() !== '')

  const blouseCost = includeBlouse ? blousePrice * blouseMeters : 0
  const totalPrice = (sellingPrice * quantity) + blouseCost

  const productWeight = product.weight ? safePrice(product.weight) : 0
  const showWeight = productWeight > 0

  const handleAddToCart = () => {
    addToCart({
      _id: product._id!,
      productId: product._id!,
      name: product.name,
      price: sellingPrice,
      image: product.images?.[0] || '/sample-images/ProductSample.jpeg',
      fabric: product.fabric,
      color: product.color,
      blouse_price: includeBlouse ? blousePrice : undefined,
      blouse_meters: includeBlouse ? blouseMeters : undefined,
      blouse_details: includeBlouse ? (product.blouse_details || 'Blouse piece') : undefined,
      weight: productWeight > 0 ? productWeight : undefined
    })
    
    setShowAddedToCart(true)
    setTimeout(() => setShowAddedToCart(false), 2000)
  }

  const { mainText, sections } = product.description ? parseDescription(product.description) : { mainText: '', sections: [] }

  return (
    <div className="bg-gradient-to-b from-white to-amber-50">
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
        <nav className="flex items-center text-sm flex-wrap">
          <Link href="/" className="text-gray-600 hover:text-primary-700 transition-colors">Home</Link>
          <span className="mx-2 text-gray-400">/</span>
          <Link href="/products" className="text-gray-600 hover:text-primary-700 transition-colors">Products</Link>
          <span className="mx-2 text-gray-400">/</span>
          <span className="text-gray-900 font-medium truncate max-w-[200px]">{product.name}</span>
        </nav>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        <div className="lg:grid lg:grid-cols-2 lg:gap-x-16 lg:items-start lg:py-8">
          {/* Image Gallery */}
          <div className="w-full lg:sticky lg:top-8 lg:h-fit">
            <ProductGallery images={product.images || ['/sample-images/ProductSample.jpeg']} />
            
            {/* Trust badges */}
            <div className="mt-6 sm:mt-8 grid grid-cols-3 gap-3 sm:gap-4">
              <div className="text-center p-3 sm:p-4 bg-white rounded-lg shadow-sm border border-gray-100">
                <div className="text-xl sm:text-2xl mb-1 sm:mb-2">✓</div>
                <p className="text-xs text-gray-600 font-medium">100% Genuine</p>
              </div>
              <div className="text-center p-3 sm:p-4 bg-white rounded-lg shadow-sm border border-gray-100">
                <div className="text-xl sm:text-2xl mb-1 sm:mb-2">🚚</div>
                <p className="text-xs text-gray-600 font-medium">Fast Delivery</p>
              </div>
              <div className="text-center p-3 sm:p-4 bg-white rounded-lg shadow-sm border border-gray-100">
                <div className="text-xl sm:text-2xl mb-1 sm:mb-2">↩️</div>
                <p className="text-xs text-gray-600 font-medium">Easy Returns</p>
              </div>
            </div>
          </div>

          {/* Product info */}
          <div className="mt-6 lg:mt-0 lg:pl-4">
            <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6 lg:p-8 border border-gray-100">
              {/* Title */}
              <div className="border-b border-gray-100 pb-4 sm:pb-6">
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-serif text-gray-900 mb-3 leading-tight">
                  {product.name}
                </h1>
                <div className="flex items-center justify-center mb-4">
                  <div className="h-px w-16 bg-primary-600"></div>
                  <span className="mx-4 text-primary-700 text-xl">✦</span>
                  <div className="h-px w-16 bg-primary-600"></div>
                </div>
              </div>

              {/* Urgency Timer */}
              <div className="py-4">
                <UrgencyTimer />
              </div>

              {/* Price and Stock */}
              <div className="py-4 sm:py-6 border-b border-gray-100">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
                  <div>
                    <p className="text-sm text-gray-600 font-medium mb-1">Price</p>
                    <div className="flex items-center gap-3 flex-wrap">
                      <p className="text-3xl sm:text-4xl lg:text-5xl font-serif text-green-600">
                        ₹{sellingPrice.toLocaleString()}
                      </p>
                      {hasDiscount && (
                        <>
                          <p className="text-xl sm:text-2xl font-serif text-red-400 line-through">
                            ₹{comparePrice.toLocaleString()}
                          </p>
                          <span className="bg-green-100 text-green-800 text-xs sm:text-sm font-bold px-2 py-1 rounded-full">
                            {discountPercent}% OFF
                          </span>
                        </>
                      )}
                    </div>
                  </div>
                  <div className="sm:text-right">
                    <span className="inline-flex items-center px-3 sm:px-4 py-2 rounded-full text-sm font-medium bg-green-100 text-green-800 border border-green-200">
                      ✓ {product.stock}
                    </span>
                  </div>
                </div>
              </div>

              {/* Blouse Piece Info */}
              {hasBlouse && (
                <div className="py-4 sm:py-6 border-b border-gray-100">
                  <h3 className="text-lg font-serif text-gray-900 mb-3 flex items-center gap-2">
                    <span>👗</span> Blouse Piece
                  </h3>
                  {product.blouse_details && (
                    <p className="text-sm text-gray-600 mb-3">{product.blouse_details}</p>
                  )}
                  {blousePrice > 0 && (
                    <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-sm font-medium text-gray-700">Blouse fabric: ₹{blousePrice.toLocaleString()}/meter</span>
                      </div>
                      <label className="flex items-center gap-3 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={includeBlouse}
                          onChange={(e) => setIncludeBlouse(e.target.checked)}
                          className="w-4 h-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                        />
                        <span className="text-sm font-medium text-gray-800">Add blouse piece</span>
                      </label>
                      {includeBlouse && (
                        <div className="mt-3 flex items-center gap-3">
                          <label className="text-sm text-gray-600">Meters:</label>
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => setBlouseMeters(Math.max(1, blouseMeters - 1))}
                              className="w-8 h-8 rounded border border-gray-300 flex items-center justify-center hover:bg-gray-50 text-sm"
                            >
                              -
                            </button>
                            <span className="w-8 text-center text-sm font-medium">{blouseMeters}</span>
                            <button
                              onClick={() => setBlouseMeters(blouseMeters + 1)}
                              className="w-8 h-8 rounded border border-gray-300 flex items-center justify-center hover:bg-gray-50 text-sm"
                            >
                              +
                            </button>
                          </div>
                          <span className="text-sm font-medium text-primary-700">= ₹{(blousePrice * blouseMeters).toLocaleString()}</span>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}

              {/* Quantity Selector */}
              <div className="py-4 sm:py-6 border-b border-gray-100">
                <h3 className="text-lg font-serif text-gray-900 mb-3">Quantity</h3>
                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-10 h-10 rounded-lg border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors"
                  >
                    -
                  </button>
                  <input
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                    className="w-20 text-center border border-gray-300 rounded-lg px-3 py-2"
                    min="1"
                  />
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-10 h-10 rounded-lg border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors"
                  >
                    +
                  </button>
                </div>

                {/* Total Price Summary */}
                {(quantity > 1 || includeBlouse) && (
                  <div className="mt-4 bg-green-50 border border-green-200 rounded-lg p-3">
                    <div className="space-y-1 text-sm">
                      <div className="flex justify-between text-gray-600">
                        <span>Product ({quantity} x ₹{sellingPrice.toLocaleString()})</span>
                        <span>₹{(sellingPrice * quantity).toLocaleString()}</span>
                      </div>
                      {includeBlouse && blousePrice > 0 && (
                        <div className="flex justify-between text-gray-600">
                          <span>Blouse ({blouseMeters}m x ₹{blousePrice.toLocaleString()})</span>
                          <span>₹{blouseCost.toLocaleString()}</span>
                        </div>
                      )}
                      <div className="flex justify-between font-bold text-gray-900 border-t border-green-300 pt-1 mt-1">
                        <span>Total</span>
                        <span className="text-green-700">₹{totalPrice.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Product Details */}
              <div className="py-4 sm:py-6 border-b border-gray-100">
                <h3 className="text-lg font-serif text-gray-900 mb-4">Product Details</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {product.fabric && (
                    <div className="flex items-start">
                      <span className="text-primary-600 mr-3 mt-1">•</span>
                      <div className="flex-1">
                        <span className="font-medium text-gray-900 block">Fabric</span>
                        <span className="text-gray-700">{product.fabric}</span>
                      </div>
                    </div>
                  )}
                  {product.color && (
                    <div className="flex items-start">
                      <span className="text-primary-600 mr-3 mt-1">•</span>
                      <div className="flex-1">
                        <span className="font-medium text-gray-900 block">Color</span>
                        <span className="text-gray-700">{product.color}</span>
                      </div>
                    </div>
                  )}
                  {showWeight && (
                    <div className="flex items-start">
                      <span className="text-primary-600 mr-3 mt-1">•</span>
                      <div className="flex-1">
                        <span className="font-medium text-gray-900 block">Weight</span>
                        <span className="text-gray-700">{productWeight} kg</span>
                      </div>
                    </div>
                  )}
                  {product.shipping && (
                    <div className="flex items-start">
                      <span className="text-primary-600 mr-3 mt-1">•</span>
                      <div className="flex-1">
                        <span className="font-medium text-gray-900 block">Shipping</span>
                        <span className="text-gray-700">{product.shipping}</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Description - Structured UI */}
              {product.description && (
                <div className="py-4 sm:py-6 border-b border-gray-100">
                  <h3 className="text-lg font-serif text-gray-900 mb-4">Description</h3>
                  
                  {mainText && (
                    <p className="text-gray-700 leading-relaxed text-sm sm:text-base mb-4">{mainText}</p>
                  )}

                  {sections.length > 0 && (
                    <div className="bg-gray-50 rounded-lg overflow-hidden border border-gray-200">
                      <table className="w-full text-sm">
                        <tbody>
                          {sections.map((section, index) => (
                            <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                              <td className="px-4 py-2.5 font-medium text-gray-900 whitespace-nowrap border-r border-gray-200 w-1/3">
                                {section.label}
                              </td>
                              <td className="px-4 py-2.5 text-gray-700">
                                {section.value}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              )}

              {/* Tags */}
              {product.tags && product.tags.length > 0 && (
                <div className="py-4 sm:py-6 border-b border-gray-100">
                  <h3 className="text-lg font-serif text-gray-900 mb-3">Categories</h3>
                  <div className="flex flex-wrap gap-2">
                    {product.tags.map((tag) => (
                      <span
                        key={tag}
                        className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-amber-50 text-primary-800 border border-primary-200"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="pt-6 sm:pt-8 space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <button
                    ref={addToCartRef}
                    type="button"
                    onClick={handleAddToCart}
                    className="bg-primary-600 border border-transparent rounded-lg py-4 px-6 flex items-center justify-center text-base font-medium text-white hover:bg-primary-700 transition-all shadow-md hover:shadow-lg relative"
                  >
                    <span className="mr-2 text-xl">🛒</span> Add to Cart
                    {showAddedToCart && (
                      <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-green-600 text-white px-3 py-1 rounded-lg text-sm whitespace-nowrap">
                        Added to cart!
                      </span>
                    )}
                  </button>
                  <a
                    href={`https://wa.me/917907730095?text=Hi, I'm interested in ${product.name} (₹${sellingPrice.toLocaleString()}). Fabric: ${product.fabric}, Color: ${product.color}, Quantity: ${quantity}${includeBlouse ? `, Blouse: ${blouseMeters}m` : ''}`}
                    className="bg-green-600 border border-transparent rounded-lg py-4 px-6 flex items-center justify-center text-base font-medium text-white hover:bg-green-700 transition-all shadow-md hover:shadow-lg"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span className="mr-2 text-xl">📱</span> Place Order
                  </a>
                </div>
              </div>
            </div>

            {/* Additional Info */}
            <div className="mt-6 bg-gradient-to-r from-primary-50 to-amber-50 rounded-xl p-6 border border-primary-100">
              <h4 className="font-serif text-gray-900 mb-4 flex items-center text-lg">
                <span className="mr-2">ℹ️</span> Why Choose Kuthampully Handlooms?
              </h4>
              <ul className="space-y-3 text-sm text-gray-700">
                <li className="flex items-start">
                  <span className="text-primary-600 mr-3 mt-0.5">✓</span>
                  <span>Authentic handwoven textiles from Kerala</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary-600 mr-3 mt-0.5">✓</span>
                  <span>Traditional craftsmanship passed through generations</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary-600 mr-3 mt-0.5">✓</span>
                  <span>Premium quality natural fibers</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary-600 mr-3 mt-0.5">✓</span>
                  <span>Secure packaging & reliable India Post delivery</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Related Products */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
        <RelatedProducts
          currentProductId={product._id || ''}
          fabric={product.fabric}
          tags={product.tags}
        />
      </div>

      {/* Sticky Mobile Add to Cart Bar */}
      <div className={`fixed bottom-0 left-0 right-0 z-50 lg:hidden transition-transform duration-300 ${showStickyBar ? 'translate-y-0' : 'translate-y-full'}`}>
        <div className="bg-white border-t border-gray-200 shadow-[0_-4px_12px_rgba(0,0,0,0.1)] px-4 py-3 safe-area-bottom">
          <div className="flex items-center gap-3 max-w-lg mx-auto">
            <div className="flex-shrink-0">
              <p className="text-lg font-bold text-gray-900">₹{totalPrice.toLocaleString()}</p>
              {hasDiscount && (
                <p className="text-xs text-red-500 line-through">₹{(comparePrice * quantity).toLocaleString()}</p>
              )}
            </div>
            <button
              onClick={handleAddToCart}
              className="flex-1 bg-primary-600 text-white py-3 rounded-lg font-medium hover:bg-primary-700 transition-colors text-sm relative"
            >
              {showAddedToCart ? '✓ Added to Cart!' : '🛒 Add to Cart'}
            </button>
            <a
              href={`https://wa.me/917907730095?text=Hi, I'm interested in ${product.name} (₹${sellingPrice.toLocaleString()})`}
              className="flex-shrink-0 bg-green-600 text-white p-3 rounded-lg hover:bg-green-700 transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              📱
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
