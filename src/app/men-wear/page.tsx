import MenWearPage from '@/components/MenWearPage'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: "Men's Wear - BR Handlooms | Kuthampully Mundus & Dhotis",
  description: "Shop authentic Kuthampully handwoven mundus, dhotis, and set mundus for men. Traditional Kerala men's wear direct from weavers.",
  openGraph: {
    title: "Men's Wear | BR Handlooms",
    description: "Authentic Kuthampully handwoven mundus, dhotis & traditional Kerala men's wear.",
    type: 'website',
  },
}

export default function Page() {
  return <MenWearPage />
}
