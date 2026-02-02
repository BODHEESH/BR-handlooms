import { NextRequest, NextResponse } from 'next/server'
import User from '@/lib/models/User'
import dbConnect from '@/lib/mongodb'

// Generate a 6-digit OTP
function generateOTP(): string {
  return Math.floor(100000 + Math.random() * 900000).toString()
}

export async function POST(request: NextRequest) {
  try {
    await dbConnect()
    const { phone } = await request.json()

    if (!phone || phone.length < 10) {
      return NextResponse.json(
        { success: false, message: 'Invalid phone number' },
        { status: 400 }
      )
    }

    // Generate OTP
    const otp = generateOTP()
    const otpExpiry = new Date(Date.now() + 10 * 60 * 1000) // 10 minutes

    // Find or create user
    let user = await User.findOne({ phone })
    if (!user) {
      user = new User({ phone, otp, otpExpiry, isVerified: false })
    } else {
      user.otp = otp
      user.otpExpiry = otpExpiry
    }
    await user.save()

    // For development: Log OTP to console (remove in production)
    console.log(`OTP for ${phone}: ${otp}`)

    // TODO: In production, integrate with SMS service like:
    // - MSG91 (free tier available)
    // - Twilio (trial credits)
    // - Fast2SMS (free tier)
    // Example: await sendSMS(phone, `Your BR Handlooms OTP is: ${otp}`)

    return NextResponse.json({
      success: true,
      message: `OTP sent to ${phone}. (Dev mode: Check console)`,
      // For development only - remove in production
      devOTP: process.env.NODE_ENV === 'development' ? otp : undefined
    })
  } catch (error) {
    console.error('Error sending OTP:', error)
    return NextResponse.json(
      { success: false, message: 'Failed to send OTP' },
      { status: 500 }
    )
  }
}
