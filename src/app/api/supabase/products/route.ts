import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

// Initialize Supabase client
const supabase = createClient(supabaseUrl, supabaseServiceKey)

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get('category')
    const featured = searchParams.get('featured')
    const search = searchParams.get('search')
    const limit = parseInt(searchParams.get('limit') || '50')
    const offset = parseInt(searchParams.get('offset') || '0')

    let query = supabase
      .from('products')
      .select('*')
      .eq('active', true)
      .order('created_at', { ascending: false })

    // Search by name, fabric, color, or tags
    if (search && search.trim()) {
      const term = search.trim()
      query = query.or(`name.ilike.%${term}%,fabric.ilike.%${term}%,color.ilike.%${term}%,description.ilike.%${term}%`)
    }

    // Handle category filtering by slug
    if (category) {
      if (category === 'new-arrivals') {
        // For new arrivals, get products created in the last 30 days or marked as new_arrival
        const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString()
        query = query.or(`new_arrival.eq.true,created_at.gte.${thirtyDaysAgo}`)
      } else {
        // Get category ID from slug
        const { data: categoryData } = await supabase
          .from('categories')
          .select('id')
          .eq('slug', category)
          .eq('is_active', true)
          .single()
        
        if (categoryData) {
          query = query.eq('category_id', categoryData.id)
        }
      }
    }

    if (featured === 'true') {
      query = query.eq('featured', true)
    }

    const { data, error, count } = await query
      .range(offset, offset + limit - 1)

    if (error) {
      console.error('Error fetching products:', error)
      return NextResponse.json(
        { error: 'Failed to fetch products', details: error.message },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      products: (data || []).map(product => ({
        ...product,
        _id: product.id // Add _id field for frontend compatibility
      })),
      total: count || 0,
      limit,
      offset
    })

  } catch (error) {
    console.error('API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Validate required fields
    const { name, price, description, category, fabric, color, size, stock, images, tags, featured } = body
    
    if (!name || !price) {
      return NextResponse.json(
        { error: 'Name and price are required' },
        { status: 400 }
      )
    }

    const productData = {
      name,
      description: description || '',
      price: parseFloat(price),
      category: category || 'uncategorized',
      fabric: fabric || '',
      color: color || '',
      size: size || '',
      stock: parseInt(stock) || 0,
      images: images || [],
      tags: tags || [],
      featured: featured || false,
      active: true,
      updated_at: new Date().toISOString()
    }

    const { data, error } = await supabase
      .from('products')
      .insert(productData)
      .select()
      .single()

    if (error) {
      console.error('Error creating product:', error)
      return NextResponse.json(
        { error: 'Failed to create product', details: error.message },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      product: data,
      message: 'Product created successfully'
    })

  } catch (error) {
    console.error('API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
