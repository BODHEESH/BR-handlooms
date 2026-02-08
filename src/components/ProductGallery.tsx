'use client'

import { useState, useRef, useCallback } from 'react'

function ProductGallery({ images }: { images: string[] }) {
  const [selectedImage, setSelectedImage] = useState(0)
  const [isZoomed, setIsZoomed] = useState(false)
  const [showFullscreen, setShowFullscreen] = useState(false)
  const [pinchScale, setPinchScale] = useState(1)
  const [translate, setTranslate] = useState({ x: 0, y: 0 })
  const touchStartRef = useRef<{ x: number; y: number; dist: number; time: number } | null>(null)
  const lastTapRef = useRef(0)

  const getTouchDistance = (touches: React.TouchList) => {
    if (touches.length < 2) return 0
    const dx = touches[0].clientX - touches[1].clientX
    const dy = touches[0].clientY - touches[1].clientY
    return Math.sqrt(dx * dx + dy * dy)
  }

  const handleTap = useCallback(() => {
    const now = Date.now()
    if (now - lastTapRef.current < 300) {
      // Double tap - toggle zoom
      if (pinchScale > 1) {
        setPinchScale(1)
        setTranslate({ x: 0, y: 0 })
      } else {
        setPinchScale(2.5)
      }
    }
    lastTapRef.current = now
  }, [pinchScale])

  const handleTouchStart = (e: React.TouchEvent) => {
    const touch = e.touches[0]
    touchStartRef.current = {
      x: touch.clientX,
      y: touch.clientY,
      dist: getTouchDistance(e.touches),
      time: Date.now()
    }
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!touchStartRef.current) return

    // Pinch zoom
    if (e.touches.length === 2) {
      e.preventDefault()
      const newDist = getTouchDistance(e.touches)
      if (touchStartRef.current.dist > 0) {
        const scale = Math.max(1, Math.min(4, pinchScale * (newDist / touchStartRef.current.dist)))
        setPinchScale(scale)
        touchStartRef.current.dist = newDist
      }
      return
    }

    // Pan when zoomed
    if (pinchScale > 1 && e.touches.length === 1) {
      e.preventDefault()
      const dx = e.touches[0].clientX - touchStartRef.current.x
      const dy = e.touches[0].clientY - touchStartRef.current.y
      setTranslate(prev => ({ x: prev.x + dx, y: prev.y + dy }))
      touchStartRef.current.x = e.touches[0].clientX
      touchStartRef.current.y = e.touches[0].clientY
    }
  }

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (!touchStartRef.current) return
    const elapsed = Date.now() - touchStartRef.current.time

    // Quick tap (not a drag) - open fullscreen or handle double tap
    if (elapsed < 200 && e.changedTouches.length === 1) {
      const dx = Math.abs(e.changedTouches[0].clientX - touchStartRef.current.x)
      const dy = Math.abs(e.changedTouches[0].clientY - touchStartRef.current.y)
      if (dx < 10 && dy < 10) {
        if (!showFullscreen) {
          setShowFullscreen(true)
          setPinchScale(1)
          setTranslate({ x: 0, y: 0 })
        } else {
          handleTap()
        }
      }
    }

    // Swipe to change image (only when not zoomed)
    if (pinchScale <= 1 && showFullscreen && e.changedTouches.length === 1) {
      const dx = e.changedTouches[0].clientX - touchStartRef.current.x
      if (Math.abs(dx) > 60) {
        if (dx < 0 && selectedImage < images.length - 1) {
          setSelectedImage(prev => prev + 1)
        } else if (dx > 0 && selectedImage > 0) {
          setSelectedImage(prev => prev - 1)
        }
      }
    }

    touchStartRef.current = null
  }

  const closeFullscreen = () => {
    setShowFullscreen(false)
    setPinchScale(1)
    setTranslate({ x: 0, y: 0 })
  }

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
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        />
        {isZoomed && (
          <div className="absolute inset-0 bg-black/5 pointer-events-none"></div>
        )}
        {/* Zoom indicator - desktop */}
        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity hidden sm:block">
          <span className="text-sm text-gray-700">🔍</span>
        </div>
        {/* Tap to zoom hint - mobile */}
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-black/50 backdrop-blur-sm text-white text-xs px-3 py-1 rounded-full sm:hidden">
          Tap to zoom
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

      {/* Fullscreen Zoom Modal (Mobile) */}
      {showFullscreen && (
        <div className="fixed inset-0 z-[100] bg-black flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between p-4 text-white z-10">
            <span className="text-sm">{selectedImage + 1} / {images.length}</span>
            <button onClick={closeFullscreen} className="w-10 h-10 flex items-center justify-center rounded-full bg-white/20 text-xl">
              ✕
            </button>
          </div>

          {/* Zoomable Image */}
          <div
            className="flex-1 flex items-center justify-center overflow-hidden touch-none"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <img
              src={images[selectedImage]}
              alt="Product image zoomed"
              className="max-w-full max-h-full object-contain transition-transform duration-100"
              style={{
                transform: `scale(${pinchScale}) translate(${translate.x / pinchScale}px, ${translate.y / pinchScale}px)`
              }}
              draggable={false}
            />
          </div>

          {/* Bottom thumbnails */}
          <div className="flex gap-2 p-3 justify-center bg-black/80">
            {images.map((image, index) => (
              <button
                key={index}
                onClick={() => {
                  setSelectedImage(index)
                  setPinchScale(1)
                  setTranslate({ x: 0, y: 0 })
                }}
                className={`w-12 h-12 rounded-md overflow-hidden border-2 flex-shrink-0 ${
                  selectedImage === index ? 'border-white' : 'border-transparent opacity-50'
                }`}
              >
                <img src={image} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>

          {/* Hint */}
          {pinchScale <= 1 && (
            <div className="absolute bottom-20 left-1/2 -translate-x-1/2 text-white/60 text-xs">
              Double-tap or pinch to zoom • Swipe to navigate
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default ProductGallery
