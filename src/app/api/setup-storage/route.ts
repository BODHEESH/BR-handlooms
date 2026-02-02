import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

const supabase = createClient(supabaseUrl, supabaseServiceKey)

export async function POST() {
  try {
    console.log('Creating product-images bucket...')
    
    // Create the bucket
    const { data, error } = await supabase.storage.createBucket('product-images', {
      public: true,
      allowedMimeTypes: ['image/*'],
      fileSizeLimit: 10485760 // 10MB
    })
    
    if (error) {
      if (error.message.includes('already exists')) {
        return NextResponse.json({
          success: true,
          message: 'Bucket already exists',
          bucketUrl: `${supabaseUrl}/storage/v1/object/public/product-images`
        })
      } else {
        console.error('Error creating bucket:', error)
        return NextResponse.json({
          success: false,
          error: error.message
        }, { status: 500 })
      }
    }
    
    return NextResponse.json({
      success: true,
      message: 'Bucket created successfully',
      bucketUrl: `${supabaseUrl}/storage/v1/object/public/product-images`,
      data
    })
    
  } catch (error) {
    console.error('Setup error:', error)
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}

export async function GET() {
  return NextResponse.json({
    message: 'POST to create the product-images bucket',
    url: '/api/setup-storage'
  })
}
