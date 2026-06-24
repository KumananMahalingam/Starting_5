'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import {
  getModeState,
  getPlayStreak,
  type GameMode,
} from '@/lib/daily-progress'

type DailyModeId = 'college' | 'country' | 'stats'

// The three modes that reset every midnight.
const DAILY_MODE_IDS: DailyModeId[] = ['college', 'country', 'stats']

// ── Icons ────────────────────────────────────────────────────────────
function CollegeIcon() {
  return (
    <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M3 11L13 6L23 11L13 16L3 11Z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" fill="currentColor" fillOpacity="0.15" />
      <path d="M6 13V17C6 18.5 9 20 13 20C17 20 20 18.5 20 17V13" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M23 11V16" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
      <circle cx="23" cy="17.5" r="1.5" fill="currentColor" />
    </svg>
  )
}

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

function StatsIcon() {
  return (
    <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="3" y="16" width="5" height="7" rx="1.5" fill="currentColor" />
      <rect x="10.5" y="10" width="5" height="13" rx="1.5" fill="currentColor" />
      <rect x="18" y="4" width="5" height="19" rx="1.5" fill="currentColor" />
      <line x1="2" y1="23.5" x2="24" y2="23.5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  )
}

function TargetIcon({ size = 26 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="13" cy="13" r="10" stroke="currentColor" strokeWidth="1.7" />
      <circle cx="13" cy="13" r="6" stroke="currentColor" strokeWidth="1.7" />
      <circle cx="13" cy="13" r="2" fill="currentColor" />
    </svg>
  )
}

// Calendar icon for the Daily Challenge square
function CalendarIcon({ size = 26 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="3.5" y="5.5" width="19" height="17" rx="2.5" stroke="currentColor" strokeWidth="1.7" />
      <line x1="3.5" y1="10" x2="22.5" y2="10" stroke="currentColor" strokeWidth="1.7" />
      <line x1="8" y1="3" x2="8" y2="7" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
      <line x1="18" y1="3" x2="18" y2="7" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
      <circle cx="13" cy="15.5" r="1.6" fill="currentColor" />
    </svg>
  )
}

function FlameIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M8 14C5.2 14 3 11.8 3 9c0-2.4 1.5-4.2 3-5.5C6.5 5 7 6.5 7 6.5c0-2-1-4-1-4C9.5 3.5 13 6.5 13 9c0 2.8-2.2 5-5 5Z" fill="oklch(0.70 0.18 45)" />
      <path d="M8 14C6.3 14 5 12.6 5 11c0-1.2.8-2.2 1.5-2.8C6.5 9 7 9.8 7 9.8c0-1-.5-2-.5-2C9 8.5 11 9.8 11 11c0 1.6-1.3 3-3 3Z" fill="oklch(0.85 0.15 55)" />
    </svg>
  )
}

function HomeIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M2 7.5L9 2L16 7.5V16H11.5V11H6.5V16H2V7.5Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" fill="none" />
    </svg>
  )
}

function PlayChevron() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor">
      <path d="M3.5 1.5L9.5 6L3.5 10.5V1.5Z" />
    </svg>
  )
}

// Shared ambient background + court lines
function Backdrop() {
  return (
    <>
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: `radial-gradient(ellipse 60% 50% at 50% 80%, oklch(0.35 0.06 45 / 0.15) 0%, transparent 70%)` }}
      />
      <svg className="absolute inset-0 w-full h-full opacity-5 pointer-events-none" viewBox="0 0 800 600" preserveAspectRatio="xMidYMid slice">
        <circle cx="400" cy="580" r="200" fill="none" stroke="white" strokeWidth="2" />
        <ellipse cx="400" cy="580" r="60" fill="none" stroke="white" strokeWidth="2" />
        <line x1="100" y1="580" x2="700" y2="580" stroke="white" strokeWidth="2" />
      </svg>
    </>
  )
}

function StreakPill({ streak }: { streak: number }) {
  return (
    <div
      className="flex items-center gap-2 px-4 py-2 rounded-full border"
      style={{ background: 'oklch(0.70 0.18 45 / 0.1)', borderColor: 'oklch(0.70 0.18 45 / 0.3)' }}
    >
      <FlameIcon />
      <span className="font-bold text-sm" style={{ color: 'oklch(0.70 0.18 45)' }}>
        {streak} day streak
      </span>
    </div>
  )
}


// ── Landing: two squares ─────────────────────────────────────────────
interface HomePageProps {
  onSelectSection: (section: 'daily' | 'anytime') => void
}

