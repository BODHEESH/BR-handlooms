import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

export async function GET() {
  try {
    const supabase = createClient(supabaseUrl, supabaseServiceKey)

    // Get total products
    const { count: totalProducts } = await supabase
      .from('products')
      .select('*', { count: 'exact', head: true })
      .eq('active', true)

    // Get total orders
    const { count: totalOrders } = await supabase
      .from('orders')
      .select('*', { count: 'exact', head: true })

    // Get total users
    const { count: totalUsers } = await supabase
      .from('users')
      .select('*', { count: 'exact', head: true })
      .eq('is_active', true)

    // Get total revenue
    const { data: orders } = await supabase
      .from('orders')
      .select('total_amount')
      .eq('financial_status', 'paid')
    
    const totalRevenue = orders?.reduce((sum, order) => sum + (order.total_amount || 0), 0) || 0

    // Get recent orders
    const { data: recentOrders } = await supabase
      .from('orders')
      .select(`
        id,
        order_number,
        total_amount,
        status,
        created_at,
        users!inner(
          name,
          email
        )
      `)
      .order('created_at', { ascending: false })
      .limit(5)

    // Format recent orders
    const formattedRecentOrders = recentOrders?.map(order => ({
      id: order.id,
      order_number: order.order_number,
      total_amount: order.total_amount,
      status: order.status,
      customer_name: (order.users as any)?.name || 'Unknown',
      created_at: order.created_at
    })) || []

    // Get top products (by sales or views)
    const { data: topProducts } = await supabase
      .from('products')
      .select(`
        id,
        name,
        price,
        stock,
        active,
        category,
        sku,
        images,
        featured,
        best_seller
      `)
      .eq('active', true)
      .or('featured.eq.true,best_seller.eq.true')
      .order('created_at', { ascending: false })
      .limit(5)

    // Get low stock products
    const { data: lowStockProducts } = await supabase
      .from('products')
      .select(`
        id,
        name,
        stock,
        category,
        low_stock_threshold
      `)
      .eq('active', true)
      .lt('stock', 5)
      .order('stock', { ascending: true })
      .limit(5)

    return NextResponse.json({
      success: true,
      stats: {
        totalProducts: totalProducts || 0,
        totalOrders: totalOrders || 0,
        totalUsers: totalUsers || 0,
        totalRevenue: totalRevenue,
        recentOrders: formattedRecentOrders,
        topProducts: topProducts || [],
        lowStockProducts: lowStockProducts || []
      }
    })

  } catch (error) {
    console.error('Error fetching dashboard stats:', error)
    return NextResponse.json(
      { error: 'Failed to fetch dashboard stats' },
      { status: 500 }
    )
  }
}
