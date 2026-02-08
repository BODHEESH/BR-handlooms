import { Product } from '@/types/product'
import Link from 'next/link'
import AddToCartButton from '@/components/AddToCartButton'

function safePrice(price: string | number): number {
  if (typeof price === 'number') return price
  return parseFloat(String(price).replace(/[₹,]/g, '')) || 0
}

async function getNewArrivals(): Promise<Product[]> {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
    const response = await fetch(`${baseUrl}/api/supabase/products?featured=true&limit=20`, {
      cache: 'no-store'
    })
    if (!response.ok) return []
    const data = await response.json()
    return data.success ? data.products : []
  } catch (error) {
    console.error('Error fetching new arrivals:', error)
    return []
  }
}

export default async function NewArrivalsPage() {
  const products = await getNewArrivals()

  return (
    <div className="bg-gradient-to-b from-white to-amber-50 min-h-screen">
      <div className="max-w-7xl mx-auto py-10 sm:py-16 px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 sm:mb-12">
          <div className="flex items-center justify-center mb-3">
            <div className="h-px w-10 sm:w-16 bg-primary-600"></div>
            <span className="mx-3 sm:mx-4 text-primary-700 text-xl sm:text-2xl">✦</span>
            <div className="h-px w-10 sm:w-16 bg-primary-600"></div>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-gray-900 mb-3">
            New Arrivals
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto text-sm sm:text-base font-light">
            Fresh from the loom - our latest collection of authentic Kuthampully handwoven textiles, crafted with timeless tradition.
          </p>
        </div>

        {products.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🎨</div>
            <h3 className="text-xl font-serif text-gray-900 mb-2">New pieces coming soon</h3>
            <p className="text-gray-600 text-sm sm:text-base">Stay tuned for our latest handwoven creations.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
            {products.map((product) => (
              <div key={product._id} className="group">
                <div className="relative bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden">
                  <Link href={`/products/${product._id}`}>
                    <div className="relative bg-gray-100 overflow-hidden" style={{ paddingBottom: '120%' }}>
                      {product.images && product.images.length > 0 ? (
                        <img
                          src={product.images[0]}
                          alt={product.name}
                          className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      ) : (
                        <div className="absolute inset-0 bg-gradient-to-br from-green-100 to-amber-100 flex items-center justify-center">
                          <span className="text-primary-600 text-5xl">🧵</span>
                        </div>
                      )}
                      {/* Badges */}
                      <div className="absolute top-2 left-2 flex flex-col gap-1">
                        {product.compare_at_price && safePrice(product.compare_at_price) > safePrice(product.price) && (
                          <span className="bg-red-500 text-white text-[10px] sm:text-xs font-bold px-1.5 py-0.5 rounded">
                            {Math.round(((safePrice(product.compare_at_price) - safePrice(product.price)) / safePrice(product.compare_at_price)) * 100)}% OFF
                          </span>
                        )}
                        {product.featured && (
                          <span className="bg-amber-500 text-white text-[10px] sm:text-xs font-bold px-1.5 py-0.5 rounded">⭐ Bestseller</span>
                        )}
                        <span className="bg-blue-500 text-white text-[10px] sm:text-xs font-bold px-1.5 py-0.5 rounded">🆕 New</span>
                      </div>
                    </div>
                  </Link>
                  <div className="p-3 sm:p-4">
                    <Link href={`/products/${product._id}`}>
                      <h3 className="text-sm sm:text-base font-medium text-gray-900 mb-1 line-clamp-2 hover:text-primary-700 transition-colors">
                        {product.name}
                      </h3>
                    </Link>
                    <p className="text-xs text-gray-500 mb-2 line-clamp-1">{product.fabric} • {product.color}</p>
                    <div className="flex items-center flex-wrap gap-1 mb-3">
                      <p className="text-lg sm:text-xl font-bold text-primary-700">₹{safePrice(product.price).toLocaleString()}</p>
                      {product.compare_at_price && safePrice(product.compare_at_price) > safePrice(product.price) && (
                        <p className="text-xs sm:text-sm text-gray-400 line-through">₹{safePrice(product.compare_at_price).toLocaleString()}</p>
                      )}
                    </div>
                    <AddToCartButton
                      product={{
                        _id: product._id!,
                        name: product.name,
                        price: String(product.price),
                        image: product.images?.[0] || '/sample-images/ProductSample.jpeg',
                        fabric: product.fabric,
                        color: product.color
                      }}
                      className="w-full py-2 px-3 rounded-md text-xs sm:text-sm font-medium bg-primary-600 text-white hover:bg-primary-700 transition-colors text-center"
                      showLabel={true}
                    />
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
