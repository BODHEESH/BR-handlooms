import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

const supabase = createClient(supabaseUrl, supabaseServiceKey)

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    const {
      customer_name,
      email,
      phone,
      address,
      city,
      state,
      pincode,
      payment_method,
      items,
      subtotal,
      total_amount
    } = body

    if (!customer_name || !phone || !address || !city || !state || !pincode || !items || !total_amount) {
      return NextResponse.json(
        { error: 'All required fields must be provided' },
        { status: 400 }
      )
    }

    // Generate order number
    const orderNumber = 'BRH' + Date.now().toString().slice(-8)

    const shippingAddress = {
      name: customer_name,
      phone,
      email: email || '',
      address,
      city,
      state,
      pincode,
      payment_method: payment_method || 'whatsapp'
    }

    const orderData = {
      order_number: orderNumber,
      user_id: null,
      email: email || '',
      status: 'pending',
      financial_status: 'pending',
      currency: 'INR',
      subtotal: parseFloat(subtotal) || 0,
      tax_amount: 0,
      shipping_amount: 0,
      total_amount: parseFloat(total_amount),
      shipping_address: shippingAddress,
      billing_address: shippingAddress,
      notes: `Order by ${customer_name}, Phone: ${phone}, Payment: ${payment_method || 'whatsapp'}`,
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
        product_id: item.product_id || null,
        product_name: item.name,
        product_sku: item.sku || null,
        variant_title: null,
        quantity: item.quantity || 1,
        unit_price: parseFloat(String(item.price).replace(/[₹,]/g, '')) || 0,
        total_price: (parseFloat(String(item.price).replace(/[₹,]/g, '')) || 0) * (item.quantity || 1),
        created_at: new Date().toISOString()
      }))

      const { error: itemsError } = await supabase
        .from('order_items')
        .insert(orderItems)

      if (itemsError) {
        console.error('Error creating order items:', itemsError)
      }
    }

    return NextResponse.json({
      success: true,
      order: {
        id: data.id,
        order_number: data.order_number,
        total_amount: data.total_amount,
        status: data.status
      },
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
