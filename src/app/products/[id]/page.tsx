import { Product } from '@/types/product'
import { notFound } from 'next/navigation'
import ProductDetailClient from '@/components/ProductDetailClient'

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

export default async function ProductDetailPage({
  params,
}: {
  params: { id: string }
}) {
  console.log('Fetching product with ID:', params.id)
  const product = await getProduct(params.id)
  
  console.log('Product data received:', JSON.stringify(product, null, 2))

  if (!product) {
    console.log('Product not found, calling notFound()')
    notFound()
  }

  console.log('Rendering ProductDetailClient with product:', product.name)
  return <ProductDetailClient product={product} />
}
