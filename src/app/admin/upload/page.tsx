'use client'

import { useState } from 'react'
import ImageUpload from '@/components/ImageUpload'
import Link from 'next/link'

interface UploadedImage {
  url: string
  path: string
  fileName: string
  size: number
  timestamp: Date
}

export default function AdminUploadPage() {
  const [uploadedImages, setUploadedImages] = useState<UploadedImage[]>([])

  const handleUploadComplete = (result: any) => {
    setUploadedImages(prev => [
      {
        ...result,
        timestamp: new Date()
      },
      ...prev
    ])
  }

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + ' B'
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB'
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB'
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Image Upload Admin</h1>
              <p className="text-gray-600 mt-1">Upload product images to Supabase storage</p>
            </div>
            <Link
              href="/"
              className="text-primary-600 hover:text-primary-700 font-medium"
            >
              ← Back to Site
            </Link>
          </div>
        </div>

        {/* Upload Section */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Upload New Image</h2>
          <ImageUpload 
            onUploadComplete={handleUploadComplete}
            folder="products"
          />
        </div>

        {/* Instructions */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
          <h3 className="text-lg font-semibold text-blue-900 mb-3">How to Use Images in Telegram</h3>
          <div className="space-y-2 text-blue-800">
            <p>1. Upload your image using the tool above</p>
            <p>2. Copy the generated URL</p>
            <p>3. Send product message to Telegram bot with:</p>
            <div className="bg-white rounded-lg p-3 mt-2 font-mono text-sm">
              #NewArrival<br/>
              Product Name: Your Product Name<br/>
              Fabric: Cotton<br/>
              Color: Red<br/>
              Price: ₹2,500<br/>
              Stock: In Stock<br/>
              Images: https://your-supabase-url/image.jpg<br/>
              #traditional #cotton
            </div>
          </div>
        </div>

        {/* Recent Uploads */}
        {uploadedImages.length > 0 && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Uploads</h3>
            <div className="space-y-4">
              {uploadedImages.map((image, index) => (
                <div key={index} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                  <img
                    src={image.url}
                    alt={image.fileName}
                    className="w-20 h-20 object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">{image.fileName}</p>
                    <p className="text-sm text-gray-600">{formatFileSize(image.size)}</p>
                    <p className="text-xs text-gray-500">{image.timestamp.toLocaleString()}</p>
                  </div>
                  <div className="text-right">
                    <button
                      onClick={() => navigator.clipboard.writeText(image.url)}
                      className="px-3 py-1 bg-blue-500 text-white text-sm rounded hover:bg-blue-600 transition-colors"
                    >
                      Copy URL
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
