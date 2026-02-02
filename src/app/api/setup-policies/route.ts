import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

export async function POST() {
  try {
    const supabase = createClient(supabaseUrl, supabaseServiceKey)
    
    console.log('Setting up storage policies using SQL...')
    
    // Policy 1: Allow anyone to view images (public read access)
    const { error: viewError } = await supabase.rpc('exec_sql', {
      sql: `
        CREATE POLICY "Public View" ON storage.objects
        FOR SELECT USING (bucket_id = 'product-images');
      `
    })
    
    if (viewError && !viewError.message.includes('already exists')) {
      console.error('Error creating view policy:', viewError)
    }
    
    // Policy 2: Allow authenticated users to upload images
    const { error: uploadError } = await supabase.rpc('exec_sql', {
      sql: `
        CREATE POLICY "Authenticated Upload" ON storage.objects
        FOR INSERT WITH CHECK (
          bucket_id = 'product-images' AND 
          auth.role() = 'authenticated'
        );
      `
    })
    
    if (uploadError && !uploadError.message.includes('already exists')) {
      console.error('Error creating upload policy:', uploadError)
    }
    
    return NextResponse.json({
      success: true,
      message: 'Storage policies setup guide',
      note: 'Policies need to be created manually in Supabase dashboard',
      steps: [
        '1. Go to Supabase dashboard → Storage → Policies',
        '2. Create "Public View" policy: SELECT on bucket_id = product-images',
        '3. Create "Authenticated Upload" policy: INSERT for authenticated users'
      ],
      currentStatus: 'Bucket is public - no policies needed for basic use'
    })
    
  } catch (error) {
    console.error('Policy setup error:', error)
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}

export async function GET() {
  return NextResponse.json({
    message: 'POST to set up storage policies',
    url: '/api/setup-policies',
    currentSetup: {
      bucket: 'product-images',
      public: true,
      recommended: 'Set up policies for better security'
    }
  })
}
