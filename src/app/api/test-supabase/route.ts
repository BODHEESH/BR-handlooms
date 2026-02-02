import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export async function GET() {
  try {
    const supabase = createClient(supabaseUrl, supabaseAnonKey)
    
    // Test connection by listing buckets
    const { data, error } = await supabase.storage.listBuckets()
    
    if (error) {
      return NextResponse.json({
        success: false,
        error: error.message,
        url: supabaseUrl
      })
    }
    
    return NextResponse.json({
      success: true,
      buckets: data,
      url: supabaseUrl,
      message: 'Supabase connection successful!'
    })
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
      url: supabaseUrl
    })
  }
}
