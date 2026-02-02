'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

interface User {
  _id: string
  phone: string
  name?: string
  email?: string
  isVerified: boolean
}

interface AuthContextType {
  user: User | null
  loading: boolean
  login: (phone: string) => Promise<{ success: boolean; message: string; devOTP?: string }>
  verifyOTP: (phone: string, otp: string, name?: string) => Promise<{ success: boolean; message: string; user?: User }>
  logout: () => Promise<void>
  isAuthenticated: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  // Check if user is logged in on mount
  useEffect(() => {
    checkAuth()
  }, [])

  const checkAuth = async () => {
    try {
      const response = await fetch('/api/auth/me')
      if (response.ok) {
        const data = await response.json()
        setUser(data.user)
      }
    } catch (error) {
      console.error('Error checking auth:', error)
    } finally {
      setLoading(false)
    }
  }

  const login = async (phone: string) => {
    try {
      const response = await fetch('/api/auth/send-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone })
      })

      const data = await response.json()
      return data
    } catch (error) {
      console.error('Error sending OTP:', error)
      return { success: false, message: 'Failed to send OTP' }
    }
  }

  const verifyOTP = async (phone: string, otp: string, name?: string) => {
    try {
      const response = await fetch('/api/auth/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone, otp, name })
      })

      const data = await response.json()
      if (data.success && data.user) {
        setUser(data.user)
      }
      return data
    } catch (error) {
      console.error('Error verifying OTP:', error)
      return { success: false, message: 'Failed to verify OTP' }
    }
  }

  const logout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' })
      setUser(null)
    } catch (error) {
      console.error('Error logging out:', error)
    }
  }

  return (
    <AuthContext.Provider value={{
      user,
      loading,
      login,
      verifyOTP,
      logout,
      isAuthenticated: !!user
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
