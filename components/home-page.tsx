'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import {
  getModeState,
  getPlayStreak,
  getTodayCompletedCount,
  getTotalModeCount,
  type GameMode,
} from '@/lib/daily-progress'

interface HomePageProps {
  onSelectMode: (mode: 'college' | 'country' | 'stats' | 'ppg') => void
}

// Mortarboard icon for College mode
function CollegeIcon() {
  return (
    <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Cap top */}
      <path
        d="M3 11L13 6L23 11L13 16L3 11Z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
        fill="currentColor"
        fillOpacity="0.15"
      />
      {/* Cap base / headband */}
      <path
        d="M6 13V17C6 18.5 9 20 13 20C17 20 20 18.5 20 17V13"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Tassel */}
      <path
        d="M23 11V16"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
      <circle cx="23" cy="17.5" r="1.5" fill="currentColor" />
    </svg>
  )
}

// Globe icon for Country mode
function CountryIcon() {
  return (
    <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="13" cy="13" r="10" stroke="currentColor" strokeWidth="1.7" />
      <ellipse cx="13" cy="13" rx="4.5" ry="10" stroke="currentColor" strokeWidth="1.7" />
      <line x1="3" y1="13" x2="23" y2="13" stroke="currentColor" strokeWidth="1.7" />
      <circle cx="13" cy="7.5" r="2" fill="currentColor" />
    </svg>
  )
}

// Bar chart icon for Stats mode
function StatsIcon() {
  return (
    <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Three bars, ascending */}
      <rect x="3" y="16" width="5" height="7" rx="1.5" fill="currentColor" />
      <rect x="10.5" y="10" width="5" height="13" rx="1.5" fill="currentColor" />
      <rect x="18" y="4" width="5" height="19" rx="1.5" fill="currentColor" />
      {/* Baseline */}
      <line x1="2" y1="23.5" x2="24" y2="23.5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  )
}

// Target icon for 100 PPG mode
function TargetIcon() {
  return (
    <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="13" cy="13" r="10" stroke="currentColor" strokeWidth="1.7" />
      <circle cx="13" cy="13" r="6" stroke="currentColor" strokeWidth="1.7" />
      <circle cx="13" cy="13" r="2" fill="currentColor" />
    </svg>
  )
}

