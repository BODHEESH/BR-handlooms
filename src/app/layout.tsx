import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Link from 'next/link'
import MobileMenu from '@/components/MobileMenu'
import CartIcon from '@/components/CartIcon'
import SearchBar from '@/components/SearchBar'
import MobileBottomNav from '@/components/MobileBottomNav'
import NewsletterPopup from '@/components/NewsletterPopup'
// import WishlistIcon from '@/components/WishlistIcon'
// import LoginButton from '@/components/LoginButton'
import { CartProvider } from '@/contexts/CartContext'
// import { WishlistProvider } from '@/contexts/WishlistContext'
// import { AuthProvider } from '@/contexts/AuthContext'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'BR Handlooms - Kuthampully Traditional Handwoven Textiles',
  description: 'Authentic Kuthampully handloom sarees and traditional Kerala textiles. Handwoven with heritage, crafted with love.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
          <CartProvider>
              <div className="min-h-screen bg-white">
              <header className="bg-white border-b border-gray-200">
                <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                  <div className="flex justify-between items-center h-20">
                    <div className="flex items-center">
                      <Link href="/" className="flex items-center">
                        <div className="text-center">
                          <h1 className="text-2xl font-serif text-gray-900 tracking-wide hover:text-primary-700 transition-colors">BR Handlooms</h1>
                          <p className="text-xs text-primary-700 tracking-widest">KUTHAMPULLY</p>
                        </div>
                      </Link>
                    </div>
                    
                    {/* Desktop Navigation */}
                    <div className="hidden lg:block">
                      <div className="ml-6 flex items-center space-x-5 xl:space-x-7">
                        <Link href="/" className="text-gray-700 hover:text-primary-600 text-sm font-medium transition-colors whitespace-nowrap">Home</Link>
                        <Link href="/products" className="text-gray-700 hover:text-primary-600 text-sm font-medium transition-colors whitespace-nowrap">All Products</Link>
                        <Link href="/women-collection" className="text-gray-700 hover:text-primary-600 text-sm font-medium transition-colors whitespace-nowrap">Women&apos;s Collection</Link>
                        <Link href="/men-wear" className="text-gray-700 hover:text-primary-600 text-sm font-medium transition-colors whitespace-nowrap">Men&apos;s Wear</Link>
                        <Link href="/celebrity-inspired" className="text-gray-700 hover:text-primary-600 text-sm font-medium transition-colors whitespace-nowrap">Celebrity Inspired</Link>
                        <Link href="/new-arrivals" className="text-gray-700 hover:text-primary-600 text-sm font-medium transition-colors whitespace-nowrap">New Arrivals</Link>
                        <a href="https://wa.me/917907730095" className="bg-green-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-green-700 transition-colors inline-flex items-center whitespace-nowrap">
                          <span className="mr-1">📱</span> WhatsApp Order
                        </a>
                      </div>
                    </div>

                    {/* Cart & Wishlist Icons */}
                    <div className="flex items-center space-x-2">
                      {/* <LoginButton /> */}
                      {/* <WishlistIcon /> */}
                      <CartIcon />
                      {/* Mobile Menu */}
                      <div className="lg:hidden">
                        <MobileMenu />
                      </div>
                    </div>
              </div>
              {/* Search Bar - below nav on desktop, full width on mobile */}
              <div className="pb-3 lg:hidden">
                <SearchBar />
              </div>
              <div className="hidden lg:flex justify-center pb-3">
                <SearchBar />
              </div>
            </nav>
          </header>

          <main className="flex-1 pb-16 lg:pb-0">
            {children}
          </main>

          <MobileBottomNav />
          <NewsletterPopup />

          <footer className="bg-gradient-to-b from-white to-amber-50 border-t border-gray-200">
            <div className="max-w-7xl mx-auto py-10 sm:py-12 px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6">
                {/* Brand */}
                <div className="sm:col-span-2 lg:col-span-1">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="h-px w-8 bg-primary-600"></div>
                    <span className="text-primary-700">✦</span>
                    <div className="h-px w-8 bg-primary-600"></div>
                  </div>
                  <h3 className="text-xl font-serif text-gray-900 mb-1">BR Handlooms</h3>
                  <p className="text-xs text-primary-700 tracking-widest mb-3">KUTHAMPULLY</p>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    Authentic handwoven textiles from Kerala&apos;s heritage weaving village, crafted with tradition and love.
                  </p>
                  {/* Social Links */}
                  <div className="flex gap-3 mt-4">
                    <a href="https://www.instagram.com/br_handlooms" target="_blank" rel="noopener noreferrer" className="w-9 h-9 flex items-center justify-center rounded-full bg-gradient-to-br from-purple-500 to-pink-500 text-white text-sm hover:opacity-80 transition-opacity" aria-label="Instagram">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
                    </a>
                    <a href="https://wa.me/917907730095" target="_blank" rel="noopener noreferrer" className="w-9 h-9 flex items-center justify-center rounded-full bg-green-500 text-white text-sm hover:opacity-80 transition-opacity" aria-label="WhatsApp">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                    </a>
                  </div>
                </div>

                {/* Quick Links */}
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3 text-sm">Quick Links</h4>
                  <ul className="space-y-2">
                    <li><Link href="/about" className="text-sm text-gray-600 hover:text-primary-600 transition-colors">About Us</Link></li>
                    <li><Link href="/return-policy" className="text-sm text-gray-600 hover:text-primary-600 transition-colors">Return Policy</Link></li>
                    <li><Link href="/products" className="text-sm text-gray-600 hover:text-primary-600 transition-colors">All Products</Link></li>
                    <li><Link href="/new-arrivals" className="text-sm text-gray-600 hover:text-primary-600 transition-colors">New Arrivals</Link></li>
                  </ul>
                </div>

                {/* Shop */}
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3 text-sm">Shop</h4>
                  <ul className="space-y-2">
                    <li><Link href="/women-collection" className="text-sm text-gray-600 hover:text-primary-600 transition-colors">Women&apos;s Collection</Link></li>
                    <li><Link href="/men-wear" className="text-sm text-gray-600 hover:text-primary-600 transition-colors">Men&apos;s Wear</Link></li>
                    <li><Link href="/celebrity-inspired" className="text-sm text-gray-600 hover:text-primary-600 transition-colors">Celebrity Inspired</Link></li>
                    <li><Link href="/cart" className="text-sm text-gray-600 hover:text-primary-600 transition-colors">My Cart</Link></li>
                  </ul>
                </div>

                {/* Contact */}
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3 text-sm">Contact Us</h4>
                  <ul className="space-y-2.5 text-sm text-gray-600">
                    <li className="flex items-start gap-2">
                      <span className="mt-0.5">📍</span>
                      <span>Kuthampully, Thiruvilwamala,<br/>Thrissur, Kerala 680588</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span>📱</span>
                      <a href="tel:+917907730095" className="hover:text-primary-600 transition-colors">+91 79077 30095</a>
                    </li>
                    <li className="flex items-center gap-2">
                      <span>💬</span>
                      <a href="https://wa.me/917907730095" target="_blank" rel="noopener noreferrer" className="hover:text-primary-600 transition-colors">WhatsApp Order</a>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Bottom Bar */}
              <div className="mt-8 pt-6 border-t border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-2">
                <p className="text-xs text-gray-500">
                  © {new Date().getFullYear()} BR Handlooms. Handwoven with heritage, crafted with love.
                </p>
                <p className="text-xs text-gray-400">
                  Authentic Kuthampully Handloom | GI Tagged Products
                </p>
              </div>
            </div>
          </footer>
        </div>
            </CartProvider>
      </body>
    </html>
  )
}
