import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Link from 'next/link'
import MobileMenu from '@/components/MobileMenu'
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
                <div className="hidden md:block">
                  <div className="ml-10 flex items-center space-x-8">
                    <Link href="/" className="text-gray-700 hover:text-primary-600 text-sm font-medium transition-colors">Home</Link>
                    <Link href="/products" className="text-gray-700 hover:text-primary-600 text-sm font-medium transition-colors">Products</Link>
                    <Link href="/new-arrivals" className="text-gray-700 hover:text-primary-600 text-sm font-medium transition-colors">New Arrivals</Link>
                    <a href="https://wa.me/917907730095" className="bg-green-600 text-white px-5 py-2 rounded-md text-sm font-medium hover:bg-green-700 transition-colors inline-flex items-center">
                      <span className="mr-1">📱</span> WhatsApp Order
                    </a>
                  </div>
                </div>

                {/* Mobile Menu */}
                <div className="md:hidden">
                  <MobileMenu />
                </div>
              </div>
            </nav>
          </header>

          <main className="flex-1">
            {children}
          </main>

          <footer className="bg-gradient-to-b from-white to-amber-50 border-t border-gray-200">
            <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
              <div className="text-center">
                <div className="flex items-center justify-center mb-4">
                  <div className="h-px w-12 bg-primary-600"></div>
                  <span className="mx-3 text-primary-700">✦</span>
                  <div className="h-px w-12 bg-primary-600"></div>
                </div>
                <h3 className="text-2xl font-serif text-gray-900 mb-2">BR Handlooms</h3>
                <p className="text-sm text-primary-700 tracking-widest mb-3">KUTHAMPULLY</p>
                <p className="text-gray-600 max-w-md mx-auto mb-6">
                  Preserving Kerala's handloom heritage through authentic, handwoven textiles crafted with tradition and love.
                </p>
                <div className="mt-6">
                  <a
                    href="https://wa.me/917907730095"
                    className="bg-green-600 text-white px-8 py-3 rounded-md font-medium hover:bg-green-700 inline-flex items-center transition-colors shadow-sm"
                  >
                    <span className="mr-2">📱</span> Order via WhatsApp
                  </a>
                </div>
                <div className="mt-8 pt-6 border-t border-gray-200">
                  <p className="text-xs text-gray-500">
                    © 2024 BR Handlooms. Handwoven with heritage, crafted with love.
                  </p>
                </div>
              </div>
            </div>
          </footer>
        </div>
      </body>
    </html>
  )
}
