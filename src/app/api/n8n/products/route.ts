import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

// Initialize Supabase client
const supabase = createClient(supabaseUrl, supabaseServiceKey)

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Extract product data from n8n webhook
    const {
      name,
      description,
      price,
      category,
      fabric,
      color,
      size,
      stock,
      images,
      tags,
      featured,
      telegram_message_id
    } = body

    // Validate required fields
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
      telegram_message_id: telegram_message_id || null,
      active: true,
      updated_at: new Date().toISOString()
    }

    // Check if product with same telegram_message_id already exists
    if (telegram_message_id) {
      const { data: existing } = await supabase
        .from('products')
        .select('id')
        .eq('telegram_message_id', telegram_message_id)
        .single()

      if (existing) {
        // Update existing product
        const { data, error } = await supabase
          .from('products')
          .update(productData)
          .eq('id', existing.id)
          .select()
          .single()

        if (error) {
          console.error('Error updating product:', error)
          return NextResponse.json(
            { error: 'Failed to update product', details: error.message },
            { status: 500 }
          )
        }

        return NextResponse.json({
          success: true,
          action: 'updated',
          product: data,
          message: 'Product updated successfully via n8n'
        })
      }
    }

    // Create new product
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
      action: 'created',
      product: data,
      message: 'Product created successfully via n8n'
    })

  } catch (error) {
    console.error('n8n webhook error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function GET() {
  return NextResponse.json({
    message: 'n8n webhook endpoint for Supabase products',
    usage: 'POST to this endpoint with product data',
    expected_format: {
      name: 'string (required)',
      description: 'string (optional)',
      price: 'number (required)',
      category: 'string (optional)',
      fabric: 'string (optional)',
      color: 'string (optional)',
      size: 'string (optional)',
      stock: 'number (optional)',
      images: 'array of strings (optional)',
      tags: 'array of strings (optional)',
      featured: 'boolean (optional)',
      telegram_message_id: 'string (optional)'
    }
  })
}
