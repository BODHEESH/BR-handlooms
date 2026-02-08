'use client'

import { useState } from 'react'

interface ProductImageProps {
  src: string
  alt: string
  className?: string
  fill?: boolean
}

export default function ProductImage({ src, alt, className = '', fill = false }: ProductImageProps) {
  const [loaded, setLoaded] = useState(false)
  const [error, setError] = useState(false)

  return (
    <>
      {!loaded && !error && (
        <div className={`img-skeleton ${fill ? 'absolute inset-0' : 'w-full h-full'}`} />
      )}
      {error ? (
        <div className={`bg-gradient-to-br from-amber-50 to-green-50 flex items-center justify-center ${fill ? 'absolute inset-0' : 'w-full h-full'}`}>
          <span className="text-4xl">🧵</span>
        </div>
      ) : (
        <img
          src={src}
          alt={alt}
          className={`${className} ${loaded ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300`}
          onLoad={() => setLoaded(true)}
          onError={() => setError(true)}
          loading="lazy"
        />
      )}
    </>
  )
}
