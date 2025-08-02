"use client"

import { useState } from "react"
import Image from "next/image"

interface SafeImageProps {
  src: string
  fallbackSrc: string
  alt: string
  fill?: boolean
  width?: number
  height?: number
  className?: string
  sizes?: string
}

export default function SafeImage({ 
  src, 
  fallbackSrc, 
  alt, 
  fill, 
  width, 
  height, 
  className, 
  sizes 
}: SafeImageProps) {
  const [imgSrc, setImgSrc] = useState(src)
  const [hasError, setHasError] = useState(false)

  const handleError = () => {
    if (!hasError && imgSrc !== fallbackSrc) {
      setHasError(true)
      setImgSrc(fallbackSrc)
    }
  }

  return (
    <Image
      src={imgSrc}
      alt={alt}
      fill={fill}
      width={width}
      height={height}
      className={className}
      sizes={sizes}
      onError={handleError}
    />
  )
}