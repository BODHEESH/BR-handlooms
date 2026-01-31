import { Product } from '@/types/product'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import ProductGallery from '@/components/ProductGallery'

async function getProduct(id: string): Promise<Product | null> {
  // Return dummy products for demonstration
  const dummyProducts = [
    {
      _id: '1',
      name: 'Traditional Kuthampully Kasavu Saree',
      fabric: 'Pure Cotton',
      color: 'White with Gold Border',
      price: '₹3,500',
      stock: 'In Stock',
      description: 'Authentic Kuthampully handloom kasavu saree with traditional gold border',
      images: ['/sample-images/ProductSample.jpeg', '/sample-images/ProductSample2.jpeg', '/sample-images/ProductSample3.jpeg', '/sample-images/ProductSample4.jpeg'],
      tags: ['traditional', 'kasavu', 'cotton'],
      shipping: 'Free shipping across India',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      _id: '2',
      name: 'Kerala Mundu Set',
      fabric: 'Handloom Cotton',
      color: 'Off White',
      price: '₹1,200',
      stock: 'In Stock',
      description: 'Traditional Kerala mundu set for men, handwoven with care',
      images: ['/sample-images/ProductSample.jpeg', '/sample-images/ProductSample2.jpeg', '/sample-images/ProductSample3.jpeg', '/sample-images/ProductSample4.jpeg'],
      tags: ['mundu', 'traditional', 'cotton'],
      shipping: 'Free shipping across India',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      _id: '3',
      name: 'Designer Handloom Saree',
      fabric: 'Silk Blend',
      color: 'Maroon with Gold',
      price: '₹5,800',
      stock: 'Limited Stock',
      description: 'Elegant designer saree with traditional Kerala motifs',
      images: ['/sample-images/ProductSample.jpeg', '/sample-images/ProductSample2.jpeg', '/sample-images/ProductSample3.jpeg', '/sample-images/ProductSample4.jpeg'],
      tags: ['designer', 'silk', 'traditional'],
      shipping: 'Free shipping across India',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      _id: '4',
      name: 'Kuthampully Set Mundu',
      fabric: 'Pure Cotton',
      color: 'Cream with Border',
      price: '₹2,100',
      stock: 'In Stock',
      description: 'Traditional set mundu perfect for special occasions',
      images: ['/sample-images/ProductSample.jpeg', '/sample-images/ProductSample2.jpeg', '/sample-images/ProductSample3.jpeg', '/sample-images/ProductSample4.jpeg'],
      tags: ['set-mundu', 'traditional', 'cotton'],
      shipping: 'Free shipping across India',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      _id: '5',
      name: 'Celebrity Inspired Saree',
      fabric: 'Premium Silk',
      color: 'Royal Blue',
      price: '₹8,500',
      stock: 'Limited Stock',
      description: 'Trending design inspired by celebrity styles',
      images: ['/sample-images/ProductSample.jpeg', '/sample-images/ProductSample2.jpeg', '/sample-images/ProductSample3.jpeg', '/sample-images/ProductSample4.jpeg'],
      tags: ['celebrity', 'silk', 'designer'],
      shipping: 'Free shipping across India',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      _id: '6',
      name: 'Traditional Dhoti',
      fabric: 'Handloom Cotton',
      color: 'White',
      price: '₹800',
      stock: 'In Stock',
      description: 'Comfortable traditional dhoti for daily wear',
      images: ['/sample-images/ProductSample.jpeg', '/sample-images/ProductSample2.jpeg', '/sample-images/ProductSample3.jpeg', '/sample-images/ProductSample4.jpeg'],
      tags: ['dhoti', 'traditional', 'cotton'],
      shipping: 'Free shipping across India',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      _id: '7',
      name: 'Bridal Collection Saree',
      fabric: 'Pure Silk',
      color: 'Red with Gold',
      price: '₹12,000',
      stock: 'Limited Stock',
      description: 'Exquisite bridal saree with intricate traditional work',
      images: ['/sample-images/ProductSample.jpeg', '/sample-images/ProductSample2.jpeg', '/sample-images/ProductSample3.jpeg', '/sample-images/ProductSample4.jpeg'],
      tags: ['bridal', 'silk', 'luxury'],
      shipping: 'Free shipping across India',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      _id: '8',
      name: 'Casual Cotton Saree',
      fabric: 'Soft Cotton',
      color: 'Light Green',
      price: '₹1,800',
      stock: 'In Stock',
      description: 'Light and comfortable saree perfect for daily wear',
      images: ['/sample-images/ProductSample.jpeg', '/sample-images/ProductSample2.jpeg', '/sample-images/ProductSample3.jpeg', '/sample-images/ProductSample4.jpeg'],
      tags: ['casual', 'cotton', 'daily-wear'],
      shipping: 'Free shipping across India',
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ]

  return dummyProducts.find((p: Product) => p._id === id) || null
}

export default async function ProductDetailPage({
  params,
}: {
  params: { id: string }
}) {
  const product = await getProduct(params.id)

  if (!product) {
    notFound()
  }

  return (
    <div className="bg-gradient-to-b from-white to-amber-50">
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <nav className="flex items-center text-sm">
          <Link href="/" className="text-gray-600 hover:text-primary-700 transition-colors">Home</Link>
          <span className="mx-2 text-gray-400">/</span>
          <Link href="/products" className="text-gray-600 hover:text-primary-700 transition-colors">Products</Link>
          <span className="mx-2 text-gray-400">/</span>
          <span className="text-gray-900 font-medium">{product.name}</span>
        </nav>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        <div className="lg:grid lg:grid-cols-2 lg:gap-x-16 lg:items-start lg:py-8">
          {/* Image Gallery */}
          <div className="w-full lg:sticky lg:top-8 lg:h-fit">
            <ProductGallery images={product.images || ['/sample-images/ProductSample.jpeg']} />
            
            {/* Trust badges */}
            <div className="mt-8 grid grid-cols-3 gap-4">
              <div className="text-center p-4 bg-white rounded-lg shadow-sm border border-gray-100">
                <div className="text-2xl mb-2">✓</div>
                <p className="text-xs text-gray-600 font-medium">100% Genuine</p>
              </div>
              <div className="text-center p-4 bg-white rounded-lg shadow-sm border border-gray-100">
                <div className="text-2xl mb-2">🚚</div>
                <p className="text-xs text-gray-600 font-medium">Fast Delivery</p>
              </div>
              <div className="text-center p-4 bg-white rounded-lg shadow-sm border border-gray-100">
                <div className="text-2xl mb-2">↩️</div>
                <p className="text-xs text-gray-600 font-medium">Easy Returns</p>
              </div>
            </div>
          </div>

          {/* Product info */}
          <div className="mt-8 lg:mt-0 lg:pl-4">
            <div className="bg-white rounded-xl shadow-lg p-6 lg:p-8 border border-gray-100">
              {/* Title */}
              <div className="border-b border-gray-100 pb-6">
                <h1 className="text-3xl lg:text-4xl font-serif text-gray-900 mb-3 leading-tight">
                  {product.name}
                </h1>
                <div className="flex items-center justify-center mb-4">
                  <div className="h-px w-16 bg-primary-600"></div>
                  <span className="mx-4 text-primary-700 text-xl">✦</span>
                  <div className="h-px w-16 bg-primary-600"></div>
                </div>
              </div>

              {/* Price and Stock */}
              <div className="py-6 border-b border-gray-100">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div>
                    <p className="text-sm text-gray-600 font-medium mb-1">Price</p>
                    <p className="text-4xl lg:text-5xl font-serif text-primary-700">{product.price}</p>
                  </div>
                  <div className="sm:text-right">
                    <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-green-100 text-green-800 border border-green-200">
                      ✓ {product.stock}
                    </span>
                  </div>
                </div>
              </div>

              {/* Product Details */}
              <div className="py-6 border-b border-gray-100">
                <h3 className="text-lg font-serif text-gray-900 mb-4">Product Details</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex items-start">
                    <span className="text-primary-600 mr-3 mt-1">•</span>
                    <div className="flex-1">
                      <span className="font-medium text-gray-900 block">Fabric</span>
                      <span className="text-gray-700">{product.fabric}</span>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <span className="text-primary-600 mr-3 mt-1">•</span>
                    <div className="flex-1">
                      <span className="font-medium text-gray-900 block">Color</span>
                      <span className="text-gray-700">{product.color}</span>
                    </div>
                  </div>
                  <div className="flex items-start sm:col-span-2">
                    <span className="text-primary-600 mr-3 mt-1">•</span>
                    <div className="flex-1">
                      <span className="font-medium text-gray-900 block">Shipping</span>
                      <span className="text-gray-700">{product.shipping}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Description */}
              {product.description && (
                <div className="py-6 border-b border-gray-100">
                  <h3 className="text-lg font-serif text-gray-900 mb-3">Description</h3>
                  <p className="text-gray-700 leading-relaxed text-base">{product.description}</p>
                </div>
              )}

              {/* Tags */}
              {product.tags && product.tags.length > 0 && (
                <div className="py-6 border-b border-gray-100">
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
              <div className="pt-8 space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <button
                    type="button"
                    className="bg-primary-600 border border-transparent rounded-lg py-4 px-6 flex items-center justify-center text-base font-medium text-white hover:bg-primary-700 transition-all shadow-md hover:shadow-lg"
                  >
                    <span className="mr-2 text-xl">🛒</span> Add to Cart
                  </button>
                  <a
                    href={`https://wa.me/917907730095?text=Hi, I'm interested in ${product.name} (${product.price}). Fabric: ${product.fabric}, Color: ${product.color}`}
                    className="bg-green-600 border border-transparent rounded-lg py-4 px-6 flex items-center justify-center text-base font-medium text-white hover:bg-green-700 transition-all shadow-md hover:shadow-lg"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span className="mr-2 text-xl">📱</span> Place Order
                  </a>
                </div>
                <button
                  type="button"
                  className="w-full bg-white border-2 border-primary-600 rounded-lg py-4 px-6 flex items-center justify-center text-base font-medium text-primary-700 hover:bg-primary-50 transition-all"
                >
                  <span className="mr-2 text-xl">❤️</span> Add to Wishlist
                </button>
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
                  <span>Free shipping across India</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