export function HomePage({ onSelectMode }: HomePageProps) {
  const [streak, setStreak] = useState(0)
  const [completedToday, setCompletedToday] = useState(0)
  const [modeStatus, setModeStatus] = useState<Record<GameMode, 'new' | 'playing' | 'won' | 'lost'>>({
    college: 'new',
    country: 'new',
    stats: 'new',
    ppg: 'new',
  })
  const [hoveredCard, setHoveredCard] = useState<string | null>(null)

  useEffect(() => {
    setStreak(getPlayStreak())
    setCompletedToday(getTodayCompletedCount())
    setModeStatus({
      college: getModeState('college')?.status ?? 'new',
      country: getModeState('country')?.status ?? 'new',
      stats: getModeState('stats')?.status ?? 'new',
      ppg: getModeState('ppg')?.status ?? 'new',
    })
  }, [])

  const modes = [
    {
      id: 'college' as const,
      icon: <CollegeIcon />,
      title: 'College',
      description: 'Identify the team from player college logos',
    },
    {
      id: 'country' as const,
      icon: <CountryIcon />,
      title: 'Country',
      description: 'Identify the team from player national flags',
    },
    {
      id: 'stats' as const,
      icon: <StatsIcon />,
      title: 'Stats Mode',
      description: 'Identify the team from player statistics only',
    },
    {
      id: 'ppg' as const,
      icon: <TargetIcon />,
      title: '100 PPG',
      description: 'Build a 100-point starting five',
    },
  ]

  const getModeAction = (id: GameMode) => {
    const status = modeStatus[id]
    if (status === 'won') return { label: 'View result', done: true, outcome: 'won' as const }
    if (status === 'lost') return { label: 'View result', done: true, outcome: 'lost' as const }
    if (status === 'playing') return { label: 'Continue', done: false, outcome: null }
    return { label: 'Play', done: false, outcome: null }
  }

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-4 py-12 relative overflow-hidden">
      {/* Ambient background glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse 60% 50% at 50% 80%, oklch(0.35 0.06 45 / 0.15) 0%, transparent 70%)`,
        }}
      />

      {/* Subtle court lines decoration */}
      <svg
        className="absolute inset-0 w-full h-full opacity-5 pointer-events-none"
        viewBox="0 0 800 600"
        preserveAspectRatio="xMidYMid slice"
      >
        <circle cx="400" cy="580" r="200" fill="none" stroke="white" strokeWidth="2" />
        <ellipse cx="400" cy="580" r="60" fill="none" stroke="white" strokeWidth="2" />
        <line x1="100" y1="580" x2="700" y2="580" stroke="white" strokeWidth="2" />
      </svg>

      <motion.div
        className="relative z-10 flex flex-col items-center max-w-6xl w-full"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          {/* Basketball SVG icon — no emoji */}
          <motion.div
            className="flex justify-center mb-6"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20, delay: 0.2 }}
          >
            <div
              className="w-16 h-16 rounded-full flex items-center justify-center shadow-lg"
              style={{
                background: 'oklch(0.70 0.18 45)',
                boxShadow: '0 0 40px oklch(0.70 0.18 45 / 0.4)',
              }}
            >
              <svg width="34" height="34" viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="17" cy="17" r="15" stroke="rgba(0,0,0,0.35)" strokeWidth="2" fill="none" />
                {/* Vertical seam */}
                <path d="M17 2 C17 2 17 32 17 32" stroke="rgba(0,0,0,0.35)" strokeWidth="2" />
                {/* Horizontal seam */}
                <path d="M2 17 C2 17 32 17 32 17" stroke="rgba(0,0,0,0.35)" strokeWidth="2" />
                {/* Left curve */}
                <path d="M5 6 C10 12 10 22 5 28" stroke="rgba(0,0,0,0.35)" strokeWidth="2" fill="none" />
                {/* Right curve */}
                <path d="M29 6 C24 12 24 22 29 28" stroke="rgba(0,0,0,0.35)" strokeWidth="2" fill="none" />
              </svg>
            </div>
          </motion.div>

          <h1 className="text-5xl sm:text-6xl font-black tracking-tight text-foreground mb-3">
            Starting <span style={{ color: 'oklch(0.70 0.18 45)' }}>5</span>
          </h1>
          <p className="text-muted-foreground text-base sm:text-lg font-medium">
            Guess the NBA team from their starting lineup
          </p>
        </motion.div>

        {/* Mode Cards — 4-up on desktop, 2x2 on tablet, stacked on mobile */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full mb-10 items-stretch">
          {modes.map((mode, i) => {
            const action = getModeAction(mode.id)
            return (
            <motion.div
              key={mode.id}
              className="flex"
              initial={{ opacity: 0, x: i === 0 ? -20 : 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
              onMouseEnter={() => setHoveredCard(mode.id)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <motion.button
                onClick={() => onSelectMode(mode.id)}
                className="w-full h-full text-left rounded-2xl p-6 flex flex-col gap-4 border relative overflow-hidden"
                style={{
                  background: hoveredCard === mode.id
                    ? 'oklch(0.22 0.01 30)'
                    : 'oklch(0.18 0.01 30)',
                  borderColor: action.outcome === 'won'
                    ? 'oklch(0.55 0.15 145 / 0.5)'
                    : action.outcome === 'lost'
                    ? 'oklch(0.55 0.22 25 / 0.5)'
                    : hoveredCard === mode.id
                    ? 'oklch(0.70 0.18 45 / 0.5)'
                    : 'oklch(0.30 0.01 30)',
                  minHeight: '220px',
                }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: 'spring', stiffness: 400, damping: 25 }}
              >
                {/* Hover glow */}
                {hoveredCard === mode.id && (
                  <motion.div
                    className="absolute inset-0 pointer-events-none"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    style={{
                      background: 'radial-gradient(ellipse 80% 60% at 50% 100%, oklch(0.70 0.18 45 / 0.08) 0%, transparent 70%)',
                    }}
                  />
                )}

                {/* Icon — SVG in a tinted square */}
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{
                    background: 'oklch(0.70 0.18 45 / 0.18)',
                    color: 'oklch(0.70 0.18 45)',
                  }}
                >
                  {mode.icon}
                </div>

                {/* Text */}
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h2 className="text-xl font-bold text-foreground">{mode.title}</h2>
                    {action.outcome && (
                      <span
                        className="text-[10px] font-bold uppercase tracking-wide px-2 py-0.5 rounded-full"
                        style={{
                          background: action.outcome === 'won'
                            ? 'oklch(0.55 0.15 145 / 0.2)'
                            : 'oklch(0.55 0.22 25 / 0.2)',
                          color: action.outcome === 'won'
                            ? 'oklch(0.65 0.18 145)'
                            : 'oklch(0.65 0.22 25)',
                        }}
                      >
                        {action.outcome === 'won' ? 'Won' : 'Lost'}
                      </span>
                    )}
                  </div>
                  <p className="text-muted-foreground text-sm leading-relaxed">{mode.description}</p>
                </div>

                {/* Action button — always at bottom */}
                <div
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm self-start flex-shrink-0"
                  style={{
                    background: action.done
                      ? 'oklch(0.25 0.01 30)'
                      : 'oklch(0.70 0.18 45)',
                    color: action.done ? 'oklch(0.75 0 0)' : 'oklch(0.10 0.01 30)',
                    border: action.done ? '1px solid oklch(0.35 0.01 30)' : 'none',
                  }}
                >
                  {action.label}
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor">
                    <path d="M3.5 1.5L9.5 6L3.5 10.5V1.5Z" />
                  </svg>
                </div>
              </motion.button>
            </motion.div>
            )
          })}
        </div>

        {/* Footer */}
        <motion.div
          className="flex flex-col items-center gap-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <div
            className="flex items-center gap-2 px-4 py-2 rounded-full border"
            style={{
              background: 'oklch(0.70 0.18 45 / 0.1)',
              borderColor: 'oklch(0.70 0.18 45 / 0.3)',
            }}
          >
            {/* Flame SVG instead of emoji */}
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path
                d="M8 14C5.2 14 3 11.8 3 9c0-2.4 1.5-4.2 3-5.5C6.5 5 7 6.5 7 6.5c0-2-1-4-1-4C9.5 3.5 13 6.5 13 9c0 2.8-2.2 5-5 5Z"
                fill="oklch(0.70 0.18 45)"
              />
              <path
                d="M8 14C6.3 14 5 12.6 5 11c0-1.2.8-2.2 1.5-2.8C6.5 9 7 9.8 7 9.8c0-1-.5-2-.5-2C9 8.5 11 9.8 11 11c0 1.6-1.3 3-3 3Z"
                fill="oklch(0.85 0.15 55)"
              />
            </svg>
            <span className="font-bold text-sm" style={{ color: 'oklch(0.70 0.18 45)' }}>
              {streak} day streak
            </span>
          </div>
          <p className="text-xs text-muted-foreground">
            {completedToday}/{getTotalModeCount()} puzzles played today · New puzzles at midnight
          </p>
        </motion.div>
      </motion.div>
    </div>
  )
}