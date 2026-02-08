import Link from 'next/link'

export default function Home() {
  return (
    <div className="bg-white">
      {/* Hero Section - Visual with Product Images */}
      <div className="relative bg-gradient-to-br from-amber-50 via-white to-green-50 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-12 items-center py-8 sm:py-16 lg:py-20">
            {/* Left - Text Content */}
            <div className="text-center lg:text-left order-2 lg:order-1">
              <span className="text-primary-700 text-xs sm:text-sm font-medium tracking-widest uppercase">Kerala&apos;s Pride</span>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif text-gray-900 mt-3 mb-4 leading-tight">
                Kuthampully Handlooms
              </h1>
              <div className="flex items-center justify-center lg:justify-start mb-4">
                <div className="h-px w-12 bg-primary-600"></div>
                <span className="mx-3 text-primary-700 text-xl">✦</span>
                <div className="h-px w-12 bg-primary-600"></div>
              </div>
              <p className="text-sm sm:text-base md:text-lg text-gray-600 font-light max-w-lg mx-auto lg:mx-0">
                Authentic handwoven textiles from the heart of Kerala. Each piece tells a story of tradition, craftsmanship, and timeless elegance.
              </p>
              <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
                <Link
                  href="/products"
                  className="px-6 sm:px-8 py-3 border-2 border-primary-600 text-sm sm:text-base font-medium rounded-lg text-primary-700 bg-white hover:bg-primary-50 transition-all text-center"
                >
                  Explore Collection
                </Link>
                <Link
                  href="/new-arrivals"
                  className="px-6 sm:px-8 py-3 text-sm sm:text-base font-medium rounded-lg text-white bg-primary-600 hover:bg-primary-700 transition-all text-center"
                >
                  New Arrivals
                </Link>
              </div>
              {/* Trust strip */}
              <div className="mt-6 sm:mt-8 flex items-center justify-center lg:justify-start gap-4 sm:gap-6 text-xs text-gray-500">
                <span className="flex items-center gap-1"><span className="text-green-600">✓</span> 100% Handwoven</span>
                <span className="flex items-center gap-1"><span className="text-green-600">✓</span> GI Tagged</span>
                <span className="flex items-center gap-1"><span className="text-green-600">✓</span> Direct from Weavers</span>
              </div>
            </div>
            {/* Right - Product Image Grid */}
            <div className="order-1 lg:order-2">
              <div className="grid grid-cols-2 gap-2 sm:gap-3">
                <div className="space-y-2 sm:space-y-3">
                  <Link href="/women-collection" className="block rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
                    <img
                      src="/sample-images/Women's Collection5.jpeg"
                      alt="Women's Saree Collection"
                      className="w-full h-36 sm:h-48 lg:h-56 object-cover hover:scale-105 transition-transform duration-500"
                    />
                  </Link>
                  <Link href="/celebrity-inspired" className="block rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
                    <img
                      src="/sample-images/sara-arjun.jpg"
                      alt="Celebrity Inspired"
                      className="w-full h-28 sm:h-36 lg:h-44 object-cover hover:scale-105 transition-transform duration-500"
                    />
                  </Link>
                </div>
                <div className="space-y-2 sm:space-y-3 pt-4 sm:pt-6">
                  <Link href="/men-wear" className="block rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
                    <img
                      src="/sample-images/Mens collections.png"
                      alt="Men's Wear Collection"
                      className="w-full h-28 sm:h-36 lg:h-44 object-cover hover:scale-105 transition-transform duration-500"
                    />
                  </Link>
                  <Link href="/products" className="block rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow relative">
                    <img
                      src="/sample-images/Women's Collection5.jpeg"
                      alt="All Products"
                      className="w-full h-36 sm:h-48 lg:h-56 object-cover hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                      <span className="text-white text-sm sm:text-base font-medium bg-primary-600/90 px-4 py-2 rounded-full">View All</span>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Category Showcase */}
      <div className="py-10 sm:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-4 sm:gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {/* Women's Collection */}
            <Link href="/women-collection"
             className="group relative overflow-hidden rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300">
              <div className="h-[300px] sm:h-[400px] lg:h-[500px] relative bg-gray-100">
                <img
                  src="/sample-images/Women's Collection5.jpeg"
                  alt="Women's Collection"
                  className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
              </div>
              <div className="absolute inset-0 flex items-end">
                <div className="p-4 sm:p-8 text-white w-full">
                  <h3 className="text-xl sm:text-3xl font-serif mb-1 sm:mb-3">Women&apos;s Collection</h3>
                  <p className="text-sm sm:text-base text-gray-100">Elegant sarees & traditional wear</p>
                </div>
              </div>
            </Link>

            {/* Men's Wear */}
            <Link href="/men-wear" className="group relative overflow-hidden rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300">
              <div className="h-[300px] sm:h-[400px] lg:h-[500px] relative bg-gray-100">
                <img
                  src="/sample-images/Mens collections.png"
                  alt="Men's Wear"
                  className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
              </div>
              <div className="absolute inset-0 flex items-end">
                <div className="p-4 sm:p-8 text-white w-full">
                  <h3 className="text-xl sm:text-3xl font-serif mb-1 sm:mb-3">Men&apos;s Wear</h3>
                  <p className="text-sm sm:text-base text-gray-100">Dhotis, mundus & traditional attire</p>
                </div>
              </div>
            </Link>

            {/* Celebrity Inspired */}
            <Link href="/celebrity-inspired" className="group relative overflow-hidden rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300">
              <div className="h-[300px] sm:h-[400px] lg:h-[500px] relative bg-gray-100">
                <img
                  src="/sample-images/sara-arjun.jpg"
                  alt="Celebrity Inspired"
                  className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
              </div>
              <div className="absolute inset-0 flex items-end">
                <div className="p-4 sm:p-8 text-white w-full">
                  <h3 className="text-xl sm:text-3xl font-serif mb-1 sm:mb-3">Celebrity Inspired</h3>
                  <p className="text-sm sm:text-base text-gray-100">Trending styles & designer pieces</p>
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

      {/* Customer Testimonials */}
      <div className="py-12 sm:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12">
            <div className="flex items-center justify-center mb-4">
              <div className="h-px w-12 bg-primary-600"></div>
              <span className="mx-3 text-primary-700">✦</span>
              <div className="h-px w-12 bg-primary-600"></div>
            </div>
            <h2 className="text-2xl sm:text-3xl font-serif text-gray-900 mb-3">
              What Our Customers Say
            </h2>
            <p className="text-gray-600 max-w-xl mx-auto text-sm sm:text-base">
              Trusted by thousands of customers across India
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            <div className="bg-gradient-to-br from-amber-50 to-white rounded-xl p-5 sm:p-6 border border-amber-100 shadow-sm">
              <div className="flex items-center gap-1 mb-3">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-amber-400 text-sm">★</span>
                ))}
              </div>
              <p className="text-gray-700 text-sm leading-relaxed mb-4">
                &quot;The kasavu saree I ordered is absolutely stunning! The quality of the handweaving is visible in every thread. My mother was so happy when she received it as a gift. Truly authentic Kuthampully craftsmanship.&quot;
              </p>
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-primary-100 flex items-center justify-center text-primary-700 font-semibold text-sm">A</div>
                <div>
                  <p className="text-sm font-medium text-gray-900">Anjali Menon</p>
                  <p className="text-xs text-gray-500">Kochi, Kerala</p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-white rounded-xl p-5 sm:p-6 border border-green-100 shadow-sm">
              <div className="flex items-center gap-1 mb-3">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-amber-400 text-sm">★</span>
                ))}
              </div>
              <p className="text-gray-700 text-sm leading-relaxed mb-4">
                &quot;Ordered a set mundu for my wedding. The fabric quality is premium and the golden border is exactly as shown. Packaging was excellent and delivery was on time. Will definitely order again!&quot;
              </p>
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-green-100 flex items-center justify-center text-green-700 font-semibold text-sm">R</div>
                <div>
                  <p className="text-sm font-medium text-gray-900">Rajesh Kumar</p>
                  <p className="text-xs text-gray-500">Thrissur, Kerala</p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-rose-50 to-white rounded-xl p-5 sm:p-6 border border-rose-100 shadow-sm sm:col-span-2 lg:col-span-1">
              <div className="flex items-center gap-1 mb-3">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-amber-400 text-sm">★</span>
                ))}
              </div>
              <p className="text-gray-700 text-sm leading-relaxed mb-4">
                &quot;I was skeptical about buying handloom online, but BR Handlooms exceeded my expectations. The silk cotton saree is so soft and the colors are vibrant. You can feel the quality the moment you touch it.&quot;
              </p>
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-rose-100 flex items-center justify-center text-rose-700 font-semibold text-sm">P</div>
                <div>
                  <p className="text-sm font-medium text-gray-900">Priya Nair</p>
                  <p className="text-xs text-gray-500">Bangalore, Karnataka</p>
                </div>
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
