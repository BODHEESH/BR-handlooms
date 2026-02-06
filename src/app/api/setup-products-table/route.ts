import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

export async function POST() {
  try {
    const supabase = createClient(supabaseUrl, supabaseServiceKey)
    
    console.log('Creating products table...')
    
    // Create the products table using SQL
    const { data, error } = await supabase.rpc('exec_sql', {
      sql: `
        CREATE TABLE IF NOT EXISTS products (
          id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
          name TEXT NOT NULL,
          description TEXT,
          price DECIMAL(10,2) NOT NULL,
          category TEXT,
          fabric TEXT,
          color TEXT,
          size TEXT,
          stock INTEGER DEFAULT 0,
          images TEXT[] DEFAULT '{}',
          tags TEXT[] DEFAULT '{}',
          featured BOOLEAN DEFAULT FALSE,
          active BOOLEAN DEFAULT TRUE,
          telegram_message_id TEXT,
          created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
          updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
        );
        
        -- Create index for better performance
        CREATE INDEX IF NOT EXISTS idx_products_category ON products(category);
        CREATE INDEX IF NOT EXISTS idx_products_active ON products(active);
        CREATE INDEX IF NOT EXISTS idx_products_featured ON products(featured);
        
        -- Enable RLS
        ALTER TABLE products ENABLE ROW LEVEL SECURITY;
        
        -- Create policies
        DROP POLICY IF EXISTS "Public View Products" ON products;
        CREATE POLICY "Public View Products" ON products
          FOR SELECT USING (active = true);
        
        DROP POLICY IF EXISTS "Admin Insert Products" ON products;
        CREATE POLICY "Admin Insert Products" ON products
          FOR INSERT WITH CHECK (true);
        
        DROP POLICY IF EXISTS "Admin Update Products" ON products;
        CREATE POLICY "Admin Update Products" ON products
          FOR UPDATE USING (true);
        
        DROP POLICY IF EXISTS "Admin Delete Products" ON products;
        CREATE POLICY "Admin Delete Products" ON products
          FOR DELETE USING (true);
      `
    })
    
    if (error) {
      console.error('Error creating table:', error)
      return NextResponse.json({
        success: false,
        error: error.message,
        note: 'You may need to create the table manually in Supabase dashboard'
      })
    }
    
    return NextResponse.json({
      success: true,
      message: 'Products table created successfully',
      table: 'products',
      features: [
        'UUID primary key',
        'Product fields (name, price, description, etc.)',
        'Image URLs array',
        'Tags array',
        'Telegram message ID tracking',
        'Active/Featured flags',
        'RLS policies for security',
        'Performance indexes'
      ]
    })
    
  } catch (error) {
    console.error('Setup error:', error)
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}

export async function GET() {
  return NextResponse.json({
    message: 'POST to create the products table in Supabase',
    url: '/api/setup-products-table',
    table_structure: {
      id: 'UUID (Primary Key)',
      name: 'TEXT (Required)',
      description: 'TEXT',
      price: 'DECIMAL(10,2) (Required)',
      category: 'TEXT',
      fabric: 'TEXT',
      color: 'TEXT',
      size: 'TEXT',
      stock: 'INTEGER',
      images: 'TEXT[] (Array of URLs)',
      tags: 'TEXT[] (Array of tags)',
      featured: 'BOOLEAN',
      active: 'BOOLEAN',
      telegram_message_id: 'TEXT',
      created_at: 'TIMESTAMP',
      updated_at: 'TIMESTAMP'
    }
  })
}
