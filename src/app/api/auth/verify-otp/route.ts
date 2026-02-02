import { NextRequest, NextResponse } from 'next/server'
import User from '@/lib/models/User'
import dbConnect from '@/lib/mongodb'
import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production'

export async function POST(request: NextRequest) {
  try {
    await dbConnect()
    const { phone, otp, name } = await request.json()

    if (!phone || !otp) {
      return NextResponse.json(
        { success: false, message: 'Phone and OTP are required' },
        { status: 400 }
      )
    }

    // Find user
    const user = await User.findOne({ phone })
    if (!user) {
      return NextResponse.json(
        { success: false, message: 'User not found' },
        { status: 404 }
      )
    }

    // Check OTP expiry
    if (user.otpExpiry && user.otpExpiry < new Date()) {
      return NextResponse.json(
        { success: false, message: 'OTP expired. Please request a new one.' },
        { status: 400 }
      )
    }

    // Verify OTP
    if (user.otp !== otp) {
      return NextResponse.json(
        { success: false, message: 'Invalid OTP' },
        { status: 400 }
      )
    }

    // Update user
    user.isVerified = true
    user.otp = undefined
    user.otpExpiry = undefined
    if (name && !user.name) {
      user.name = name
    }
    await user.save()

    // Create JWT token
    const token = jwt.sign(
      { userId: user._id, phone: user.phone },
      JWT_SECRET,
      { expiresIn: '30d' }
    )

    // Set cookie
    const response = NextResponse.json({
      success: true,
      message: 'Login successful',
      user: {
        _id: user._id,
        phone: user.phone,
        name: user.name,
        email: user.email,
        isVerified: user.isVerified
      }
    })

    response.cookies.set('auth-token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 24 * 30 // 30 days
    })

    return response
  } catch (error) {
    console.error('Error verifying OTP:', error)
    return NextResponse.json(
      { success: false, message: 'Failed to verify OTP' },
      { status: 500 }
    )
  }
}
