import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

export async function POST() {
  try {
    const supabase = createClient(supabaseUrl, supabaseServiceKey)

    // Add new columns if they don't exist
    // Using individual ALTER TABLE statements for safety
    const columns = [
      { name: 'blouse_price', type: 'DECIMAL(10,2) DEFAULT NULL' },
      { name: 'blouse_details', type: 'TEXT DEFAULT NULL' },
      { name: 'compare_at_price', type: 'DECIMAL(10,2) DEFAULT NULL' },
      { name: 'weight', type: 'DECIMAL(10,3) DEFAULT NULL' },
    ]

    const results: { column: string; status: string }[] = []

    for (const col of columns) {
      const { error } = await supabase.rpc('exec_sql', {
        sql: `ALTER TABLE products ADD COLUMN IF NOT EXISTS ${col.name} ${col.type};`
      })

      if (error) {
        // Try direct approach if exec_sql doesn't exist
        results.push({ column: col.name, status: `Error: ${error.message}` })
      } else {
        results.push({ column: col.name, status: 'Added or already exists' })
      }
    }

    return NextResponse.json({
      success: true,
      message: 'Migration completed',
      results
    })

  } catch (error) {
    console.error('Migration error:', error)
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
      manual_sql: `
-- Run this in Supabase SQL Editor if the API migration fails:
ALTER TABLE products ADD COLUMN IF NOT EXISTS blouse_price DECIMAL(10,2) DEFAULT NULL;
ALTER TABLE products ADD COLUMN IF NOT EXISTS blouse_details TEXT DEFAULT NULL;
ALTER TABLE products ADD COLUMN IF NOT EXISTS compare_at_price DECIMAL(10,2) DEFAULT NULL;
ALTER TABLE products ADD COLUMN IF NOT EXISTS weight DECIMAL(10,3) DEFAULT NULL;
      `
    }, { status: 500 })
  }
}

export async function GET() {
  return NextResponse.json({
    message: 'POST to run migration: adds blouse_price, blouse_details, compare_at_price, weight columns to products table',
    manual_sql: `
-- Run this in Supabase SQL Editor:
ALTER TABLE products ADD COLUMN IF NOT EXISTS blouse_price DECIMAL(10,2) DEFAULT NULL;
ALTER TABLE products ADD COLUMN IF NOT EXISTS blouse_details TEXT DEFAULT NULL;
ALTER TABLE products ADD COLUMN IF NOT EXISTS compare_at_price DECIMAL(10,2) DEFAULT NULL;
ALTER TABLE products ADD COLUMN IF NOT EXISTS weight DECIMAL(10,3) DEFAULT NULL;
    `
  })
}
