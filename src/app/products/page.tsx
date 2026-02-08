import ProductsPage from '@/components/ProductsPage'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: "All Products - BR Handlooms | Kuthampully Handwoven Textiles",
  description: "Browse our complete collection of authentic Kuthampully handwoven textiles. Sarees, mundus, dhotis & more. Direct from Kerala weavers at BR Handlooms.",
  openGraph: {
    title: "All Products | BR Handlooms",
    description: "Complete collection of authentic Kuthampully handwoven textiles. Direct from Kerala weavers.",
    type: 'website',
  },
}

export default function Page() {
  return <ProductsPage />
}
