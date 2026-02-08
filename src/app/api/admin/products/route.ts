import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

// Initialize Supabase client
const supabase = createClient(supabaseUrl, supabaseServiceKey)

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '50')
    const search = searchParams.get('search') || ''
    const category = searchParams.get('category')
    const status = searchParams.get('status')
    const sortBy = searchParams.get('sortBy') || 'created_at'
    const sortOrder = searchParams.get('sortOrder') || 'desc'

    let query = supabase
      .from('products')
      .select(`
        *,
        categories!inner(
          name
        )
      `)
      .range((page - 1) * limit, page * limit - 1)

    // Apply filters
    if (search) {
      query = query.or(`name.ilike.%${search}%,sku.ilike.%${search}%`)
    }

    if (category) {
      query = query.eq('category_id', category)
    }

    if (status === 'active') {
      query = query.eq('active', true)
    } else if (status === 'inactive') {
      query = query.eq('active', false)
    } else if (status === 'featured') {
      query = query.eq('featured', true)
    } else if (status === 'low-stock') {
      query = query.lte('stock', 5)
    }

    // Apply sorting
    query = query.order(sortBy, { ascending: sortOrder === 'asc' })

    const { data, error, count } = await query

    if (error) {
      console.error('Error fetching products:', error)
      return NextResponse.json(
        { error: 'Failed to fetch products', details: error.message },
        { status: 500 }
      )
    }

    // Format products to include category name
    const formattedProducts = data?.map(product => ({
      ...product,
      category: (product.categories as any)?.name || 'Uncategorized'
    })) || []

    return NextResponse.json({
      success: true,
      products: formattedProducts,
      total: count || 0,
      page,
      limit,
      totalPages: Math.ceil((count || 0) / limit)
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
    const { name, price, description, category_id, fabric, color, size, stock, images, tags, featured, best_seller, blouse_price, blouse_details, compare_at_price, weight } = body
    
    if (!name || !price) {
      return NextResponse.json(
        { error: 'Name and price are required' },
        { status: 400 }
      )
    }

    // Generate slug from name
    const slug = name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '')

    // Generate SKU if not provided
    const sku = body.sku || `BRH-${Date.now()}`

    const productData = {
      name,
      slug,
      description: description || '',
      price: parseFloat(price),
      category_id: category_id || null,
      fabric: fabric || '',
      color: color || '',
      size: size || '',
      stock: parseInt(stock) || 0,
      images: images || [],
      tags: tags || [],
      featured: featured || false,
      best_seller: best_seller || false,
      active: true,
      published: true,
      sku,
      compare_at_price: compare_at_price ? parseFloat(compare_at_price) : null,
      weight: weight ? parseFloat(weight) : null,
      blouse_price: blouse_price ? parseFloat(blouse_price) : null,
      blouse_details: blouse_details || null,
      telegram_message_id: null,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      published_at: new Date().toISOString()
    }

    const { data, error } = await supabase
      .from('products')
      .insert(productData)
      .select(`
        *,
        categories!inner(
          name
        )
      `)
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
