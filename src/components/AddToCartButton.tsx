'use client'

import { useCart } from '@/contexts/CartContext'
import { useState } from 'react'

interface AddToCartButtonProps {
  product: {
    _id: string
    name: string
    price: string
    image: string
    fabric: string
    color: string
  }
  className?: string
  showLabel?: boolean
}

export default function AddToCartButton({ product, className, showLabel = false }: AddToCartButtonProps) {
  const { addToCart } = useCart()
  const [added, setAdded] = useState(false)

  const handleClick = () => {
    addToCart({
      _id: product._id,
      productId: product._id,
      name: product.name,
      price: product.price,
      image: product.image,
      fabric: product.fabric,
      color: product.color
    })
    setAdded(true)
    setTimeout(() => setAdded(false), 1500)
  }

  return (
    <button
      onClick={handleClick}
      className={className || 'bg-amber-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-amber-700 transition-colors inline-flex items-center'}
    >
      {added ? '✓ Added' : (showLabel ? '🛒 Add to Cart' : '🛒')}
    </button>
  )
}
