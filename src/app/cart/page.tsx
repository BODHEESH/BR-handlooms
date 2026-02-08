'use client'

import { useCart } from '@/contexts/CartContext'
import Link from 'next/link'
import { useState } from 'react'
import { estimateShippingCharge, isKeralaPincode, getDistrictForPincode, getAllServiceOptions, ServiceType } from '@/utils/shipping'

function safeParsePrice(price: string | number): number {
  if (typeof price === 'number') return price
  return parseFloat(String(price).replace(/[₹,]/g, '')) || 0
}

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, updateBlouseQuantity, removeBlouse, clearCart } = useCart()
  const [pincode, setPincode] = useState('')
  const [pincodeChecked, setPincodeChecked] = useState(false)
  const [selectedService, setSelectedService] = useState<ServiceType>('parcel')

  // Calculate total weight from cart items (in grams)
  const totalWeightGrams = cart.items.reduce((sum, item) => {
    const itemWeightGrams = item.weight ? item.weight * 1000 * item.quantity : 0
    return sum + itemWeightGrams
  }, 0)

  const hasWeightInfo = cart.items.some(item => item.weight && item.weight > 0)

  // Calculate shipping based on pincode and selected service
  const validPincode = pincode.length === 6 && /^\d{6}$/.test(pincode)
  const shipping = estimateShippingCharge(totalWeightGrams, validPincode ? pincode : undefined, selectedService)
  const isKerala = validPincode ? isKeralaPincode(pincode) : null
  const district = validPincode && isKerala ? getDistrictForPincode(pincode) : null
  const serviceOptions = getAllServiceOptions(totalWeightGrams, validPincode ? pincode : undefined)

  // Always add 30% buffer to shipping estimate (rounded up to nearest 10)
  const shippingDisplay = Math.ceil((shipping.total * 1.3) / 10) * 10

  const handlePincodeCheck = () => {
    if (validPincode) {
      setPincodeChecked(true)
    }
  }

  const handlePincodeChange = (value: string) => {
    const cleaned = value.replace(/\D/g, '').slice(0, 6)
    setPincode(cleaned)
    setPincodeChecked(false)
  }

  // Calculate product subtotal (without blouse)
  const productSubtotal = cart.items.reduce((sum, item) => {
    return sum + safeParsePrice(item.price) * item.quantity
  }, 0)

  // Calculate blouse total
  const blouseTotal = cart.items.reduce((sum, item) => {
    if (item.blouse_price && item.blouse_meters) {
      return sum + item.blouse_price * item.blouse_meters
    }
    return sum
  }, 0)

  const grandTotal = productSubtotal + blouseTotal + shippingDisplay

  if (cart.items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <div className="text-center">
            <svg className="w-16 h-16 sm:w-24 sm:h-24 mx-auto text-gray-300 mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            <h1 className="text-2xl sm:text-3xl font-serif text-gray-900 mb-3">Your cart is empty</h1>
            <p className="text-gray-600 mb-6 text-sm sm:text-base">Looks like you haven&apos;t added any products yet.</p>
            <Link
              href="/products"
              className="inline-flex items-center px-6 py-3 bg-primary-600 text-white font-medium rounded-lg hover:bg-primary-700 transition-colors text-sm sm:text-base"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <h1 className="text-2xl sm:text-3xl font-serif text-gray-900 mb-6">Shopping Cart ({cart.itemCount} items)</h1>
        
        <div className="lg:grid lg:grid-cols-12 lg:gap-x-8">
          {/* Cart Items */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <ul className="divide-y divide-gray-200">
                {cart.items.map((item) => {
                  const itemPrice = safeParsePrice(item.price)
                  const itemTotal = itemPrice * item.quantity
                  const hasBlouse = item.blouse_price && item.blouse_meters && item.blouse_price > 0
                  const blouseCost = hasBlouse ? item.blouse_price! * item.blouse_meters! : 0
                  const productLink = `/products/${item.productId || item._id}`

                  return (
                    <li key={item._id} className="p-4 sm:p-6">
                      <div className="flex space-x-3 sm:space-x-4">
                        {/* Clickable image */}
                        <Link href={productLink} className="flex-shrink-0">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-20 h-20 sm:w-28 sm:h-28 object-cover rounded-lg hover:opacity-80 transition-opacity cursor-pointer"
                          />
                        </Link>
                        <div className="flex-1 min-w-0">
                          <div className="flex justify-between items-start">
                            <div className="min-w-0 pr-2">
                              {/* Clickable product name */}
                              <Link href={productLink} className="hover:text-primary-600 transition-colors">
                                <h3 className="text-sm sm:text-lg font-medium text-gray-900 line-clamp-2">{item.name}</h3>
                              </Link>
                              <p className="text-xs sm:text-sm text-gray-500 mt-0.5">{item.fabric} • {item.color}</p>
                              <p className="text-base sm:text-lg font-semibold text-green-600 mt-1">₹{itemPrice.toLocaleString()}</p>
                            </div>
                            <button
                              onClick={() => removeFromCart(item._id)}
                              className="text-gray-400 hover:text-red-500 transition-colors flex-shrink-0 p-1"
                            >
                              <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                              </svg>
                            </button>
                          </div>
                          
                          {/* Quantity controls */}
                          <div className="flex flex-wrap items-center gap-2 sm:gap-4 mt-3">
                            <div className="flex items-center">
                              <button
                                onClick={() => updateQuantity(item._id, item.quantity - 1)}
                                className="w-8 h-8 sm:w-9 sm:h-9 rounded-l-lg border border-gray-300 flex items-center justify-center hover:bg-gray-100 transition-colors text-sm font-medium bg-gray-50"
                              >
                                -
                              </button>
                              <span className="w-10 sm:w-12 h-8 sm:h-9 flex items-center justify-center text-sm sm:text-base font-medium border-t border-b border-gray-300 bg-white">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() => updateQuantity(item._id, item.quantity + 1)}
                                className="w-8 h-8 sm:w-9 sm:h-9 rounded-r-lg border border-gray-300 flex items-center justify-center hover:bg-gray-100 transition-colors text-sm font-medium bg-gray-50"
                              >
                                +
                              </button>
                            </div>
                            <span className="text-xs sm:text-sm text-gray-600">
                              = ₹{itemTotal.toLocaleString()}
                            </span>
                          </div>

                          {/* Blouse info - shown when blouse was added from product page */}
                          {hasBlouse && (
                            <div className="mt-3 bg-amber-50 border border-amber-200 rounded-lg p-2.5 sm:p-3">
                              <div className="flex items-center justify-between mb-2">
                                <div className="flex items-center gap-1.5">
                                  <span className="text-sm">👗</span>
                                  <span className="text-xs sm:text-sm font-medium text-amber-800">Blouse Piece</span>
                                </div>
                                <button
                                  onClick={() => removeBlouse(item._id)}
                                  className="text-xs text-red-500 hover:text-red-700 font-medium transition-colors"
                                >
                                  ✕ Remove
                                </button>
                              </div>
                              
                              <div className="flex items-center justify-between mb-1.5">
                                <span className="text-xs text-amber-700">Qty (meters):</span>
                                <div className="flex items-center">
                                  <button
                                    onClick={() => updateBlouseQuantity(item._id, (item.blouse_meters || 1) - 1)}
                                    className="w-7 h-7 rounded-l border border-amber-300 flex items-center justify-center hover:bg-amber-100 transition-colors text-xs font-bold bg-white"
                                  >
                                    −
                                  </button>
                                  <span className="w-9 h-7 flex items-center justify-center text-xs font-semibold text-amber-900 border-t border-b border-amber-300 bg-white">
                                    {item.blouse_meters || 1}m
                                  </span>
                                  <button
                                    onClick={() => updateBlouseQuantity(item._id, (item.blouse_meters || 1) + 1)}
                                    className="w-7 h-7 rounded-r border border-amber-300 flex items-center justify-center hover:bg-amber-100 transition-colors text-xs font-bold bg-white"
                                  >
                                    +
                                  </button>
                                </div>
                              </div>
                              
                              <p className="text-xs text-amber-700">
                                {item.blouse_meters || 1}m × ₹{item.blouse_price!.toLocaleString()}/m = <span className="font-bold text-amber-900">₹{blouseCost.toLocaleString()}</span>
                              </p>
                              {item.blouse_details && (
                                <p className="text-xs text-amber-600 mt-0.5">{item.blouse_details}</p>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    </li>
                  )
                })}
              </ul>
              
              <div className="p-4 sm:p-6 border-t border-gray-200">
                <button
                  onClick={clearCart}
                  className="text-sm text-gray-600 hover:text-red-600 transition-colors"
                >
                  Clear Cart
                </button>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-5 mt-6 lg:mt-0">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6 lg:sticky lg:top-8">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Order Summary</h2>
              
              <div className="space-y-3">
                <div className="flex justify-between text-sm sm:text-base">
                  <span className="text-gray-600">Products ({cart.itemCount} items)</span>
                  <span className="font-medium">₹{productSubtotal.toLocaleString()}</span>
                </div>

                {blouseTotal > 0 && (
                  <div className="flex justify-between text-sm sm:text-base">
                    <span className="text-gray-600">Blouse Pieces</span>
                    <span className="font-medium">₹{blouseTotal.toLocaleString()}</span>
                  </div>
                )}

                {/* Pincode input for shipping calculation */}
                <div className="border-t border-gray-200 pt-3">
                  <label className="text-sm font-medium text-gray-700 block mb-2">
                    📍 Enter delivery pincode
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      inputMode="numeric"
                      value={pincode}
                      onChange={(e) => handlePincodeChange(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && handlePincodeCheck()}
                      placeholder="e.g. 680594"
                      maxLength={6}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-primary-500 focus:border-primary-500"
                    />
                    <button
                      onClick={handlePincodeCheck}
                      disabled={!validPincode}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                        validPincode
                          ? 'bg-primary-600 text-white hover:bg-primary-700'
                          : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                      }`}
                    >
                      Check
                    </button>
                  </div>

                  {/* Pincode result */}
                  {pincodeChecked && validPincode && (
                    <div className={`mt-2 p-2 rounded-lg text-xs ${
                      isKerala
                        ? 'bg-green-50 border border-green-200 text-green-700'
                        : 'bg-orange-50 border border-orange-200 text-orange-700'
                    }`}>
                      {isKerala ? (
                        <p>✅ Delivery to <span className="font-semibold">{district || 'Kerala'}</span> — Local rates apply</p>
                      ) : (
                        <p>📦 Delivery outside Kerala — Inter-state rates apply</p>
                      )}
                    </div>
                  )}
                </div>

                {/* Shipping service selector */}
                <div className="border-t border-gray-200 pt-3">
                  <p className="text-sm font-medium text-gray-700 mb-2">📦 Select shipping service</p>
                  <div className="space-y-2">
                    {serviceOptions.map((option) => {
                      const buffered = Math.ceil((option.total * 1.3) / 10) * 10
                      const isSelected = selectedService === option.code
                      return (
                        <label
                          key={option.code}
                          className={`flex items-center justify-between p-2.5 rounded-lg border cursor-pointer transition-colors ${
                            isSelected
                              ? 'border-primary-500 bg-primary-50'
                              : 'border-gray-200 hover:border-gray-300 bg-white'
                          }`}
                        >
                          <div className="flex items-center gap-2">
                            <input
                              type="radio"
                              name="shipping_service"
                              value={option.code}
                              checked={isSelected}
                              onChange={() => setSelectedService(option.code)}
                              className="text-primary-600 focus:ring-primary-500"
                            />
                            <div>
                              <span className={`text-xs font-medium ${isSelected ? 'text-primary-700' : 'text-gray-700'}`}>
                                {option.name}
                              </span>
                              <span className="text-xs text-gray-400 block">{option.deliveryTime}</span>
                            </div>
                          </div>
                          <span className={`text-sm font-semibold ${isSelected ? 'text-primary-700' : 'text-gray-600'}`}>
                            ₹{buffered}
                          </span>
                        </label>
                      )
                    })}
                  </div>
                </div>

                <div className="border-t border-gray-200 pt-3">
                  <div className="flex justify-between">
                    <span className="text-base sm:text-lg font-semibold text-gray-900">Total</span>
                    <span className="text-base sm:text-lg font-bold text-primary-700">₹{grandTotal.toLocaleString()}</span>
                  </div>
                  {pincodeChecked && validPincode ? (
                    <p className="text-xs text-green-600 mt-1">✓ Shipping calculated for pincode {pincode}</p>
                  ) : (
                    <p className="text-xs text-gray-500 mt-1">+ shipping (enter pincode above for exact rate)</p>
                  )}
                </div>
              </div>

              {/* Shipping info note */}
              <div className="mt-4 bg-blue-50 border border-blue-200 rounded-lg p-3">
                <div className="flex items-start gap-2">
                  <span className="text-blue-600 text-sm mt-0.5">📦</span>
                  <div>
                    <p className="text-xs font-medium text-blue-800">{shipping.serviceName} via India Post</p>
                    <p className="text-xs text-blue-600 mt-0.5">
                      {pincodeChecked && validPincode
                        ? `Estimated delivery: ${shipping.deliveryTime}.`
                        : 'Enter your pincode above for accurate shipping rates.'
                      }
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-6 space-y-3">
                <Link
                  href="/checkout"
                  className="w-full bg-primary-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-primary-700 transition-colors text-center block text-sm sm:text-base"
                >
                  Proceed to Checkout
                </Link>
                <Link
                  href="/products"
                  className="w-full bg-white border border-gray-300 text-gray-700 px-6 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors text-center block text-sm sm:text-base"
                >
                  Continue Shopping
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
