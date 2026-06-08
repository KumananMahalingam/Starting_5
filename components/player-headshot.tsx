'use client'

import { useState } from 'react'
import Image from 'next/image'
import { BasketballIcon } from '@/components/basketball-icon'

interface PlayerHeadshotProps {
  name: string
  headshotUrl: string
  size?: 'sm' | 'md'
}

export function PlayerHeadshot({ name, headshotUrl, size = 'md' }: PlayerHeadshotProps) {
  const [failed, setFailed] = useState(false)
  const boxClass = size === 'sm' ? 'w-14 h-14 sm:w-16 sm:h-16' : 'w-16 h-16 sm:w-20 sm:h-20'
  const iconSize = size === 'sm' ? 56 : 64

  return (
    <div
      className={`relative ${boxClass} rounded-full overflow-hidden bg-muted ring-2 flex items-center justify-center`}
      style={{ outline: '2px solid oklch(0.70 0.18 45)' }}
    >
      {headshotUrl && !failed ? (
        <Image
          src={headshotUrl}
          alt={name}
          fill
          className="object-cover object-top scale-150"
          unoptimized
          onError={() => setFailed(true)}
        />
      ) : (
        <BasketballIcon size={iconSize * 0.65} />
      )}
    </div>
  )
}
