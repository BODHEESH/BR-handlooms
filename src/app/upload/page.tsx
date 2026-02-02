'use client'

import { useState } from 'react'
import ImageUpload from '@/components/ImageUpload'

interface UploadedImage {
  url: string
  path: string
  fileName: string
  size: number
}

export default function SimpleUploadPage() {
  const [uploadedImages, setUploadedImages] = useState<UploadedImage[]>([])
  const [copiedUrl, setCopiedUrl] = useState<string | null>(null)

  const handleUploadComplete = (result: any) => {
    setUploadedImages(prev => [result, ...prev])
  }

  const copyUrl = (url: string) => {
    navigator.clipboard.writeText(url)
    setCopiedUrl(url)
    setTimeout(() => setCopiedUrl(null), 2000)
  }

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + ' B'
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB'
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB'
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-2xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Image Upload</h1>
          <p className="text-gray-600">Upload product images and get URLs for Telegram</p>
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
          <h3 className="text-lg font-semibold text-blue-900 mb-3">How to Use</h3>
          <div className="space-y-2 text-blue-800">
            <p>1. Upload your product image using the form above</p>
            <p>2. Copy the generated URL</p>
            <p>3. Send product message to Telegram bot with:</p>
            <div className="bg-white rounded-lg p-3 mt-2 font-mono text-sm">
              #NewArrival<br/>
              Product Name: Your Product Name<br/>
              Fabric: Cotton<br/>
              Color: Red<br/>
              Price: ₹2,500<br/>
              Stock: In Stock<br/>
              Images: [PASTE URL HERE]<br/>
              #traditional #cotton
            </div>
          </div>
        </div>

        {/* Recent Uploads */}
        {uploadedImages.length > 0 && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Uploaded Images</h3>
            <div className="space-y-3">
              {uploadedImages.map((image, index) => (
                <div key={index} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                  <img
                    src={image.url}
                    alt={image.fileName}
                    className="w-16 h-16 object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <p className="font-medium text-gray-900 text-sm">{image.fileName}</p>
                    <p className="text-xs text-gray-600">{formatFileSize(image.size)}</p>
                  </div>
                  <button
                    onClick={() => copyUrl(image.url)}
                    className={`px-3 py-1 text-sm rounded transition-colors ${
                      copiedUrl === image.url
                        ? 'bg-green-500 text-white'
                        : 'bg-blue-500 text-white hover:bg-blue-600'
                    }`}
                  >
                    {copiedUrl === image.url ? '✓ Copied!' : 'Copy URL'}
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
