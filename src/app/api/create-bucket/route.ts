import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

export async function POST() {
  try {
    console.log('Creating Supabase client with service role key...')
    const supabase = createClient(supabaseUrl, supabaseServiceKey)
    
    console.log('Checking existing buckets...')
    const { data: existingBuckets, error: listError } = await supabase.storage.listBuckets()
    
    if (listError) {
      console.error('Error listing buckets:', listError)
      return NextResponse.json({
        success: false,
        error: 'Failed to list buckets: ' + listError.message
      }, { status: 500 })
    }
    
    console.log('Existing buckets:', existingBuckets?.map(b => b.name))
    
    // Check if bucket already exists
    const bucketExists = existingBuckets?.some(b => b.name === 'product-images')
    if (bucketExists) {
      console.log('Bucket already exists')
      return NextResponse.json({
        success: true,
        message: 'Bucket already exists',
        bucketUrl: `${supabaseUrl}/storage/v1/object/public/product-images`,
        buckets: existingBuckets
      })
    }
    
    console.log('Creating product-images bucket...')
    
    // Create the bucket
    const { data, error } = await supabase.storage.createBucket('product-images', {
      public: true,
      allowedMimeTypes: ['image/*'],
      fileSizeLimit: 10485760 // 10MB
    })
    
    if (error) {
      console.error('Error creating bucket:', error)
      return NextResponse.json({
        success: false,
        error: 'Failed to create bucket: ' + error.message,
        details: error
      }, { status: 500 })
    }
    
    console.log('Bucket created successfully:', data)
    
    return NextResponse.json({
      success: true,
      message: 'Bucket created successfully',
      bucketUrl: `${supabaseUrl}/storage/v1/object/public/product-images`,
      data,
      buckets: existingBuckets
    })
    
  } catch (error) {
    console.error('Setup error:', error)
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined
    }, { status: 500 })
  }
}

export async function GET() {
  return NextResponse.json({
    message: 'POST to create the product-images bucket',
    url: '/api/create-bucket'
  })
}
