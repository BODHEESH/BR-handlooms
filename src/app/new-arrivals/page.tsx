import { Product } from '@/types/product'
import Link from 'next/link'
import AddToCartButton from '@/components/AddToCartButton'

async function getNewArrivals(): Promise<Product[]> {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
    const response = await fetch(`${baseUrl}/api/supabase/products?featured=true&limit=8`, {
      cache: 'no-store'
    })
    
    if (!response.ok) {
      console.error('Failed to fetch new arrivals:', response.statusText)
      return []
    }
    
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
    <div className="bg-white">
      <div className="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <div className="h-px w-16 bg-primary-600"></div>
            <span className="mx-4 text-primary-700 text-2xl">✦</span>
            <div className="h-px w-16 bg-primary-600"></div>
          </div>
          <h1 className="text-4xl font-serif text-gray-900 sm:text-5xl mb-4">
            New Arrivals
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto font-light">
            Fresh from the loom - our latest collection of authentic Kuthampully handwoven textiles, crafted with timeless tradition.
          </p>
        </div>

        {/* Products Grid */}
        <div className="mt-16">
          {products.length === 0 ? (
            <div className="text-center py-16">
              <div className="flex items-center justify-center mb-4">
                <span className="text-6xl">🎨</span>
              </div>
              <h3 className="text-xl font-serif text-gray-900 mb-2">New pieces coming soon</h3>
              <p className="text-gray-600">Stay tuned for our latest handwoven creations.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {products.map((product) => (
                <div key={product._id} className="group relative bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100">
                  <div className="aspect-w-4 aspect-h-3 bg-gray-100 overflow-hidden">
                    {product.images && product.images.length > 0 ? (
                      <img
                        src={product.images[0]}
                        alt={product.name}
                        className="w-full h-full object-center object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-green-100 to-amber-100 flex items-center justify-center">
                        <span className="text-primary-600 text-5xl">🧵</span>
                      </div>
                    )}
                  </div>
                  <div className="p-6">
                    <h3 className="text-lg font-serif text-gray-900 mb-2 group-hover:text-primary-700 transition-colors">
                      <Link href={`/products/${product._id}`}>
                        {product.name}
                      </Link>
                    </h3>
                    <p className="text-sm text-gray-600 mb-1">{product.fabric} • {product.color}</p>
                    <div className="flex items-center justify-between mb-4">
                      <p className="text-xl font-medium text-gray-900">₹{product.price}</p>
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        {parseInt(product.stock) > 0 ? 'In Stock' : 'Out of Stock'}
                      </span>
                    </div>
                    <div className="flex gap-3">
                      <Link
                        href={`/products/${product._id}`}
                        className="flex-1 bg-primary-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-primary-700 transition-colors text-center"
                      >
                        View Details
                      </Link>
                      <AddToCartButton
                        product={{
                          _id: product._id!,
                          name: product.name,
                          price: product.price,
                          image: product.images?.[0] || '/sample-images/ProductSample.jpeg',
                          fabric: product.fabric,
                          color: product.color
                        }}
                      />
                      <a
                        href={`https://wa.me/917907730095?text=Hi, I'm interested in ${product.name} (${product.price})`}
                        className="bg-green-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-green-700 transition-colors inline-flex items-center"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        📱
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
