import CelebrityInspiredPage from '@/components/CelebrityInspiredPage'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: "Celebrity Inspired - BR Handlooms | Trending Handloom Designs",
  description: "Get the celebrity look with our trending handloom collection. Premium Kuthampully fabrics inspired by celebrity fashion. Shop now at BR Handlooms.",
  openGraph: {
    title: "Celebrity Inspired Collection | BR Handlooms",
    description: "Trending handloom designs inspired by celebrity fashion. Premium Kuthampully fabrics.",
    type: 'website',
  },
}

export default function Page() {
  return <CelebrityInspiredPage />
}
