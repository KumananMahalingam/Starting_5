'use client'

import { motion } from 'framer-motion'
import type { Player, ClueMode, Position } from '@/lib/game-data'
import { ClueImage } from '@/components/clue-image'
import { PlayerHeadshot } from '@/components/player-headshot'

interface PlayerCardProps {
  player: Player
  clueMode: ClueMode
  isRevealed: boolean
  delay?: number
}

const POSITION_COORDS: Record<Position, { top: string; left: string }> = {
  PG: { top: '18%', left: '50%' },
  SG: { top: '25%', left: '15%' },
  SF: { top: '25%', left: '85%' },
  PF: { top: '65%', left: '22%' },
  C:  { top: '72%', left: '50%' },
}

function hasCollege(player: Player) {
  return Boolean(player.college?.trim())
}

function hasNationality(player: Player) {
  const nationality = player.nationality?.trim()
  return Boolean(nationality && nationality !== 'Unknown')
}

export function PlayerCard({ player, clueMode, isRevealed, delay = 0 }: PlayerCardProps) {
  const coords = POSITION_COORDS[player.position]

  const renderClue = () => {
    if (isRevealed) {
      return (
        <motion.div
          className="flex flex-col items-center"
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.35 }}
        >
          <PlayerHeadshot name={player.name} headshotUrl={player.headshotUrl} size="sm" />
          <span className="text-[10px] sm:text-xs font-medium text-foreground mt-1.5 text-center max-w-[90px] leading-tight">
            {player.name}
          </span>
        </motion.div>
      )
    }

    switch (clueMode) {
      case 'college': {
        const collegeSrc = hasCollege(player)
          ? player.collegeLogo || player.collegeImage || ''
          : ''
        return (
          <div className="flex flex-col items-center justify-center w-full h-full">
            <ClueImage
              src={collegeSrc}
              alt={player.college || player.name}
              size={48}
            />
            <span className="sr-only">{player.college || player.nationality}</span>
          </div>
        )
      }

      case 'country': {
        const nationalitySrc = hasNationality(player) ? player.nationalityImage || '' : ''
        return (
          <div className="flex flex-col items-center justify-center w-full h-full">
            <ClueImage
              src={nationalitySrc}
              alt={player.nationality}
              variant="cover"
              size={48}
            />
            <span className="sr-only">{player.nationality}</span>
          </div>
        )
      }

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
      <motion.div
        className="absolute -top-6 sm:-top-7 left-1/2 -translate-x-1/2 bg-zinc-900 text-white text-[10px] sm:text-xs font-bold px-2.5 py-1 rounded-full z-10 shadow-md"
        initial={{ y: -10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: delay + 0.2 }}
      >
        {player.position}
      </motion.div>

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
        layout
      >
        {renderClue()}
      </motion.div>
    </motion.div>
  )
}
