import { NextRequest, NextResponse } from 'next/server'
import Cart from '@/lib/models/Cart'
import dbConnect from '@/lib/mongodb'

// Helper function to get or create session ID
function getSessionId(request: NextRequest): string {
  const sessionId = request.cookies.get('sessionId')?.value
  if (sessionId) return sessionId
  
  // Generate new session ID
  const newSessionId = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
  return newSessionId
}

export async function GET(request: NextRequest) {
  try {
    await dbConnect()
    const sessionId = getSessionId(request)
    
    let cart = await Cart.findOne({ sessionId })
    if (!cart) {
      cart = new Cart({ sessionId, items: [], total: 0, itemCount: 0 })
      await cart.save()
    }
    
    return NextResponse.json({
      success: true,
      cart: {
        items: cart.items,
        total: cart.total,
        itemCount: cart.itemCount
      }
    })
  } catch (error) {
    console.error('Error fetching cart:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    await dbConnect()
    const sessionId = getSessionId(request)
    const { action, item, quantity } = await request.json()
    
    let cart = await Cart.findOne({ sessionId })
    if (!cart) {
      cart = new Cart({ sessionId, items: [], total: 0, itemCount: 0 })
    }
    
    switch (action) {
      case 'add': {
        const existingItemIndex = cart.items.findIndex((cartItem: any) => 
          cartItem.productId.toString() === item.productId
        )
        
        if (existingItemIndex >= 0) {
          cart.items[existingItemIndex].quantity += 1
        } else {
          cart.items.push({
            productId: item.productId,
            name: item.name,
            price: item.price,
            image: item.image,
            quantity: 1,
            fabric: item.fabric,
            color: item.color
          })
        }
        break
      }
      
      case 'remove': {
        cart.items = cart.items.filter((cartItem: any) => 
          cartItem.productId.toString() !== item.productId
        )
        break
      }
      
      case 'update': {
        const itemIndex = cart.items.findIndex((cartItem: any) => 
          cartItem.productId.toString() === item.productId
        )
        
        if (itemIndex >= 0) {
          if (quantity > 0) {
            cart.items[itemIndex].quantity = quantity
          } else {
            cart.items.splice(itemIndex, 1)
          }
        }
        break
      }
      
      case 'clear': {
        cart.items = []
        break
      }
    }
    
    // Recalculate total and item count
    cart.itemCount = cart.items.reduce((sum: number, item: any) => sum + item.quantity, 0)
    cart.total = cart.items.reduce((sum: number, item: any) => {
      const price = parseFloat(item.price.replace(/[₹,]/g, ''))
      return sum + (price * item.quantity)
    }, 0)
    
    await cart.save()
    
    const response = NextResponse.json({
      success: true,
      cart: {
        items: cart.items,
        total: cart.total,
        itemCount: cart.itemCount
      }
    })
    
    // Set session ID in cookie if it's new
    if (!request.cookies.get('sessionId')?.value) {
      response.cookies.set('sessionId', sessionId, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 60 * 60 * 24 * 30 // 30 days
      })
    }
    
    return response
  } catch (error) {
    console.error('Error updating cart:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
