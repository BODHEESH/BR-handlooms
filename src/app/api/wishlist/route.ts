import { NextRequest, NextResponse } from 'next/server'
import Wishlist from '@/lib/models/Wishlist'
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
    
    let wishlist = await Wishlist.findOne({ sessionId })
    if (!wishlist) {
      wishlist = new Wishlist({ sessionId, items: [], itemCount: 0 })
      await wishlist.save()
    }
    
    return NextResponse.json({
      success: true,
      wishlist: {
        items: wishlist.items,
        itemCount: wishlist.itemCount
      }
    })
  } catch (error) {
    console.error('Error fetching wishlist:', error)
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
    const { action, item } = await request.json()
    
    let wishlist = await Wishlist.findOne({ sessionId })
    if (!wishlist) {
      wishlist = new Wishlist({ sessionId, items: [], itemCount: 0 })
    }
    
    switch (action) {
      case 'add': {
        const existingItem = wishlist.items.find((wishlistItem: any) => 
          wishlistItem.productId.toString() === item.productId
        )
        
        if (!existingItem) {
          wishlist.items.push({
            productId: item.productId,
            name: item.name,
            price: item.price,
            image: item.image,
            fabric: item.fabric,
            color: item.color
          })
        }
        break
      }
      
      case 'remove': {
        wishlist.items = wishlist.items.filter((wishlistItem: any) => 
          wishlistItem.productId.toString() !== item.productId
        )
        break
      }
      
      case 'clear': {
        wishlist.items = []
        break
      }
    }
    
    // Update item count
    wishlist.itemCount = wishlist.items.length
    
    await wishlist.save()
    
    const response = NextResponse.json({
      success: true,
      wishlist: {
        items: wishlist.items,
        itemCount: wishlist.itemCount
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
    console.error('Error updating wishlist:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
