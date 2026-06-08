'use client'

import { motion } from 'framer-motion'
import type { Player, Position } from '@/lib/game-data'
import { PlayerHeadshot } from '@/components/player-headshot'

interface StatsPlayerCardProps {
  player: Player
  isRevealed: boolean
  delay?: number
}

// Position coordinates as percentages — same layout as college mode
const POSITION_COORDS: Record<Position, { top: string; left: string }> = {
  PG: { top: '18%', left: '50%' },
  SG: { top: '25%', left: '15%' },
  SF: { top: '25%', left: '85%' },
  PF: { top: '65%', left: '22%' },
  C:  { top: '72%', left: '50%' },
}

export function StatsPlayerCard({ player, isRevealed, delay = 0 }: StatsPlayerCardProps) {
  const coords = POSITION_COORDS[player.position]

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
        delay,
      }}
    >
      {isRevealed ? (
        <motion.div
          className="flex flex-col items-center"
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.35 }}
        >
          <PlayerHeadshot name={player.name} headshotUrl={player.headshotUrl} />
          <span className="text-[10px] sm:text-xs font-semibold text-foreground mt-1.5 text-center max-w-[90px] leading-tight">
            {player.name}
          </span>
        </motion.div>
      ) : (
        /* Hidden: stats card */
        <motion.div
          className="relative"
          whileHover={{ scale: 1.04 }}
          transition={{ type: 'spring', stiffness: 400, damping: 25 }}
        >
          {/* Position pill above card */}
          <motion.div
            className="absolute -top-6 left-1/2 -translate-x-1/2 text-[10px] sm:text-xs font-bold px-2.5 py-1 rounded-full z-10 shadow-md whitespace-nowrap"
            style={{
              background: 'oklch(0.10 0.01 30)',
              color: 'white',
            }}
            initial={{ y: -8, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: delay + 0.2 }}
          >
            {player.position}
          </motion.div>

          {/* Stats card */}
          <div
            className="rounded-xl px-3 py-2.5 sm:px-4 sm:py-3 flex flex-col gap-1.5 shadow-lg"
            style={{
              background: 'oklch(0.20 0.01 30)',
              border: '1px solid oklch(0.35 0.04 45 / 0.6)',
              minWidth: '90px',
              maxWidth: '110px',
            }}
          >
            {/* Three stat rows */}
            {[
              { value: player.stats.pts.toFixed(1), label: 'PTS' },
              { value: player.stats.reb.toFixed(1), label: 'REB' },
              { value: player.stats.ast.toFixed(1), label: 'AST' },
            ].map(({ value, label }) => (
              <div key={label} className="flex items-baseline justify-between gap-2">
                <span
                  className="text-base sm:text-lg font-black tabular-nums leading-none"
                  style={{ color: 'oklch(0.70 0.18 45)' }}
                >
                  {value}
                </span>
                <span
                  className="text-[9px] sm:text-[10px] font-bold tracking-wider uppercase"
                  style={{ color: 'oklch(0.55 0.00 0)' }}
                >
                  {label}
                </span>
              </div>
            ))}
          </div>
        </motion.div>
      )}
    </motion.div>
  )
}