const { createClient } = require('@supabase/supabase-js')

// Supabase configuration
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Missing Supabase environment variables')
  process.exit(1)
}

// Create Supabase client
const supabase = createClient(supabaseUrl, supabaseServiceKey)

// Categories to add
const categories = [
  {
    name: "Women's Collection",
    slug: 'womens-collection',
    description: 'Elegant sarees & traditional wear',
    sort_order: 1,
    is_active: true
  },
  {
    name: "Men's Wear",
    slug: 'men-wear',
    description: 'Dhotis, mundus & traditional attire',
    sort_order: 2,
    is_active: true
  },
  {
    name: 'Celebrity Inspired',
    slug: 'celebrity-inspired',
    description: 'Trending styles & designer pieces',
    sort_order: 3,
    is_active: true
  },
  {
    name: 'New Arrivals',
    slug: 'new-arrivals',
    description: 'Latest additions to our collection',
    sort_order: 4,
    is_active: true
  }
]

async function addCategories() {
  console.log('Adding categories to database...')
  
  for (const category of categories) {
    try {
      // Check if category already exists
      const { data: existing } = await supabase
        .from('categories')
        .select('id')
        .eq('slug', category.slug)
        .single()
      
      if (existing) {
        console.log(`✅ Category "${category.name}" already exists`)
        continue
      }
      
      // Insert new category
      const { data, error } = await supabase
        .from('categories')
        .insert({
          ...category,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        })
        .select()
        .single()
      
      if (error) {
        console.error(`❌ Error adding category "${category.name}":`, error.message)
      } else {
        console.log(`✅ Added category "${category.name}" with ID: ${data.id}`)
      }
    } catch (error) {
      console.error(`❌ Error processing category "${category.name}":`, error.message)
    }
  }
  
  console.log('\n🎉 Categories setup complete!')
  
  // Display all categories
  const { data: allCategories } = await supabase
    .from('categories')
    .select('*')
    .order('sort_order', { ascending: true })
  
  console.log('\n📋 Current categories:')
  allCategories?.forEach(cat => {
    console.log(`  - ${cat.name} (${cat.slug}) - ${cat.is_active ? 'Active' : 'Inactive'}`)
  })
}

addCategories().catch(console.error)
