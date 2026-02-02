import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

export async function POST() {
  try {
    console.log('Testing with service role key...')
    
    // Create client with service role
    const supabase = createClient(supabaseUrl, supabaseServiceKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false
      }
    })
    
    // Test with service role - should bypass RLS
    const testContent = 'test upload with service role'
    const testBlob = new Blob([testContent], { type: 'text/plain' })
    const testFile = new File([testBlob], 'service-role-test.txt', { type: 'text/plain' })
    
    const fileName = `test/service-test-${Date.now()}.txt`
    
    console.log('Attempting upload with service role:', fileName)
    
    const { data, error } = await supabase.storage
      .from('product-images')
      .upload(fileName, testFile, {
        cacheControl: '3600',
        upsert: false
      })
    
    if (error) {
      console.error('Service role upload failed:', error)
      return NextResponse.json({
        success: false,
        error: error.message,
        details: error,
        note: 'Service role should bypass RLS - there might be an issue with the key'
      })
    }
    
    console.log('Service role upload success:', data)
    
    // Get public URL
    const { data: { publicUrl } } = supabase.storage
      .from('product-images')
      .getPublicUrl(data.path)
    
    return NextResponse.json({
      success: true,
      message: 'Service role upload successful!',
      data: data,
      publicUrl: publicUrl,
      note: 'Service role bypassed RLS correctly'
    })
    
  } catch (error) {
    console.error('Test error:', error)
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    })
  }
}
