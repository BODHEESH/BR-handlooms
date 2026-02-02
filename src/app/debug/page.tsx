'use client'

import { useState } from 'react'

export default function DebugPage() {
  const [result, setResult] = useState<any>(null)
  const [loading, setLoading] = useState(false)

  const testUpload = async () => {
    setLoading(true)
    try {
      // Create a simple test image
      const canvas = document.createElement('canvas')
      canvas.width = 100
      canvas.height = 100
      const ctx = canvas.getContext('2d')
      if (ctx) {
        ctx.fillStyle = '#FF0000'
        ctx.fillRect(0, 0, 100, 100)
      }

      // Convert to blob
      canvas.toBlob(async (blob) => {
        if (blob) {
          const formData = new FormData()
          formData.append('file', blob, 'test.png')
          formData.append('folder', 'test')

          const response = await fetch('/api/upload', {
            method: 'POST',
            body: formData
          })

          const data = await response.json()
          setResult(data)
        }
        setLoading(false)
      }, 'image/png')
    } catch (error) {
      setResult({ error: error instanceof Error ? error.message : 'Unknown error' })
      setLoading(false)
    }
  }

  const testSupabase = async () => {
    setLoading(true)
    try {
      const response = await fetch('/api/test-supabase')
      const data = await response.json()
      setResult(data)
    } catch (error) {
      setResult({ error: error instanceof Error ? error.message : 'Unknown error' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-2xl mx-auto px-4">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Debug Upload</h1>
        
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <div className="space-y-4">
            <button
              onClick={testSupabase}
              disabled={loading}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
            >
              {loading ? 'Testing...' : 'Test Supabase Connection'}
            </button>
            
            <button
              onClick={testUpload}
              disabled={loading}
              className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 disabled:opacity-50 ml-4"
            >
              {loading ? 'Uploading...' : 'Test Upload'}
            </button>
          </div>
        </div>

        {result && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Result:</h2>
            <pre className="bg-gray-100 p-4 rounded text-sm overflow-auto">
              {JSON.stringify(result, null, 2)}
            </pre>
          </div>
        )}
      </div>
    </div>
  )
}
