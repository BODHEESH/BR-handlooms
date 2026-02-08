import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Return Policy - BR Handlooms | Kuthampully Handwoven Textiles',
  description: 'Read our return and exchange policy for BR Handlooms products. We ensure customer satisfaction with our authentic Kuthampully handloom textiles.',
}

export default function ReturnPolicyPage() {
  return (
    <div className="bg-white min-h-screen">
      {/* Hero */}
      <div className="bg-gradient-to-r from-primary-700 to-primary-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 text-center">
          <h1 className="text-3xl sm:text-4xl font-serif mb-3">Return &amp; Exchange Policy</h1>
          <p className="text-base sm:text-lg text-green-50 max-w-xl mx-auto">
            Your satisfaction is our priority. Please read our policy carefully before placing an order.
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
        <div className="space-y-8 sm:space-y-10">

          {/* Important Note */}
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-5 sm:p-6">
            <h2 className="text-lg font-semibold text-amber-800 mb-2 flex items-center gap-2">
              <span>⚠️</span> Important Note
            </h2>
            <p className="text-sm text-amber-700 leading-relaxed">
              Since all our products are <strong>handwoven</strong>, minor variations in texture, color shade, and weave pattern are natural characteristics of handloom textiles and are not considered defects. These variations are what make each piece unique and authentic.
            </p>
          </div>

          {/* Return Eligibility */}
          <section>
            <h2 className="text-xl sm:text-2xl font-serif text-gray-900 mb-4">Return Eligibility</h2>
            <div className="space-y-3 text-gray-700 text-sm sm:text-base leading-relaxed">
              <p>We accept returns only in the following cases:</p>
              <ul className="space-y-2 ml-4">
                <li className="flex items-start gap-2">
                  <span className="text-primary-600 mt-0.5">•</span>
                  <span><strong>Damaged product:</strong> If the product is damaged during transit or has a manufacturing defect.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary-600 mt-0.5">•</span>
                  <span><strong>Wrong product:</strong> If you received a different product than what you ordered.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary-600 mt-0.5">•</span>
                  <span><strong>Quality issue:</strong> If the product has a significant quality defect that was not visible in the product images.</span>
                </li>
              </ul>
            </div>
          </section>

          {/* Return Process */}
          <section>
            <h2 className="text-xl sm:text-2xl font-serif text-gray-900 mb-4">How to Request a Return</h2>
            <div className="space-y-4">
              <div className="flex gap-4 items-start">
                <span className="flex-shrink-0 w-8 h-8 bg-primary-100 text-primary-700 rounded-full flex items-center justify-center text-sm font-bold">1</span>
                <div>
                  <h3 className="font-medium text-gray-900">Contact us within 48 hours</h3>
                  <p className="text-sm text-gray-600 mt-1">Reach out to us via WhatsApp within 48 hours of receiving the product with photos/videos of the issue.</p>
                </div>
              </div>
              <div className="flex gap-4 items-start">
                <span className="flex-shrink-0 w-8 h-8 bg-primary-100 text-primary-700 rounded-full flex items-center justify-center text-sm font-bold">2</span>
                <div>
                  <h3 className="font-medium text-gray-900">Share unboxing video</h3>
                  <p className="text-sm text-gray-600 mt-1">We recommend recording an unboxing video when you receive the parcel. This helps us process your claim faster.</p>
                </div>
              </div>
              <div className="flex gap-4 items-start">
                <span className="flex-shrink-0 w-8 h-8 bg-primary-100 text-primary-700 rounded-full flex items-center justify-center text-sm font-bold">3</span>
                <div>
                  <h3 className="font-medium text-gray-900">We review &amp; respond</h3>
                  <p className="text-sm text-gray-600 mt-1">Our team will review your request and respond within 24 hours with the next steps.</p>
                </div>
              </div>
              <div className="flex gap-4 items-start">
                <span className="flex-shrink-0 w-8 h-8 bg-primary-100 text-primary-700 rounded-full flex items-center justify-center text-sm font-bold">4</span>
                <div>
                  <h3 className="font-medium text-gray-900">Return or exchange</h3>
                  <p className="text-sm text-gray-600 mt-1">Once approved, we will arrange for a replacement or refund as per your preference.</p>
                </div>
              </div>
            </div>
          </section>

          {/* Non-Returnable */}
          <section>
            <h2 className="text-xl sm:text-2xl font-serif text-gray-900 mb-4">Non-Returnable Items</h2>
            <div className="bg-red-50 border border-red-100 rounded-xl p-5 sm:p-6">
              <ul className="space-y-2 text-sm text-red-700">
                <li className="flex items-start gap-2">
                  <span className="mt-0.5">✕</span>
                  <span>Products that have been used, washed, or altered</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-0.5">✕</span>
                  <span>Products returned after 48 hours of delivery without prior communication</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-0.5">✕</span>
                  <span>Minor color variations due to screen display differences</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-0.5">✕</span>
                  <span>Natural handloom characteristics (slight texture variations, minor thread irregularities)</span>
                </li>
              </ul>
            </div>
          </section>

          {/* Refund */}
          <section>
            <h2 className="text-xl sm:text-2xl font-serif text-gray-900 mb-4">Refund Policy</h2>
            <div className="text-gray-700 text-sm sm:text-base leading-relaxed space-y-3">
              <p>Once your return is approved and the product is received back:</p>
              <ul className="space-y-2 ml-4">
                <li className="flex items-start gap-2">
                  <span className="text-primary-600 mt-0.5">•</span>
                  <span>Refunds will be processed within <strong>5-7 business days</strong></span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary-600 mt-0.5">•</span>
                  <span>Refund will be credited to the original payment method or via bank transfer</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary-600 mt-0.5">•</span>
                  <span>Shipping charges are non-refundable unless the return is due to our error</span>
                </li>
              </ul>
            </div>
          </section>

          {/* Exchange */}
          <section>
            <h2 className="text-xl sm:text-2xl font-serif text-gray-900 mb-4">Exchange Policy</h2>
            <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
              We offer exchanges for eligible returns. If you&apos;d like a different product, we&apos;ll help you choose an alternative from our collection. Any price difference will be adjusted accordingly.
            </p>
          </section>

          {/* Contact */}
          <section className="bg-gradient-to-r from-primary-50 to-amber-50 rounded-xl p-6 sm:p-8 border border-primary-100 text-center">
            <h2 className="text-xl font-serif text-gray-900 mb-3">Need Help?</h2>
            <p className="text-gray-600 text-sm mb-4">
              For any questions about returns, exchanges, or your order, reach out to us on WhatsApp. We&apos;re here to help!
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href="https://wa.me/917907730095?text=Hi, I need help with a return/exchange"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors text-center text-sm"
              >
                📱 Contact on WhatsApp
              </a>
              <Link
                href="/products"
                className="px-6 py-3 border-2 border-primary-600 text-primary-700 rounded-lg font-medium hover:bg-primary-50 transition-colors text-center text-sm"
              >
                Continue Shopping
              </Link>
            </div>
          </section>

        </div>
      </div>
    </div>
  )
}
