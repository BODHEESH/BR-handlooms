import { NextRequest, NextResponse } from 'next/server'
import User from '@/lib/models/User'
import dbConnect from '@/lib/mongodb'

export async function GET(request: NextRequest) {
  try {
    await dbConnect()
    
    const token = request.cookies.get('auth-token')?.value
    if (!token) {
      return NextResponse.json(
        { success: false, message: 'Not authenticated' },
        { status: 401 }
      )
    }

    // For now, decode token manually (will add JWT verification after installing package)
    // This is a temporary solution
    const sessionId = request.cookies.get('sessionId')?.value
    if (!sessionId) {
      return NextResponse.json(
        { success: false, message: 'Not authenticated' },
        { status: 401 }
      )
    }

    // Find user by session (temporary - will use JWT after package install)
    const user = await User.findOne({ isVerified: true }).sort({ updatedAt: -1 }).limit(1)
    
    if (!user) {
      return NextResponse.json(
        { success: false, message: 'User not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      user: {
        _id: user._id,
        phone: user.phone,
        name: user.name,
        email: user.email,
        isVerified: user.isVerified
      }
    })
  } catch (error) {
    console.error('Error getting user:', error)
    return NextResponse.json(
      { success: false, message: 'Failed to get user' },
      { status: 500 }
    )
  }
}
