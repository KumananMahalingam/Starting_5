'use client'

import { motion } from 'framer-motion'
import type { Player, ClueMode, Position } from '@/lib/game-data'
import Image from 'next/image'

interface PlayerCardProps {
  player: Player
  clueMode: ClueMode
  isRevealed: boolean
  delay?: number
}

// Position coordinates as percentages - proper NBA half-court alignment
// PG/SG/SF near three-point arc (top), PF/C near paint (bottom)
const POSITION_COORDS: Record<Position, { top: string; left: string }> = {
  PG: { top: '18%', left: '50%' },   // Top center, near half-court
  SG: { top: '25%', left: '15%' },   // Top left wing, near 3pt line
  SF: { top: '25%', left: '85%' },   // Top right wing, near 3pt line
  PF: { top: '65%', left: '22%' },   // Bottom left, low block
  C: { top: '72%', left: '50%' },    // Bottom center, in paint near rim
}

// Country flags for international players
const COUNTRY_FLAGS: Record<string, string> = {
  'Latvia': 'https://flagcdn.com/w80/lv.png',
  'Dominican Republic': 'https://flagcdn.com/w80/do.png',
  'France': 'https://flagcdn.com/w80/fr.png',
  'Serbia': 'https://flagcdn.com/w80/rs.png',
  'Australia': 'https://flagcdn.com/w80/au.png',
  'Slovenia': 'https://flagcdn.com/w80/si.png',
  'Germany': 'https://flagcdn.com/w80/de.png',
  'Greece': 'https://flagcdn.com/w80/gr.png',
  'Canada': 'https://flagcdn.com/w80/ca.png',
  'Spain': 'https://flagcdn.com/w80/es.png',
}

export function PlayerCard({ player, clueMode, isRevealed, delay = 0 }: PlayerCardProps) {
  const coords = POSITION_COORDS[player.position]
  const isInternational = player.college === 'N/A'

  const renderClue = () => {
    if (isRevealed) {
      return (
        <motion.div
          className="flex flex-col items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <div className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-full overflow-hidden bg-muted ring-2 ring-primary">
            <Image
              src={player.headshotUrl}
              alt={player.name}
              fill
              className="object-cover object-top scale-150"
              unoptimized
            />
          </div>
          <span className="text-[10px] sm:text-xs font-medium text-foreground mt-1.5 text-center max-w-[90px] leading-tight">
            {player.name}
          </span>
        </motion.div>
      )
    }

    switch (clueMode) {
      case 'college':
        return (
          <div className="flex flex-col items-center justify-center w-full h-full">
            {isInternational ? (
              // Show country flag for international players
              <div className="relative w-10 h-10 sm:w-12 sm:h-12">
                <Image
                  src={COUNTRY_FLAGS[player.nationality] || 'https://flagcdn.com/w80/un.png'}
                  alt={player.nationality}
                  fill
                  className="object-contain rounded"
                  unoptimized
                />
              </div>
            ) : player.collegeLogo ? (
              <div className="relative w-10 h-10 sm:w-12 sm:h-12">
                <Image
                  src={player.collegeLogo}
                  alt={player.college}
                  fill
                  className="object-contain"
                  unoptimized
                />
              </div>
            ) : null}
            <span className="text-[8px] sm:text-[9px] text-muted-foreground/70 mt-1 text-center leading-tight">
              {isInternational ? player.nationality : player.college}
            </span>
          </div>
        )

      case 'stats':
        return (
          <div className="flex flex-col items-center justify-center">
            <span className="text-base sm:text-lg font-bold text-primary">{player.stat}</span>
            <span className="text-[8px] sm:text-[9px] text-muted-foreground/70">{player.statLabel}</span>
          </div>
        )

      case 'nationality':
        return (
          <div className="flex flex-col items-center justify-center">
            <div className="relative w-10 h-8 sm:w-12 sm:h-10">
              <Image
                src={COUNTRY_FLAGS[player.nationality] || 'https://flagcdn.com/w80/us.png'}
                alt={player.nationality}
                fill
                className="object-contain rounded"
                unoptimized
              />
            </div>
            <span className="text-[8px] sm:text-[9px] text-muted-foreground/70 mt-0.5">
              {player.nationality}
            </span>
          </div>
        )
    }
  }

  return (
    <motion.div
      className="absolute -translate-x-1/2 -translate-y-1/2"
      style={{ top: coords.top, left: coords.left }}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{
        type: 'spring',
        stiffness: 260,
        damping: 20,
        delay: delay,
      }}
    >
      {/* Position label - dark pill with white bold text */}
      <motion.div
        className="absolute -top-6 sm:-top-7 left-1/2 -translate-x-1/2 bg-zinc-900 text-white text-[10px] sm:text-xs font-bold px-2.5 py-1 rounded-full z-10 shadow-md"
        initial={{ y: -10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: delay + 0.2 }}
      >
        {player.position}
      </motion.div>

      {/* Card container - larger with ring */}
      <motion.div
        className={`
          relative rounded-full 
          bg-card
          flex items-center justify-center
          shadow-lg shadow-black/40
          ring-2 ring-orange-500/60
          ${isRevealed 
            ? 'w-auto h-auto min-w-[80px] min-h-[88px] sm:min-w-[90px] sm:min-h-[96px] rounded-2xl p-2' 
            : 'w-16 h-16 sm:w-20 sm:h-20'
          }
        `}
        whileHover={{ scale: 1.05 }}
        transition={{ type: 'spring', stiffness: 400, damping: 25 }}
      >
        {renderClue()}
      </motion.div>
    </motion.div>
  )
}
