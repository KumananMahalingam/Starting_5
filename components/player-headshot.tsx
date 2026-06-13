'use client'

import { useState } from 'react'
import Image from 'next/image'
import { BasketballIcon } from '@/components/basketball-icon'

interface PlayerRevealCardProps {
  name: string
  headshotUrl: string
  size?: 'sm' | 'md'
}

function HeadshotImage({
  name,
  headshotUrl,
  failed,
  onError,
}: {
  name: string
  headshotUrl: string
  failed: boolean
  onError: () => void
}) {
  if (!headshotUrl || failed) {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <BasketballIcon size={36} />
      </div>
    )
  }

  return (
    <Image
      src={headshotUrl}
      alt={name}
      fill
      sizes="84px"
      className="object-cover object-[50%_12%] scale-[1.18] origin-[50%_12%]"
      unoptimized
      onError={onError}
    />
  )
}

export function PlayerRevealCard({ name, headshotUrl, size = 'sm' }: PlayerRevealCardProps) {
  const [failed, setFailed] = useState(false)
  const widthClass = size === 'sm' ? 'w-[76px] sm:w-[84px]' : 'w-[84px] sm:w-[96px]'

  return (
    <div
      className={`${widthClass} flex flex-col overflow-hidden rounded-xl bg-card shadow-lg shadow-black/40`}
      style={{ border: '2px solid oklch(0.70 0.18 45 / 0.65)' }}
    >
      <div className="relative aspect-square w-full overflow-hidden bg-muted">
        <HeadshotImage
          name={name}
          headshotUrl={headshotUrl}
          failed={failed}
          onError={() => setFailed(true)}
        />
      </div>
      <div className="flex min-h-[30px] w-full items-center justify-center bg-card px-1 py-1.5">
        <span className="line-clamp-2 text-center text-[8px] font-semibold leading-tight text-foreground sm:text-[9px]">
          {name}
        </span>
      </div>
    </div>
  )
}
