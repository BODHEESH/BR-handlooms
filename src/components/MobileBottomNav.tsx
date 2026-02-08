'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useCart } from '@/contexts/CartContext'

export default function MobileBottomNav() {
  const pathname = usePathname()
  const { cart } = useCart()
  const itemCount = cart.items.reduce((sum, item) => sum + item.quantity, 0)

  const navItems = [
    { href: '/', label: 'Home', icon: '🏠' },
    { href: '/products', label: 'Shop', icon: '🛍️' },
    { href: '/cart', label: 'Cart', icon: '🛒', badge: itemCount },
    { href: 'https://wa.me/917907730095', label: 'WhatsApp', icon: '📱', external: true },
  ]

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-gray-200 shadow-[0_-2px_10px_rgba(0,0,0,0.06)] lg:hidden safe-area-bottom">
      <div className="flex items-center justify-around h-14">
        {navItems.map((item) => {
          const isActive = !item.external && pathname === item.href
          const isShopActive = item.href === '/products' && (
            pathname === '/products' ||
            pathname === '/women-collection' ||
            pathname === '/men-wear' ||
            pathname === '/celebrity-inspired' ||
            pathname === '/new-arrivals'
          )

          if (item.external) {
            return (
              <a
                key={item.label}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center justify-center flex-1 h-full text-green-600"
              >
                <span className="text-lg leading-none">{item.icon}</span>
                <span className="text-[10px] mt-0.5 font-medium">{item.label}</span>
              </a>
            )
          }

          return (
            <Link
              key={item.label}
              href={item.href}
              className={`flex flex-col items-center justify-center flex-1 h-full relative transition-colors ${
                isActive || isShopActive
                  ? 'text-primary-700'
                  : 'text-gray-500'
              }`}
            >
              <span className="text-lg leading-none relative">
                {item.icon}
                {item.badge && item.badge > 0 && (
                  <span className="absolute -top-1.5 -right-2.5 bg-red-500 text-white text-[9px] font-bold min-w-[16px] h-4 flex items-center justify-center rounded-full px-1">
                    {item.badge > 9 ? '9+' : item.badge}
                  </span>
                )}
              </span>
              <span className="text-[10px] mt-0.5 font-medium">{item.label}</span>
              {(isActive || isShopActive) && (
                <span className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-0.5 bg-primary-600 rounded-full"></span>
              )}
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
