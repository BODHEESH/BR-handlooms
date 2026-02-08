'use client'

import { useState, useEffect } from 'react'
import { useCart } from '@/contexts/CartContext'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { estimateShippingCharge, isKeralaPincode, getDistrictForPincode } from '@/utils/shipping'

interface CheckoutFormData {
  firstName: string
  lastName: string
  email: string
  phone: string
  address: string
  city: string
  state: string
  pincode: string
  paymentMethod: 'cod' | 'whatsapp'
}

function safeParsePrice(price: string | number): number {
  if (typeof price === 'number') return price
  return parseFloat(String(price).replace(/[₹,]/g, '')) || 0
}

export default function CheckoutPage() {
  const { cart, clearCart } = useCart()
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState<CheckoutFormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    paymentMethod: 'whatsapp'
  })

  // Calculate shipping based on pincode and cart weight
  const totalWeightGrams = cart.items.reduce((sum, item) => {
    const w = item.weight ? (typeof item.weight === 'number' ? item.weight : parseFloat(String(item.weight)) || 0) : 0
    return sum + (w * 1000 * item.quantity)
  }, 0)

  const validPincode = formData.pincode.length === 6 && /^\d{6}$/.test(formData.pincode)
  const shipping = estimateShippingCharge(totalWeightGrams, validPincode ? formData.pincode : undefined, 'parcel')
  const shippingCost = Math.ceil((shipping.total * 1.3) / 10) * 10
  const isKerala = validPincode ? isKeralaPincode(formData.pincode) : null
  const district = validPincode && isKerala ? getDistrictForPincode(formData.pincode) : null

  // Auto-fill state when Kerala pincode detected
  useEffect(() => {
    if (validPincode && isKerala && !formData.state) {
      setFormData(prev => ({ ...prev, state: 'Kerala' }))
    }
  }, [validPincode, isKerala, formData.state])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // 1. Save order + address to database
      const orderPayload = {
        customer_name: `${formData.firstName} ${formData.lastName}`.trim(),
        email: formData.email,
        phone: formData.phone,
        address: formData.address,
        city: formData.city,
        state: formData.state,
        pincode: formData.pincode,
        payment_method: formData.paymentMethod,
        items: cart.items.map(item => ({
          product_id: item._id,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          fabric: item.fabric,
          color: item.color
        })),
        subtotal: cart.total,
        shipping: shippingCost,
        total_amount: cart.total + shippingCost
      }

      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderPayload)
      })

      const result = await response.json()

      if (!result.success) {
        console.error('Failed to save order:', result.error)
      }

      const orderNumber = result.order?.order_number || 'N/A'

      // 2. Build WhatsApp message
      const orderDetails = cart.items.map((item, index) => 
        `${index + 1}. ${item.name}\n   Fabric: ${item.fabric}\n   Color: ${item.color}\n   Price: ₹${safeParsePrice(item.price)} x ${item.quantity} = ₹${(safeParsePrice(item.price) * item.quantity).toLocaleString()}`
      ).join('\n\n')

      const message = `🛍️ *New Order - BR Handlooms* 🛍️\n*Order #${orderNumber}*\n\n👤 *Customer Details:*\n${formData.firstName} ${formData.lastName}\n📧 ${formData.email}\n📱 ${formData.phone}\n\n🏠 *Shipping Address:*\n${formData.address}\n${formData.city}, ${formData.state} - ${formData.pincode}${district ? ` (${district})` : ''}\n\n📦 *Order Details:*\n${orderDetails}\n\n💰 *Subtotal: ₹${cart.total.toLocaleString()}*\n🚚 *Shipping: ₹${shippingCost.toLocaleString()}* (India Post Parcel)\n💰 *Total: ₹${(cart.total + shippingCost).toLocaleString()}*\n\n💳 *Payment: ${formData.paymentMethod === 'cod' ? 'Cash on Delivery' : 'WhatsApp Order Confirmation'}*\n\nPlease confirm the order and share payment details. Thank you! 🙏`

      // 3. Redirect to WhatsApp
      const whatsappUrl = `https://wa.me/917907730095?text=${encodeURIComponent(message)}`
      window.open(whatsappUrl, '_blank')

      // 4. Clear cart and redirect to success page
      setTimeout(() => {
        clearCart()
        router.push('/checkout/success')
      }, 2000)

    } catch (error) {
      console.error('Error placing order:', error)
      alert('There was an error placing your order. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (cart.items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-2xl sm:text-3xl font-serif text-gray-900 mb-4">Your cart is empty</h1>
            <p className="text-gray-600 mb-6 text-sm sm:text-base">Add some products to your cart before checkout.</p>
            <Link
              href="/products"
              className="inline-flex items-center px-8 py-3 bg-primary-600 text-white font-medium rounded-lg hover:bg-primary-700 transition-colors"
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
        <h1 className="text-2xl sm:text-3xl font-serif text-gray-900 mb-6">Checkout</h1>
        
        <div className="lg:grid lg:grid-cols-12 lg:gap-x-12">
          {/* Checkout Form */}
          <div className="lg:col-span-8">
            <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-6">Shipping Information</h2>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">
                    First Name *
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    required
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  />
                </div>
                
                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-2">
                    Last Name *
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    required
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  />
                </div>
                
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  />
                </div>
              </div>
              
              <div className="mt-6">
                <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-2">
                  Street Address *
                </label>
                <textarea
                  id="address"
                  name="address"
                  required
                  rows={3}
                  value={formData.address}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                />
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-6">
                <div>
                  <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-2">
                    City *
                  </label>
                  <input
                    type="text"
                    id="city"
                    name="city"
                    required
                    value={formData.city}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  />
                </div>
                
                <div>
                  <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-2">
                    State *
                  </label>
                  <input
                    type="text"
                    id="state"
                    name="state"
                    required
                    value={formData.state}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  />
                </div>
                
                <div>
                  <label htmlFor="pincode" className="block text-sm font-medium text-gray-700 mb-2">
                    PIN Code *
                  </label>
                  <input
                    type="text"
                    id="pincode"
                    name="pincode"
                    required
                    value={formData.pincode}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  />
                </div>
              </div>
              
              <div className="mt-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Payment Method *
                </label>
                <div className="space-y-3">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="whatsapp"
                      checked={formData.paymentMethod === 'whatsapp'}
                      onChange={handleInputChange}
                      className="mr-3"
                    />
                    <span className="text-sm text-gray-700">WhatsApp Order Confirmation</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="cod"
                      checked={formData.paymentMethod === 'cod'}
                      onChange={handleInputChange}
                      className="mr-3"
                    />
                    <span className="text-sm text-gray-700">Cash on Delivery (COD)</span>
                  </label>
                </div>
              </div>
              
              <div className="mt-8">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-primary-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-primary-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Processing...' : 'Place Order'}
                </button>
              </div>
            </form>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-4 mt-6 lg:mt-0">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6 lg:sticky lg:top-8">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Order Summary</h2>
              
              <div className="space-y-4 mb-6">
                {cart.items.map((item) => (
                  <div key={item._id} className="flex items-center space-x-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <h4 className="text-sm font-medium text-gray-900 line-clamp-1">{item.name}</h4>
                      <p className="text-xs text-gray-600">{item.fabric} • Qty: {item.quantity}</p>
                    </div>
                    <span className="text-sm font-medium text-gray-900">
                      ₹{(safeParsePrice(item.price) * item.quantity).toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>
              
              <div className="border-t border-gray-200 pt-4 space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium">₹{cart.total.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping (India Post)</span>
                  <span className="font-medium">₹{shippingCost.toLocaleString()}</span>
                </div>
                {validPincode && (
                  <p className="text-xs text-gray-500">
                    {isKerala
                      ? `📍 Delivering to ${district || 'Kerala'} — Local rates`
                      : '📍 Inter-state delivery rates applied'
                    }
                  </p>
                )}
                <div className="border-t border-gray-200 pt-4">
                  <div className="flex justify-between">
                    <span className="text-lg font-semibold text-gray-900">Total</span>
                    <span className="text-lg font-bold text-primary-700">₹{(cart.total + shippingCost).toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
