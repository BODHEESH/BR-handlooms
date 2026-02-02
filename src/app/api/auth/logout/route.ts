import { NextResponse } from 'next/server'

export async function POST() {
  const response = NextResponse.json({
    success: true,
    message: 'Logged out successfully'
  })

  // Clear auth token
  response.cookies.delete('auth-token')

  return response
}
