'use client'

import { useState } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import AuthModal from './AuthModal'

export default function LoginButton() {
  const { user, logout, loading } = useAuth()
  const [showAuthModal, setShowAuthModal] = useState(false)
  const [showUserMenu, setShowUserMenu] = useState(false)

  if (loading) {
    return (
      <div className="w-8 h-8 rounded-full bg-gray-200 animate-pulse" />
    )
  }

  if (user) {
    return (
      <div className="relative">
        <button
          onClick={() => setShowUserMenu(!showUserMenu)}
          className="flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors"
        >
          <div className="w-8 h-8 rounded-full bg-primary-600 text-white flex items-center justify-center font-medium">
            {user.name ? user.name[0].toUpperCase() : user.phone[0]}
          </div>
          <span className="hidden md:block text-sm font-medium text-gray-700">
            {user.name || user.phone}
          </span>
        </button>

        {showUserMenu && (
          <>
            <div 
              className="fixed inset-0 z-40" 
              onClick={() => setShowUserMenu(false)}
            />
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl border border-gray-200 z-50">
              <div className="p-4 border-b border-gray-200">
                <p className="text-sm font-medium text-gray-900">{user.name || 'User'}</p>
                <p className="text-xs text-gray-600">+91 {user.phone}</p>
              </div>
              <div className="py-2">
                <button
                  onClick={() => {
                    logout()
                    setShowUserMenu(false)
                  }}
                  className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 transition-colors"
                >
                  Logout
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    )
  }

  return (
    <>
      <button
        onClick={() => setShowAuthModal(true)}
        className="px-4 py-2 bg-primary-600 text-white rounded-lg text-sm font-medium hover:bg-primary-700 transition-colors"
      >
        Login
      </button>

      <AuthModal 
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
      />
    </>
  )
}