export function HomePage({ onSelectSection }: HomePageProps) {
  const [streak, setStreak] = useState(0)
  const [dailyCompleted, setDailyCompleted] = useState(0)
  const [hovered, setHovered] = useState<'daily' | 'anytime' | null>(null)

  useEffect(() => {
    setStreak(getPlayStreak())
    setDailyCompleted(
      DAILY_MODE_IDS.filter((id) => {
        const s = getModeState(id)?.status
        return s === 'won' || s === 'lost'
      }).length
    )
  }, [])

  const squares = [
    {
      id: 'daily' as const,
      icon: <CalendarIcon size={30} />,
      title: 'Daily Challenge',
      description: 'College, Country & Stats — three fresh puzzles every day.',
      footer: `${dailyCompleted}/3 played today`,
      cta: 'Enter',
    },
    {
      id: 'anytime' as const,
      icon: <TargetIcon size={30} />,
      title: 'Play Anytime',
      description: '100 PPG — build a 100-point starting five. Unlimited runs.',
      footer: 'No daily limit',
      cta: 'Play',
    },
  ]

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-4 py-12 relative overflow-hidden">
      <Backdrop />

      <motion.div
        className="relative z-10 flex flex-col items-center max-w-3xl w-full"
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
          <motion.div
            className="flex justify-center mb-6"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20, delay: 0.2 }}
          >
            <div
              className="w-16 h-16 rounded-full flex items-center justify-center shadow-lg"
              style={{ background: 'oklch(0.70 0.18 45)', boxShadow: '0 0 40px oklch(0.70 0.18 45 / 0.4)' }}
            >
              <svg width="34" height="34" viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="17" cy="17" r="15" stroke="rgba(0,0,0,0.35)" strokeWidth="2" fill="none" />
                <path d="M17 2 C17 2 17 32 17 32" stroke="rgba(0,0,0,0.35)" strokeWidth="2" />
                <path d="M2 17 C2 17 32 17 32 17" stroke="rgba(0,0,0,0.35)" strokeWidth="2" />
                <path d="M5 6 C10 12 10 22 5 28" stroke="rgba(0,0,0,0.35)" strokeWidth="2" fill="none" />
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

        {/* Two squares */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 w-full mb-10 items-stretch">
          {squares.map((sq, i) => (
            <motion.div
              key={sq.id}
              className="flex"
              initial={{ opacity: 0, x: i === 0 ? -24 : 24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 + i * 0.12 }}
              onMouseEnter={() => setHovered(sq.id)}
              onMouseLeave={() => setHovered(null)}
            >
              <motion.button
                onClick={() => onSelectSection(sq.id)}
                className="w-full text-left rounded-2xl p-7 flex flex-col gap-5 border relative overflow-hidden"
                style={{
                  background: hovered === sq.id ? 'oklch(0.22 0.01 30)' : 'oklch(0.18 0.01 30)',
                  borderColor: hovered === sq.id ? 'oklch(0.70 0.18 45 / 0.5)' : 'oklch(0.30 0.01 30)',
                  minHeight: '280px',
                }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: 'spring', stiffness: 400, damping: 25 }}
              >
                {hovered === sq.id && (
                  <motion.div
                    className="absolute inset-0 pointer-events-none"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    style={{ background: 'radial-gradient(ellipse 80% 60% at 50% 100%, oklch(0.70 0.18 45 / 0.1) 0%, transparent 70%)' }}
                  />
                )}

                <div
                  className="w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: 'oklch(0.70 0.18 45 / 0.18)', color: 'oklch(0.70 0.18 45)' }}
                >
                  {sq.icon}
                </div>

                <div className="flex-1">
                  <h2 className="text-2xl font-black text-foreground mb-2">{sq.title}</h2>
                  <p className="text-muted-foreground text-sm leading-relaxed">{sq.description}</p>
                </div>

                <div className="flex items-center justify-between">
                  <div
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm"
                    style={{ background: 'oklch(0.70 0.18 45)', color: 'oklch(0.10 0.01 30)' }}
                  >
                    {sq.cta}
                    <PlayChevron />
                  </div>
                  <span className="text-[11px] font-medium text-muted-foreground">{sq.footer}</span>
                </div>
              </motion.button>
            </motion.div>
          ))}
        </div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}>
          <StreakPill streak={streak} />
        </motion.div>
      </motion.div>
    </div>
  )
}

// ── Daily Challenge page: the three daily mode cards ─────────────────
interface DailyChallengePageProps {
  onSelectMode: (mode: DailyModeId) => void
  onBack: () => void
}

