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

// Position coordinates as percentages
const POSITION_COORDS: Record<Position, { top: string; left: string }> = {
  PG: { top: '12%', left: '50%' },   // Top center near half court
  SG: { top: '18%', left: '20%' },   // Top left
  SF: { top: '18%', left: '80%' },   // Top right
  PF: { top: '55%', left: '18%' },   // Bottom left near block
  C: { top: '58%', left: '50%' },    // Bottom center near paint
}

export function PlayerCard({ player, clueMode, isRevealed, delay = 0 }: PlayerCardProps) {
  const coords = POSITION_COORDS[player.position]

  const renderClue = () => {
    if (isRevealed) {
      return (
        <motion.div
          className="flex flex-col items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <div className="relative w-12 h-12 sm:w-14 sm:h-14 rounded-full overflow-hidden bg-muted border-2 border-primary">
            <Image
              src={player.headshotUrl}
              alt={player.name}
              fill
              className="object-cover object-top scale-150"
              unoptimized
            />
          </div>
          <span className="text-[10px] sm:text-xs font-medium text-foreground mt-1 text-center max-w-[80px] leading-tight">
            {player.name}
          </span>
        </motion.div>
      )
    }

    switch (clueMode) {
      case 'college':
        return (
          <div className="flex flex-col items-center justify-center w-full h-full">
            {player.collegeLogo ? (
              <div className="relative w-8 h-8 sm:w-10 sm:h-10">
                <Image
                  src={player.collegeLogo}
                  alt={player.college}
                  fill
                  className="object-contain"
                  unoptimized
                />
              </div>
            ) : (
              <span className="text-[10px] text-muted-foreground font-medium">INT&apos;L</span>
            )}
            <span className="text-[9px] sm:text-[10px] text-muted-foreground mt-1 text-center leading-tight">
              {player.college !== 'N/A' ? player.college : 'International'}
            </span>
          </div>
        )

      case 'stats':
        return (
          <div className="flex flex-col items-center justify-center">
            <span className="text-sm sm:text-base font-bold text-primary">{player.stat}</span>
            <span className="text-[9px] text-muted-foreground">{player.statLabel}</span>
          </div>
        )

      case 'nationality':
        return (
          <div className="flex flex-col items-center justify-center">
            <span className="text-2xl sm:text-3xl">{player.nationalityFlag}</span>
            <span className="text-[9px] sm:text-[10px] text-muted-foreground mt-0.5">
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
      {/* Position label */}
      <motion.div
        className="absolute -top-5 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground text-[10px] sm:text-xs font-bold px-2 py-0.5 rounded-full z-10"
        initial={{ y: -10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: delay + 0.2 }}
      >
        {player.position}
      </motion.div>

      {/* Card container */}
      <motion.div
        className={`
          relative w-14 h-14 sm:w-16 sm:h-16 rounded-full 
          bg-card border-2 border-border
          flex items-center justify-center
          shadow-lg shadow-black/30
          ${isRevealed ? 'h-auto min-h-[72px] sm:min-h-[80px] rounded-xl p-2' : ''}
        `}
        whileHover={{ scale: 1.05 }}
        transition={{ type: 'spring', stiffness: 400, damping: 25 }}
      >
        {renderClue()}
      </motion.div>
    </motion.div>
  )
}
