import { Product } from '@/types/product'
import { notFound } from 'next/navigation'
import ProductDetailClient from '@/components/ProductDetailClient'
import type { Metadata } from 'next'

function safePrice(price: string | number): number {
  if (typeof price === 'number') return price
  return parseFloat(String(price).replace(/[₹,]/g, '')) || 0
}

async function getProduct(id: string): Promise<Product | null> {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/api/supabase/products/${id}`)
    if (!response.ok) {
      console.error('Failed to fetch product:', response.statusText)
      return null
    }
    const data = await response.json()
    return data.product || null
  } catch (error) {
    console.error('Error fetching product:', error)
    return null
  }
}

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const product = await getProduct(params.id)
  if (!product) {
    return { title: 'Product Not Found - BR Handlooms' }
  }

  const price = safePrice(product.price)
  const desc = `Buy ${product.name} - ${product.fabric} handloom in ${product.color}. ₹${price.toLocaleString()}. Authentic Kuthampully handwoven textile from BR Handlooms.`

  return {
    title: `${product.name} - BR Handlooms | Kuthampully Handloom`,
    description: desc,
    openGraph: {
      title: `${product.name} | BR Handlooms`,
      description: desc,
      images: product.images?.[0] ? [{ url: product.images[0], width: 800, height: 1000 }] : [],
      type: 'website',
    },
  }
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

  return <ProductDetailClient product={product} />
}
