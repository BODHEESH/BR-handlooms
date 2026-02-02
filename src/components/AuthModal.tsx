'use client'

import { useState } from 'react'
import { useAuth } from '@/contexts/AuthContext'

interface AuthModalProps {
  isOpen: boolean
  onClose: () => void
  onSuccess?: () => void
}

export default function AuthModal({ isOpen, onClose, onSuccess }: AuthModalProps) {
  const { login, verifyOTP } = useAuth()
  const [step, setStep] = useState<'phone' | 'otp'>('phone')
  const [phone, setPhone] = useState('7907730095')
  const [otp, setOTP] = useState('')
  const [name, setName] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [devOTP, setDevOTP] = useState('')

  const handleSendOTP = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    const result = await login(phone)
    setLoading(false)

    if (result.success) {
      setStep('otp')
      // For development - show OTP
      if (result.devOTP) {
        setDevOTP(result.devOTP)
      }
    } else {
      setError(result.message)
    }
  }

  const handleVerifyOTP = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    const result = await verifyOTP(phone, otp, name)
    setLoading(false)

    if (result.success) {
      onClose()
      if (onSuccess) onSuccess()
      // Reset form
      setStep('phone')
      setPhone('7907730095')
      setOTP('')
      setName('')
      setDevOTP('')
    } else {
      setError(result.message)
    }
  }

  const handleResendOTP = async () => {
    setError('')
    setLoading(true)
    const result = await login(phone)
    setLoading(false)

    if (result.success) {
      if (result.devOTP) {
        setDevOTP(result.devOTP)
      }
      setError('OTP resent successfully')
    } else {
      setError(result.message)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-screen items-center justify-center p-4">
        {/* Backdrop */}
        <div 
          className="fixed inset-0 bg-black/50 transition-opacity"
          onClick={onClose}
        />

        {/* Modal */}
        <div className="relative bg-white rounded-2xl shadow-xl max-w-md w-full p-8">
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Logo */}
          <div className="text-center mb-6">
            <h2 className="text-2xl font-serif text-gray-900 mb-2">BR Handlooms</h2>
            <p className="text-sm text-gray-600">
              {step === 'phone' ? 'Login or Sign Up' : 'Verify OTP'}
            </p>
          </div>

          {/* Phone Step */}
          {step === 'phone' && (
            <form onSubmit={handleSendOTP} className="space-y-4">
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number
                </label>
                <div className="flex">
                  <span className="inline-flex items-center px-3 rounded-l-lg border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                    +91
                  </span>
                  <input
                    type="tel"
                    id="phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
                    placeholder="Enter 10-digit number"
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-r-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    required
                    maxLength={10}
                  />
                </div>
              </div>

              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={loading || phone.length !== 10}
                className="w-full bg-primary-600 text-white py-3 rounded-lg font-medium hover:bg-primary-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Sending OTP...' : 'Send OTP'}
              </button>

              <p className="text-xs text-gray-500 text-center">
                By continuing, you agree to our Terms of Service and Privacy Policy
              </p>
            </form>
          )}

          {/* OTP Step */}
          {step === 'otp' && (
            <form onSubmit={handleVerifyOTP} className="space-y-4">
              <div>
                <label htmlFor="otp" className="block text-sm font-medium text-gray-700 mb-2">
                  Enter OTP
                </label>
                <input
                  type="text"
                  id="otp"
                  value={otp}
                  onChange={(e) => setOTP(e.target.value.replace(/\D/g, '').slice(0, 6))}
                  placeholder="6-digit OTP"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-center text-2xl tracking-widest"
                  required
                  maxLength={6}
                  autoFocus
                />
                <p className="text-sm text-gray-600 mt-2">
                  OTP sent to +91 {phone}
                </p>
              </div>

              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                  Your Name (Optional)
                </label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your name"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                />
              </div>

              {/* Development OTP Display */}
              {devOTP && (
                <div className="bg-yellow-50 border border-yellow-200 text-yellow-800 px-4 py-3 rounded-lg text-sm">
                  <strong>Development Mode:</strong> Your OTP is <strong>{devOTP}</strong>
                </div>
              )}

              {error && (
                <div className={`border px-4 py-3 rounded-lg text-sm ${
                  error.includes('success') 
                    ? 'bg-green-50 border-green-200 text-green-700'
                    : 'bg-red-50 border-red-200 text-red-700'
                }`}>
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={loading || otp.length !== 6}
                className="w-full bg-primary-600 text-white py-3 rounded-lg font-medium hover:bg-primary-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Verifying...' : 'Verify & Login'}
              </button>

              <div className="flex items-center justify-between text-sm">
                <button
                  type="button"
                  onClick={() => {
                    setStep('phone')
                    setOTP('')
                    setError('')
                    setDevOTP('')
                  }}
                  className="text-gray-600 hover:text-gray-900"
                >
                  ← Change Number
                </button>
                <button
                  type="button"
                  onClick={handleResendOTP}
                  disabled={loading}
                  className="text-primary-600 hover:text-primary-700 font-medium"
                >
                  Resend OTP
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}
