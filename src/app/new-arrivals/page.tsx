import { Product } from '@/types/product'

async function getNewArrivals(): Promise<Product[]> {
  // Return dummy new arrivals for demonstration
  return [
    {
      _id: '9',
      name: 'Festive Collection Saree',
      fabric: 'Pure Silk',
      color: 'Emerald Green',
      price: '₹6,500',
      stock: 'New Arrival',
      description: 'Stunning festive saree with traditional Kerala embroidery',
      images: ['/sample-images/ProductSample.jpeg'],
      tags: ['festive', 'silk', 'new-arrival'],
      shipping: 'Free shipping across India',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      _id: '10',
      name: 'Modern Kasavu Design',
      fabric: 'Handloom Cotton',
      color: 'White with Modern Border',
      price: '₹4,200',
      stock: 'New Arrival',
      description: 'Contemporary take on traditional kasavu design',
      images: ['/sample-images/ProductSample.jpeg'],
      tags: ['modern', 'kasavu', 'new-arrival'],
      shipping: 'Free shipping across India',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      _id: '11',
      name: 'Designer Set Mundu',
      fabric: 'Premium Cotton',
      color: 'Ivory with Gold',
      price: '₹3,800',
      stock: 'New Arrival',
      description: 'Elegant set mundu with designer patterns',
      images: ['/sample-images/ProductSample.jpeg'],
      tags: ['designer', 'set-mundu', 'new-arrival'],
      shipping: 'Free shipping across India',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      _id: '12',
      name: 'Celebrity Style Mundu',
      fabric: 'Luxury Cotton',
      color: 'Off White',
      price: '₹2,500',
      stock: 'New Arrival',
      description: 'Trending celebrity-inspired mundu design',
      images: ['/sample-images/ProductSample.jpeg'],
      tags: ['celebrity', 'mundu', 'new-arrival'],
      shipping: 'Free shipping across India',
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ]
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
                      <a href={`/products/${product._id}`}>
                        {product.name}
                      </a>
                    </h3>
                    <p className="text-sm text-gray-600 mb-1">{product.fabric} • {product.color}</p>
                    <div className="flex items-center justify-between mb-4">
                      <p className="text-xl font-medium text-gray-900">{product.price}</p>
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        {product.stock}
                      </span>
                    </div>
                    <a
                      href={`https://wa.me/917907730095?text=Hi, I'm interested in ${product.name} (${product.price})`}
                      className="w-full inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 transition-colors"
                    >
                      <span className="mr-2">📱</span> Order Now
                    </a>
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
