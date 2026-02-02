import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

export async function POST() {
  try {
    console.log('Testing upload with service role key...')
    const supabase = createClient(supabaseUrl, supabaseServiceKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false
      }
    })
    
    // Create a simple test file
    const testContent = 'test image content'
    const testBlob = new Blob([testContent], { type: 'text/plain' })
    const testFile = new File([testBlob], 'test.txt', { type: 'text/plain' })
    
    const fileName = `test/test-${Date.now()}.txt`
    
    console.log('Attempting upload:', fileName)
    
    const { data, error } = await supabase.storage
      .from('product-images')
      .upload(fileName, testFile, {
        cacheControl: '3600',
        upsert: false
      })
    
    if (error) {
      console.error('Upload error:', error)
      return NextResponse.json({
        success: false,
        error: error.message,
        details: error,
        hint: 'This might be due to missing policies or permissions'
      })
    }
    
    console.log('Upload success:', data)
    
    // Get public URL
    const { data: { publicUrl } } = supabase.storage
      .from('product-images')
      .getPublicUrl(data.path)
    
    return NextResponse.json({
      success: true,
      message: 'Test upload successful',
      data: data,
      publicUrl: publicUrl
    })
    
  } catch (error) {
    console.error('Test error:', error)
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    })
  }
}
