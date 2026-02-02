const { createClient } = require('@supabase/supabase-js')
require('dotenv').config({ path: '.env.local' })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImF4YWVweHVyZGdvZWJ6bW1yYnhkIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3MDAyNDkxMCwiZXhwIjoyMDg1NjAwOTEwfQ.YpTtHkGz1gJ2K8M3x7nR9F2qL3mW4nX8yZ5vA6bC7d' // This is your service role key - get it from Supabase dashboard

const supabase = createClient(supabaseUrl, supabaseServiceKey)

async function setupStorage() {
  try {
    console.log('Setting up Supabase storage...')
    
    // Create the bucket
    const { data, error } = await supabase.storage.createBucket('product-images', {
      public: true,
      allowedMimeTypes: ['image/*'],
      fileSizeLimit: 10485760 // 10MB
    })
    
    if (error) {
      if (error.message.includes('already exists')) {
        console.log('✅ Bucket already exists')
      } else {
        console.error('❌ Error creating bucket:', error)
        return
      }
    } else {
      console.log('✅ Bucket created successfully')
    }
    
    // Set up public access policy
    const { error: policyError } = await supabase.storage.from('product-images').createPolicy('public-access', {
      name: 'Public Access',
      definition: {
        select: true,
        insert: true,
        update: true,
        delete: true
      }
    })
    
    if (policyError && !policyError.message.includes('already exists')) {
      console.error('❌ Error setting policy:', policyError)
    } else {
      console.log('✅ Public access policy set')
    }
    
    console.log('\n🎉 Supabase storage setup complete!')
    console.log('📸 You can now upload images at: http://localhost:3000/admin/upload')
    
  } catch (error) {
    console.error('❌ Setup error:', error)
  }
}

setupStorage()
