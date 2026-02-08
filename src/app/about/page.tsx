import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About Us - BR Handlooms | Kuthampully Handwoven Textiles',
  description: 'Learn about BR Handlooms, our heritage in Kuthampully handweaving, and our mission to bring authentic Kerala handloom textiles to your doorstep.',
}

export default function AboutPage() {
  return (
    <div className="bg-white min-h-screen">
      {/* Hero */}
      <div className="bg-gradient-to-r from-primary-700 to-primary-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20 text-center">
          <div className="flex items-center justify-center mb-4">
            <div className="h-px w-12 bg-white/50"></div>
            <span className="mx-3 text-white text-xl">✦</span>
            <div className="h-px w-12 bg-white/50"></div>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif mb-4">Our Story</h1>
          <p className="text-base sm:text-lg text-green-50 max-w-2xl mx-auto">
            From the looms of Kuthampully to your wardrobe &mdash; preserving centuries of Kerala&apos;s handloom heritage.
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
        {/* Heritage Section */}
        <section className="mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl font-serif text-gray-900 mb-4">The Legacy of Kuthampully</h2>
          <div className="prose prose-gray max-w-none text-gray-700 leading-relaxed space-y-4">
            <p>
              Kuthampully, a small village in the Thrissur district of Kerala, has been the heart of traditional handloom weaving for over 500 years. The weavers of Kuthampully are descendants of the Devanga community, who migrated from the Mysore region and settled here, bringing with them an extraordinary craft that has since become an integral part of Kerala&apos;s cultural identity.
            </p>
            <p>
              The Kuthampully handloom tradition is renowned for its distinctive kasavu (golden border) sarees and mundus, which are an essential part of every Kerala celebration &mdash; from Onam festivals to weddings. Each piece is woven on traditional pit looms using time-honoured techniques that have been passed down through generations.
            </p>
          </div>
        </section>

        {/* Who We Are */}
        <section className="mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl font-serif text-gray-900 mb-4">Who We Are</h2>
          <div className="prose prose-gray max-w-none text-gray-700 leading-relaxed space-y-4">
            <p>
              <strong>BR Handlooms</strong> was founded with a simple mission: to bring the finest authentic Kuthampully handwoven textiles directly from the weavers to customers across India and beyond. We work closely with master weavers in Kuthampully to ensure every product meets the highest standards of quality and authenticity.
            </p>
            <p>
              By connecting you directly with the artisans, we eliminate middlemen, ensuring fair prices for both the weavers and our customers. Every purchase supports the livelihoods of traditional weaving families and helps keep this centuries-old craft alive.
            </p>
            <p className="text-sm text-gray-500 italic">
              We also offer a select range of quality powerloom products for customers looking for budget-friendly options. Each product on our store clearly mentions its weave type.
            </p>
          </div>
        </section>

        {/* What Makes Us Different */}
        <section className="mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl font-serif text-gray-900 mb-6">What Makes Us Different</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            <div className="bg-amber-50 rounded-xl p-5 sm:p-6 border border-amber-100">
              <span className="text-2xl mb-3 block">🧵</span>
              <h3 className="font-semibold text-gray-900 mb-2">Authentic Handwoven</h3>
              <p className="text-sm text-gray-600">Our handloom products are woven on traditional pit looms by skilled artisans using time-honoured techniques.</p>
            </div>
            <div className="bg-green-50 rounded-xl p-5 sm:p-6 border border-green-100">
              <span className="text-2xl mb-3 block">🏷️</span>
              <h3 className="font-semibold text-gray-900 mb-2">GI Tagged Products</h3>
              <p className="text-sm text-gray-600">Our products carry the Geographical Indication tag, certifying their authentic Kuthampully origin.</p>
            </div>
            <div className="bg-blue-50 rounded-xl p-5 sm:p-6 border border-blue-100">
              <span className="text-2xl mb-3 block">🤝</span>
              <h3 className="font-semibold text-gray-900 mb-2">Direct from Weavers</h3>
              <p className="text-sm text-gray-600">No middlemen. Fair prices for artisans and customers. Your purchase directly supports weaving families.</p>
            </div>
            <div className="bg-rose-50 rounded-xl p-5 sm:p-6 border border-rose-100">
              <span className="text-2xl mb-3 block">📦</span>
              <h3 className="font-semibold text-gray-900 mb-2">Secure Delivery</h3>
              <p className="text-sm text-gray-600">Carefully packaged and shipped via India Post to ensure your handloom reaches you in perfect condition.</p>
            </div>
          </div>
        </section>

        {/* Our Promise */}
        <section className="mb-12 sm:mb-16">
          <div className="bg-gradient-to-r from-primary-50 to-amber-50 rounded-xl p-6 sm:p-8 border border-primary-100">
            <h2 className="text-2xl sm:text-3xl font-serif text-gray-900 mb-4">Our Promise</h2>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start gap-3">
                <span className="text-primary-600 mt-0.5">✓</span>
                <span>Every handloom product is <strong>100% authentic</strong> Kuthampully handwoven</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-primary-600 mt-0.5">✓</span>
                <span>Premium quality natural fibers &mdash; cotton, silk cotton, and pure silk</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-primary-600 mt-0.5">✓</span>
                <span>Real gold and silver zari used in traditional kasavu borders</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-primary-600 mt-0.5">✓</span>
                <span>Transparent pricing with no hidden costs</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-primary-600 mt-0.5">✓</span>
                <span>Responsive customer support via WhatsApp</span>
              </li>
            </ul>
          </div>
        </section>

        {/* CTA */}
        <section className="text-center">
          <h2 className="text-xl sm:text-2xl font-serif text-gray-900 mb-4">Experience the Tradition</h2>
          <p className="text-gray-600 mb-6 max-w-lg mx-auto text-sm sm:text-base">
            Browse our collection of authentic Kuthampully handlooms and bring home a piece of Kerala&apos;s heritage.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/products"
              className="px-6 py-3 bg-primary-600 text-white rounded-lg font-medium hover:bg-primary-700 transition-colors text-center"
            >
              Shop Collection
            </Link>
            <a
              href="https://wa.me/917907730095?text=Hi, I'd like to know more about BR Handlooms"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors text-center"
            >
              📱 Chat with Us
            </a>
          </div>
        </section>
      </div>
    </div>
  )
}
