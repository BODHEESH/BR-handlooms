'use client'

import { useState } from 'react'

interface UploadResult {
  url: string
  path: string
  fileName: string
  size: number
}

interface ImageUploadProps {
  onUploadComplete?: (result: UploadResult) => void
  folder?: string
  className?: string
}

export default function ImageUpload({ onUploadComplete, folder = 'products', className = '' }: ImageUploadProps) {
  const [uploading, setUploading] = useState(false)
  const [preview, setPreview] = useState<string | null>(null)
  const [uploadedUrl, setUploadedUrl] = useState<string | null>(null)

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Show preview
    const reader = new FileReader()
    reader.onload = (e) => setPreview(e.target?.result as string)
    reader.readAsDataURL(file)

    // Upload file
    setUploading(true)
    try {
      const formData = new FormData()
      formData.append('file', file)
      formData.append('folder', folder)

      const response = await fetch('/api/upload-simple', {
        method: 'POST',
        body: formData
      })

      if (response.ok) {
        const result = await response.json()
        setUploadedUrl(result.url)
        onUploadComplete?.(result)
      } else {
        const errorData = await response.json()
        console.error('Upload failed:', errorData)
        alert(`Upload failed: ${errorData.error || 'Unknown error'}`)
      }
    } catch (error) {
      console.error('Upload error:', error)
      alert('Upload failed: Network error')
    } finally {
      setUploading(false)
    }
  }

  const copyUrl = () => {
    if (uploadedUrl) {
      navigator.clipboard.writeText(uploadedUrl)
      alert('URL copied to clipboard!')
    }
  }

  return (
    <div className={`border-2 border-dashed border-gray-300 rounded-lg p-6 text-center ${className}`}>
      {preview && (
        <div className="mb-4">
          <img 
            src={preview} 
            alt="Preview" 
            className="mx-auto max-h-48 rounded-lg shadow-md"
          />
        </div>
      )}

      <div className="space-y-4">
        <div>
          <label className="cursor-pointer inline-flex items-center px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
            </svg>
            {uploading ? 'Uploading...' : 'Choose Image'}
            <input
              type="file"
              accept="image/*"
              onChange={handleFileSelect}
              disabled={uploading}
              className="hidden"
            />
          </label>
        </div>

        {uploadedUrl && (
          <div className="space-y-2">
            <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-2 rounded-lg text-sm">
              ✅ Image uploaded successfully!
            </div>
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-3">
              <p className="text-xs text-gray-600 mb-2">Image URL:</p>
              <div className="flex items-center space-x-2">
                <input
                  type="text"
                  value={uploadedUrl}
                  readOnly
                  className="flex-1 text-xs bg-white border border-gray-300 rounded px-2 py-1"
                />
                <button
                  onClick={copyUrl}
                  className="px-2 py-1 bg-blue-500 text-white text-xs rounded hover:bg-blue-600 transition-colors"
                >
                  Copy
                </button>
              </div>
            </div>
            <p className="text-xs text-gray-500">
              Use this URL in your Telegram message with "Images: {'{URL}'}"
            </p>
          </div>
        )}

        <div className="text-xs text-gray-500">
          <p>Supported formats: JPG, PNG, GIF, WebP</p>
          <p>Max size: 10MB</p>
        </div>
      </div>
    </div>
  )
}
