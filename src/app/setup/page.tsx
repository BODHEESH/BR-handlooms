'use client'

import { useState } from 'react'

export default function SetupPage() {
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<any>(null)

  const setupStorage = async () => {
    setLoading(true)
    try {
      const response = await fetch('/api/setup-storage', {
        method: 'POST'
      })
      const data = await response.json()
      setResult(data)
    } catch (error) {
      setResult({ success: false, error: 'Failed to setup storage' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="max-w-md w-full bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Supabase Setup</h1>
        
        <div className="space-y-4">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h3 className="font-semibold text-blue-900 mb-2">What this does:</h3>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• Creates 'product-images' bucket</li>
              <li>• Sets public access</li>
              <li>• Enables image uploads</li>
            </ul>
          </div>

          <button
            onClick={setupStorage}
            disabled={loading}
            className="w-full bg-primary-600 text-white py-2 px-4 rounded-lg hover:bg-primary-700 transition-colors disabled:opacity-50"
          >
            {loading ? 'Setting up...' : 'Setup Supabase Storage'}
          </button>

          {result && (
            <div className={`p-4 rounded-lg ${
              result.success ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'
            }`}>
              <h3 className={`font-semibold mb-2 ${
                result.success ? 'text-green-900' : 'text-red-900'
              }`}>
                {result.success ? '✅ Success!' : '❌ Error'}
              </h3>
              <p className={`text-sm ${
                result.success ? 'text-green-800' : 'text-red-800'
              }`}>
                {result.message || result.error}
              </p>
              {result.bucketUrl && (
                <p className="text-xs text-gray-600 mt-2">
                  Bucket URL: {result.bucketUrl}
                </p>
              )}
            </div>
          )}

          {result?.success && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <h3 className="font-semibold text-green-900 mb-2">Next Steps:</h3>
              <ol className="text-sm text-green-800 space-y-1">
                <li>1. Go to <a href="/admin/upload" className="underline">/admin/upload</a></li>
                <li>2. Upload a test image</li>
                <li>3. Copy the URL</li>
                <li>4. Use it in your Telegram messages</li>
              </ol>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
