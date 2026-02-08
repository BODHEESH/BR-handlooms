import WomenCollectionPage from '@/components/WomenCollectionPage'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: "Women's Collection - BR Handlooms | Kuthampully Sarees & Handloom",
  description: "Shop authentic Kuthampully handwoven sarees for women. Kasavu sarees, silk cotton sarees, and traditional Kerala handloom textiles. Direct from weavers.",
  openGraph: {
    title: "Women's Collection | BR Handlooms",
    description: "Authentic Kuthampully handwoven sarees - kasavu, silk cotton & traditional Kerala textiles.",
    type: 'website',
  },
}

export default function Page() {
  return <WomenCollectionPage />
}
