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
const POSITION_COORDS: Record<Position, { top: string; left: string }> = {
  PG: { top: '18%', left: '50%' },
  SG: { top: '25%', left: '15%' },
  SF: { top: '25%', left: '85%' },
  PF: { top: '65%', left: '22%' },
  C:  { top: '72%', left: '50%' },
}

export function PlayerCard({ player, clueMode, isRevealed, delay = 0 }: PlayerCardProps) {
  const coords = POSITION_COORDS[player.position]
  const isInternational = player.college === 'None (International)' || player.college === 'N/A'

  // Use nationalityCode for flagcdn if available, otherwise fall back to name-based mapping
  const getFlagUrl = (player: Player) => {
    if (player.nationalityCode) {
      return `https://flagcdn.com/w80/${player.nationalityCode}.png`
    }
    // Legacy fallback
    const legacyMap: Record<string, string> = {
      'Latvia': 'lv',
      'Dominican Republic': 'do',
      'France': 'fr',
      'Serbia': 'rs',
      'Australia': 'au',
      'Slovenia': 'si',
      'Germany': 'de',
      'Greece': 'gr',
      'Canada': 'ca',
      'Spain': 'es',
    }
    const code = legacyMap[player.nationality] || 'un'
    return `https://flagcdn.com/w80/${code}.png`
  }

  const renderClue = () => {
    if (isRevealed) {
      return (
        <motion.div
          className="flex flex-col items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <div
            className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-full overflow-hidden bg-muted ring-2"
            style={{ outline: '2px solid oklch(0.70 0.18 45)' }}
          >
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
              <div className="relative w-10 h-10 sm:w-12 sm:h-12">
                <Image
                  src={getFlagUrl(player)}
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
            <span className="text-base sm:text-lg font-bold text-primary">
              {player.stats.pts.toFixed(1)} PTS
            </span>
            <span className="text-[8px] sm:text-[9px] text-muted-foreground/70">Per Game</span>
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
      {/* Position label */}
      <motion.div
        className="absolute -top-6 sm:-top-7 left-1/2 -translate-x-1/2 bg-zinc-900 text-white text-[10px] sm:text-xs font-bold px-2.5 py-1 rounded-full z-10 shadow-md"
        initial={{ y: -10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: delay + 0.2 }}
      >
        {player.position}
      </motion.div>

      {/* Card container */}
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