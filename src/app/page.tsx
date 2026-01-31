import Link from 'next/link'

export default function Home() {
  return (
    <div className="bg-white">
      {/* Hero Section - Traditional Kerala Style */}
      <div className="relative bg-gradient-to-br from-amber-50 via-white to-green-50">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:py-20 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="mb-4">
              <span className="text-primary-700 text-sm font-medium tracking-widest uppercase">Kerala's Pride</span>
            </div>
            <h1 className="text-4xl font-serif text-gray-900 sm:text-5xl md:text-6xl mb-4">
              Kuthampully Handlooms
            </h1>
            <div className="flex items-center justify-center mb-6">
              <div className="h-px w-16 bg-primary-600"></div>
              <span className="mx-4 text-primary-700 text-2xl">✦</span>
              <div className="h-px w-16 bg-primary-600"></div>
            </div>
            <p className="mt-3 max-w-2xl mx-auto text-base text-gray-600 sm:text-lg md:mt-5 md:text-xl font-light">
              Authentic handwoven textiles from the heart of Kerala. Each piece tells a story of tradition, craftsmanship, and timeless elegance.
            </p>
            <div className="mt-8 max-w-md mx-auto sm:flex sm:justify-center md:mt-10">
              <div className="rounded-md">
                <Link
                  href="/products"
                  className="w-full flex items-center justify-center px-8 py-3 border-2 border-primary-600 text-base font-medium rounded-md text-primary-700 bg-white hover:bg-primary-50 transition-all md:py-3 md:text-lg md:px-10"
                >
                  Explore Collection
                </Link>
              </div>
              <div className="mt-3 rounded-md sm:mt-0 sm:ml-4">
                <Link
                  href="/new-arrivals"
                  className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 transition-all md:py-3 md:text-lg md:px-10"
                >
                  New Arrivals
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Category Showcase */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {/* Women's Collection */}
            <Link href="/women-collection"
             className="group relative overflow-hidden rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300">
              <div className="h-[600px] relative bg-gray-100">
                <img
                  // src="/sample-images/Women's Collection.jpeg"
                   src="/sample-images/Women's Collection5.jpeg"
                  alt="Women's Collection"
                  className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
              </div>
              <div className="absolute inset-0 flex items-end">
                <div className="p-8 text-white w-full">
                  <h3 className="text-3xl font-serif mb-3">Women's Collection</h3>
                  <p className="text-base text-gray-100">Elegant sarees & traditional wear</p>
                </div>
              </div>
            </Link>

            {/* Men's Wear */}
            <Link href="/men-wear" className="group relative overflow-hidden rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300">
              <div className="h-[600px] relative bg-gray-100">
                <img
                  src="/sample-images/Mens collections.png"
                  alt="Men's Wear"
                  className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
              </div>
              <div className="absolute inset-0 flex items-end">
                <div className="p-8 text-white w-full">
                  <h3 className="text-3xl font-serif mb-3">Men's Wear</h3>
                  <p className="text-base text-gray-100">Dhotis, mundus & traditional attire</p>
                </div>
              </div>
            </Link>

            {/* Celebrity Inspired */}
            <Link href="/celebrity-inspired" className="group relative overflow-hidden rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300">
              <div className="h-[600px] relative bg-gray-100">
                <img
                  // src="/sample-images/sara-arjun1.jpg"
                  src="/sample-images/sara-arjun.jpg"
                  // src="/sample-images/sara-arjun.WEBP"
                  alt="Celebrity Inspired"
                  className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
              </div>
              <div className="absolute inset-0 flex items-end">
                <div className="p-8 text-white w-full">
                  <h3 className="text-3xl font-serif mb-3">Celebrity Inspired</h3>
                  <p className="text-base text-gray-100">Trending styles & designer pieces</p>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>

      {/* Features Section - Traditional Style */}
      <div className="py-16 bg-gradient-to-b from-white to-amber-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-4">
              <div className="h-px w-12 bg-primary-600"></div>
              <span className="mx-3 text-primary-700">✦</span>
              <div className="h-px w-12 bg-primary-600"></div>
            </div>
            <h2 className="text-3xl font-serif text-gray-900 sm:text-4xl mb-3">
              The Kuthampully Legacy
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Preserving centuries-old weaving traditions with every thread
            </p>
          </div>

          <div className="mt-10">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
              <div className="text-center p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <div className="mx-auto h-16 w-16 flex items-center justify-center rounded-full bg-green-100 text-primary-700 text-3xl mb-4">
                  🧵
                </div>
                <h3 className="text-xl font-serif text-gray-900 mb-3">Handwoven Excellence</h3>
                <p className="text-gray-600 leading-relaxed">
                  Each piece is meticulously crafted by master weavers using time-honored Kuthampully techniques passed down through generations.
                </p>
              </div>

              <div className="text-center p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <div className="mx-auto h-16 w-16 flex items-center justify-center rounded-full bg-amber-100 text-amber-700 text-3xl mb-4">
                  🎨
                </div>
                <h3 className="text-xl font-serif text-gray-900 mb-3">Authentic Designs</h3>
                <p className="text-gray-600 leading-relaxed">
                  Traditional Kerala patterns and motifs that celebrate our rich cultural heritage and artistic legacy.
                </p>
              </div>

              <div className="text-center p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <div className="mx-auto h-16 w-16 flex items-center justify-center rounded-full bg-green-100 text-primary-700 text-3xl mb-4">
                  ✨
                </div>
                <h3 className="text-xl font-serif text-gray-900 mb-3">Premium Quality</h3>
                <p className="text-gray-600 leading-relaxed">
                  Finest natural fibers and traditional dyeing methods ensure durability, comfort, and timeless beauty.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section - Traditional Style */}
      <div className="relative bg-gradient-to-r from-primary-700 via-primary-600 to-primary-700 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(255,255,255,.05) 10px, rgba(255,255,255,.05) 20px)'}}>
          </div>
        </div>
        <div className="relative max-w-4xl mx-auto text-center py-16 px-4 sm:py-20 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center mb-6">
            <div className="h-px w-16 bg-white/50"></div>
            <span className="mx-4 text-white text-2xl">✦</span>
            <div className="h-px w-16 bg-white/50"></div>
          </div>
          <h2 className="text-3xl font-serif text-white sm:text-4xl mb-4">
            Experience Timeless Elegance
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-green-50 max-w-2xl mx-auto">
            Connect with our artisans and discover the perfect handwoven piece that tells your story. Each creation is a masterpiece waiting to be yours.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://wa.me/917907730095"
              className="inline-flex items-center justify-center px-8 py-3 border-2 border-white text-base font-medium rounded-md text-white bg-transparent hover:bg-white hover:text-primary-700 transition-all"
            >
              <span className="mr-2">📱</span> WhatsApp Order
            </a>
            <Link
              href="/products"
              className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-primary-700 bg-white hover:bg-green-50 transition-all"
            >
              View Collection
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
