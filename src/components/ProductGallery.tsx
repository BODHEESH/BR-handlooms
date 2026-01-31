'use client'

import { useState } from 'react'

function ProductGallery({ images }: { images: string[] }) {
  const [selectedImage, setSelectedImage] = useState(0)
  const [isZoomed, setIsZoomed] = useState(false)

  return (
    <div className="space-y-6">
      {/* Main Image with Zoom */}
      <div 
        className="relative aspect-w-4 aspect-h-5 bg-gray-100 rounded-xl overflow-hidden shadow-xl border-4 border-white cursor-zoom-in group"
        onMouseEnter={() => setIsZoomed(true)}
        onMouseLeave={() => setIsZoomed(false)}
      >
        <img
          src={images[selectedImage]}
          alt="Product image"
          className={`w-full h-full object-center object-cover transition-transform duration-500 ${isZoomed ? 'scale-150' : 'scale-100'}`}
        />
        {isZoomed && (
          <div className="absolute inset-0 bg-black/5 pointer-events-none"></div>
        )}
        {/* Zoom indicator */}
        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <span className="text-sm text-gray-700">🔍</span>
        </div>
      </div>

      {/* Thumbnail Gallery */}
      <div className="grid grid-cols-4 gap-3">
        {images.map((image, index) => (
          <button
            key={index}
            onClick={() => setSelectedImage(index)}
            className={`aspect-w-4 aspect-h-5 rounded-lg overflow-hidden border-2 transition-all duration-200 hover:scale-105 ${
              selectedImage === index 
                ? 'border-primary-600 shadow-lg ring-2 ring-primary-200' 
                : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            <img
              src={image}
              alt={`Product image ${index + 1}`}
              className="w-full h-full object-center object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  )
}

export default ProductGallery
