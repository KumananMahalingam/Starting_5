'use client'

import { useState } from 'react'
import Image from 'next/image'
import { BasketballIcon } from '@/components/basketball-icon'

interface ClueImageProps {
  src: string
  alt: string
  variant?: 'contain' | 'cover'
  size?: number
}

export function ClueImage({ src, alt, variant = 'contain', size = 48 }: ClueImageProps) {
  const [failed, setFailed] = useState(false)

  if (!src || failed) {
    return <BasketballIcon size={size} />
  }

  return (
    <div
      className={`relative ${variant === 'cover' ? 'overflow-hidden rounded' : ''}`}
      style={{ width: size, height: size }}
    >
      <Image
        src={src}
        alt={alt}
        fill
        className={variant === 'cover' ? 'object-cover' : 'object-contain rounded'}
        unoptimized
        onError={() => setFailed(true)}
      />
    </div>
  )
}
