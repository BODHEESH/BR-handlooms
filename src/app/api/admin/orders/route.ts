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
    const status = searchParams.get('status')
    const search = searchParams.get('search') || ''
    const sortBy = searchParams.get('sortBy') || 'created_at'
    const sortOrder = searchParams.get('sortOrder') || 'desc'

    let query = supabase
      .from('orders')
      .select(`
        *,
        users!left(
          name,
          email,
          phone
        )
      `)
      .range((page - 1) * limit, page * limit - 1)

    // Apply filters
    if (search) {
      query = query.or(`order_number.ilike.%${search}%,email.ilike.%${search}%`)
    }

    if (status && status !== 'all') {
      query = query.eq('status', status)
    }

    // Apply sorting
    query = query.order(sortBy, { ascending: sortOrder === 'asc' })

    const { data, error, count } = await query

    if (error) {
      console.error('Error fetching orders:', error)
      return NextResponse.json(
        { error: 'Failed to fetch orders', details: error.message },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      orders: data || [],
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
    const { user_id, email, items, shipping_address, billing_address, subtotal, tax_amount, shipping_amount, total_amount } = body
    
    if (!email || !items || !total_amount) {
      return NextResponse.json(
        { error: 'Email, items, and total amount are required' },
        { status: 400 }
      )
    }

    // Generate order number
    const orderNumber = 'BRH' + Date.now().toString().slice(-8)

    const orderData = {
      order_number: orderNumber,
      user_id: user_id || null,
      email,
      status: 'pending',
      financial_status: 'pending',
      currency: 'INR',
      subtotal: parseFloat(subtotal) || 0,
      tax_amount: parseFloat(tax_amount) || 0,
      shipping_amount: parseFloat(shipping_amount) || 0,
      total_amount: parseFloat(total_amount),
      shipping_address,
      billing_address,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    }

    const { data, error } = await supabase
      .from('orders')
      .insert(orderData)
      .select()
      .single()

    if (error) {
      console.error('Error creating order:', error)
      return NextResponse.json(
        { error: 'Failed to create order', details: error.message },
        { status: 500 }
      )
    }

    // Create order items
    if (items && items.length > 0) {
      const orderItems = items.map((item: any) => ({
        order_id: data.id,
        product_id: item.product_id,
        variant_id: item.variant_id || null,
        product_name: item.product_name,
        product_sku: item.product_sku,
        variant_title: item.variant_title,
        quantity: item.quantity,
        unit_price: item.unit_price,
        total_price: item.total_price,
        created_at: new Date().toISOString()
      }))

      const { error: itemsError } = await supabase
        .from('order_items')
        .insert(orderItems)

      if (itemsError) {
        console.error('Error creating order items:', itemsError)
        // Don't fail the whole order if items fail, but log it
      }
    }

    return NextResponse.json({
      success: true,
      order: data,
      message: 'Order created successfully'
    })

  } catch (error) {
    console.error('API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