export function DailyChallengePage({ onSelectMode, onBack }: DailyChallengePageProps) {
  const [streak, setStreak] = useState(0)
  const [modeStatus, setModeStatus] = useState<Record<DailyModeId, 'new' | 'playing' | 'won' | 'lost'>>({
    college: 'new',
    country: 'new',
    stats: 'new',
  })
  const [hoveredCard, setHoveredCard] = useState<string | null>(null)

  useEffect(() => {
    setStreak(getPlayStreak())
    setModeStatus({
      college: getModeState('college')?.status ?? 'new',
      country: getModeState('country')?.status ?? 'new',
      stats: getModeState('stats')?.status ?? 'new',
    })
  }, [])

  const dailyCompleted = DAILY_MODE_IDS.filter(
    (id) => modeStatus[id] === 'won' || modeStatus[id] === 'lost'
  ).length

  const modes = [
    { id: 'college' as const, icon: <CollegeIcon />, title: 'College', description: 'Identify the team from player college logos' },
    { id: 'country' as const, icon: <CountryIcon />, title: 'Country', description: 'Identify the team from player national flags' },
    { id: 'stats' as const, icon: <StatsIcon />, title: 'Stats Mode', description: 'Identify the team from player statistics only' },
  ]

  const getModeAction = (id: GameMode) => {
    const status = modeStatus[id as DailyModeId]
    if (status === 'won') return { label: 'View result', done: true, outcome: 'won' as const }
    if (status === 'lost') return { label: 'View result', done: true, outcome: 'lost' as const }
    if (status === 'playing') return { label: 'Continue', done: false, outcome: null }
    return { label: 'Play', done: false, outcome: null }
  }

  return (
    <div className="min-h-screen bg-background flex flex-col items-center px-4 py-10 sm:py-14 relative overflow-hidden">
      <Backdrop />

      <motion.div
        className="relative z-10 flex flex-col items-center max-w-5xl w-full"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Header row */}
        <div className="flex items-center justify-between w-full mb-10">
          <motion.button
            onClick={onBack}
            className="flex items-center justify-center w-9 h-9 rounded-xl border"
            style={{ background: 'oklch(0.18 0.01 30)', borderColor: 'oklch(0.30 0.01 30)', color: 'oklch(0.65 0 0)' }}
            whileHover={{ scale: 1.08, borderColor: 'oklch(0.70 0.18 45 / 0.5)' }}
            whileTap={{ scale: 0.94 }}
            title="Back to home"
          >
            <HomeIcon />
          </motion.button>

          <div className="flex flex-col items-center">
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-foreground leading-none">
              Starting <span style={{ color: 'oklch(0.70 0.18 45)' }}>5</span>
            </h1>
            <span className="text-[11px] font-semibold tracking-widest uppercase mt-1" style={{ color: 'oklch(0.55 0 0)' }}>
              Daily Challenge
            </span>
          </div>

          <StreakPill streak={streak} />
        </div>

        {/* Three cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full mb-8 items-stretch">
          {modes.map((mode, i) => {
            const action = getModeAction(mode.id)
            return (
              <motion.div
                key={mode.id}
                className="flex"
                initial={{ opacity: 0, x: i === 0 ? -20 : 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
                onMouseEnter={() => setHoveredCard(mode.id)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                <motion.button
                  onClick={() => onSelectMode(mode.id)}
                  className="w-full h-full text-left rounded-2xl p-6 flex flex-col gap-4 border relative overflow-hidden"
                  style={{
                    background: hoveredCard === mode.id ? 'oklch(0.22 0.01 30)' : 'oklch(0.18 0.01 30)',
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
                  {hoveredCard === mode.id && (
                    <motion.div
                      className="absolute inset-0 pointer-events-none"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      style={{ background: 'radial-gradient(ellipse 80% 60% at 50% 100%, oklch(0.70 0.18 45 / 0.08) 0%, transparent 70%)' }}
                    />
                  )}

                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background: 'oklch(0.70 0.18 45 / 0.18)', color: 'oklch(0.70 0.18 45)' }}
                  >
                    {mode.icon}
                  </div>

                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h2 className="text-xl font-bold text-foreground">{mode.title}</h2>
                      {action.outcome && (
                        <span
                          className="text-[10px] font-bold uppercase tracking-wide px-2 py-0.5 rounded-full"
                          style={{
                            background: action.outcome === 'won' ? 'oklch(0.55 0.15 145 / 0.2)' : 'oklch(0.55 0.22 25 / 0.2)',
                            color: action.outcome === 'won' ? 'oklch(0.65 0.18 145)' : 'oklch(0.65 0.22 25)',
                          }}
                        >
                          {action.outcome === 'won' ? 'Won' : 'Lost'}
                        </span>
                      )}
                    </div>
                    <p className="text-muted-foreground text-sm leading-relaxed">{mode.description}</p>
                  </div>

                  <div
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm self-start flex-shrink-0"
                    style={{
                      background: action.done ? 'oklch(0.25 0.01 30)' : 'oklch(0.70 0.18 45)',
                      color: action.done ? 'oklch(0.75 0 0)' : 'oklch(0.10 0.01 30)',
                      border: action.done ? '1px solid oklch(0.35 0.01 30)' : 'none',
                    }}
                  >
                    {action.label}
                    <PlayChevron />
                  </div>
                </motion.button>
              </motion.div>
            )
          })}
        </div>

        <p className="text-xs text-muted-foreground">
          {dailyCompleted}/3 daily puzzles played today · New puzzles at midnight
        </p>
      </motion.div>
    </div>
  )
}


// ── Play Anytime page: the anytime game cards (currently just 100 PPG) ──
interface PlayAnytimePageProps {
  onSelectMode: (mode: 'ppg') => void
  onBack: () => void
}

export function PlayAnytimePage({ onSelectMode, onBack }: PlayAnytimePageProps) {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null)

  const modes = [
    {
      id: 'ppg' as const,
      icon: <TargetIcon />,
      title: '100 PPG',
      description: 'Spin five franchises and build a starting five that scores exactly 100 points per game.',
    },
  ]

  return (
    <div className="min-h-screen bg-background flex flex-col items-center px-4 py-10 sm:py-14 relative overflow-hidden">
      <Backdrop />

      <motion.div
        className="relative z-10 flex flex-col items-center max-w-5xl w-full"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Header row */}
        <div className="flex items-center justify-between w-full mb-10">
          <motion.button
            onClick={onBack}
            className="flex items-center justify-center w-9 h-9 rounded-xl border"
            style={{ background: 'oklch(0.18 0.01 30)', borderColor: 'oklch(0.30 0.01 30)', color: 'oklch(0.65 0 0)' }}
            whileHover={{ scale: 1.08, borderColor: 'oklch(0.70 0.18 45 / 0.5)' }}
            whileTap={{ scale: 0.94 }}
            title="Back to home"
          >
            <HomeIcon />
          </motion.button>

          <div className="flex flex-col items-center">
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-foreground leading-none">
              Starting <span style={{ color: 'oklch(0.70 0.18 45)' }}>5</span>
            </h1>
            <span className="text-[11px] font-semibold tracking-widest uppercase mt-1" style={{ color: 'oklch(0.55 0 0)' }}>
              Play Anytime
            </span>
          </div>

          {/* Spacer to keep the title centered (no streak on anytime page) */}
          <div className="w-9" />
        </div>

        {/* Cards — centered */}
        <div className="flex justify-center w-full mb-8">
          {modes.map((mode, i) => (
            <motion.div
              key={mode.id}
              className="flex w-full max-w-sm"
              initial={{ opacity: 0, x: i === 0 ? -20 : 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
              onMouseEnter={() => setHoveredCard(mode.id)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <motion.button
                onClick={() => onSelectMode(mode.id)}
                className="w-full h-full text-left rounded-2xl p-6 flex flex-col gap-4 border relative overflow-hidden"
                style={{
                  background: hoveredCard === mode.id ? 'oklch(0.22 0.01 30)' : 'oklch(0.18 0.01 30)',
                  borderColor: hoveredCard === mode.id ? 'oklch(0.70 0.18 45 / 0.5)' : 'oklch(0.30 0.01 30)',
                  minHeight: '220px',
                }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: 'spring', stiffness: 400, damping: 25 }}
              >
                {hoveredCard === mode.id && (
                  <motion.div
                    className="absolute inset-0 pointer-events-none"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    style={{ background: 'radial-gradient(ellipse 80% 60% at 50% 100%, oklch(0.70 0.18 45 / 0.08) 0%, transparent 70%)' }}
                  />
                )}

                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: 'oklch(0.70 0.18 45 / 0.18)', color: 'oklch(0.70 0.18 45)' }}
                >
                  {mode.icon}
                </div>

                <div className="flex-1">
                  <h2 className="text-xl font-bold text-foreground mb-1">{mode.title}</h2>
                  <p className="text-muted-foreground text-sm leading-relaxed">{mode.description}</p>
                </div>

                <div
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm self-start flex-shrink-0"
                  style={{ background: 'oklch(0.70 0.18 45)', color: 'oklch(0.10 0.01 30)' }}
                >
                  Play
                  <PlayChevron />
                </div>
              </motion.button>
            </motion.div>
          ))}
        </div>

        <p className="text-xs text-muted-foreground">Play as many runs as you like · No daily limit</p>
      </motion.div>
    </div>
  )
}
