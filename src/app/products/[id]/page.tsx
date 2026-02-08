import { Product } from '@/types/product'
import { notFound } from 'next/navigation'
import ProductDetailClient from '@/components/ProductDetailClient'
import type { Metadata } from 'next'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

function safePrice(price: string | number): number {
  if (typeof price === 'number') return price
  return parseFloat(String(price).replace(/[₹,]/g, '')) || 0
}

async function getProduct(id: string): Promise<Product | null> {
  try {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('id', id)
      .eq('active', true)
      .single()

    if (error || !data) {
      console.error('Failed to fetch product:', error?.message)
      return null
    }

    return { ...data, _id: data.id } as Product
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
