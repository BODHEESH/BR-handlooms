import { Product } from '@/types/product'
import { notFound } from 'next/navigation'
import ProductDetailClient from '@/components/ProductDetailClient'

async function getProduct(id: string): Promise<Product | null> {
  try {
    const response = await fetch(`http://localhost:3000/api/products/${id}`)
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
  const product = await getProduct(params.id)

  if (!product) {
    notFound()
  }

  return <ProductDetailClient product={product} />
}
