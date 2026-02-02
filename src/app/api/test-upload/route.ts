import { NextResponse } from 'next/server'

export async function GET() {
  return NextResponse.json({
    message: 'Upload API Test',
    endpoints: {
      upload: 'POST /api/upload',
      admin: '/admin/upload',
      supabase: {
        url: process.env.NEXT_PUBLIC_SUPABASE_URL,
        bucket: 'product-images'
      }
    },
    instructions: [
      '1. Go to http://localhost:3000/admin/upload',
      '2. Upload an image',
      '3. Copy the URL',
      '4. Use in Telegram message'
    ]
  })
}
