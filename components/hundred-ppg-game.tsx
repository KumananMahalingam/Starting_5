'use client'

/**
 * 100 PPG — build a 5-man starting lineup (PG·SG·SF·PF·C) whose combined
 * single-season scoring averages reach 100 points per game.
 *
 * ── Assumptions (flag if wrong) ──────────────────────────────────────
 * 1. Player pool = a franchise's ALL-TIME starter history (every player who
 *    started a season for that team in the dataset), not the current roster.
 * 2. A franchise CAN be used more than once across the 5 positions — chosen
 *    teams are not removed from the randomizer pool.
 * 3. The spinner requires a manual tap to spin (it does not auto-spin on load),
 *    and a spin can be re-rolled freely until the user hits "Continue" — after
 *    that the team is locked for that position.
 * 4. This mode counts as one of the daily "puzzles played" alongside College /
 *    Country / Stats. A completed run (5 positions filled) is recorded once.
 *
 * ── Data / trades note ───────────────────────────────────────────────
 * Data comes from the same local `thing.db` dataset as the daily puzzles via
 * /api/ppg/*. Each (player, team, season) row carries that season's PPG, so a
 * traded player only surfaces the seasons attributable to the selected
 * franchise. A player with a single franchise season skips the multi-row
 * season list and shows one season card with a single "Lock in" action.
 */

import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import confetti from 'canvas-confetti'
import { BasketballIcon } from '@/components/basketball-icon'
import {
  getPlayStreak,
  recordModeComplete,
} from '@/lib/daily-progress'
import type {
  FranchisePlayer,
  FranchiseRoster,
  FranchiseSeason,
  FranchiseTeam,
  Position,
} from '@/lib/game-data'

const POSITIONS: Position[] = ['PG', 'SG', 'SF', 'PF', 'C']
const TARGET = 100
// You win only if the lineup lands within ±0.9 PPG of 100 — anything outside
// that band (too low OR overshooting) is a loss.
const WIN_TOLERANCE = 0.9
// The player gets exactly one re-spin for the ENTIRE run (not per position).
const MAX_RESPINS = 1

function isWin(total: number): boolean {
  return Math.abs(total - TARGET) <= WIN_TOLERANCE
}

interface LockedSlot {
  position: Position
  team: FranchiseTeam
  playerName: string
  headshotUrl: string
  season: string
  ppg: number
}

type Step = 'spin' | 'player' | 'season'

interface HundredPpgGameProps {
  onBack: () => void
}

/** Color tier for the running total: gold in the win band, orange ≥ 80, else white. */
function totalColor(total: number): string {
  if (isWin(total)) return 'oklch(0.78 0.16 140)'
  if (total >= 80) return 'oklch(0.70 0.18 45)'
  return 'oklch(0.96 0 0)'
}

function fmt(n: number): string {
  return n.toFixed(1)
}

function HomeIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M2 7.5L9 2L16 7.5V16H11.5V11H6.5V16H2V7.5Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" fill="none" />
    </svg>
  )
}

function FlameIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <path d="M7 13C4.8 13 3 11.2 3 9c0-2 1.3-3.5 2.5-4.5C5.5 5.5 6 6.8 6 6.8c0-1.7-.8-3.3-.8-3.3C8.5 4 11 6.5 11 9c0 2.2-1.8 4-4 4Z" fill="oklch(0.70 0.18 45)" />
      <path d="M7 13C5.6 13 4.5 11.8 4.5 10.5c0-1 .7-1.8 1.2-2.3C5.7 8.8 6 9.5 6 9.5c0-.8-.4-1.7-.4-1.7C8 8.3 9.5 9.4 9.5 10.5c0 1.4-1.1 2.5-2.5 2.5Z" fill="oklch(0.85 0.15 55)" />
    </svg>
  )
}

function LockIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="4.5" y="9.5" width="13" height="9" rx="2.2" stroke="currentColor" strokeWidth="1.8" />
      <path d="M7.5 9.5V7a3.5 3.5 0 0 1 7 0v2.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <circle cx="11" cy="13.5" r="1.4" fill="currentColor" />
    </svg>
  )
}

/** Small image that falls back to a basketball icon if the source 404s. */
function SafeImage({ src, alt, className }: { src: string; alt: string; className?: string }) {
  const [failed, setFailed] = useState(false)
  if (!src || failed) {
    return (
      <div className={`flex items-center justify-center ${className ?? ''}`}>
        <BasketballIcon size={20} />
      </div>
    )
  }
  return (
    <Image src={src} alt={alt} fill sizes="64px" unoptimized className="object-contain" onError={() => setFailed(true)} />
  )
}


/** The PG·SG·SF·PF·C strip at the top. Active (next-to-fill) slot glows.
 *  PPG stays hidden during play (`reveal=false`) so it can't guide picks. */
function SlotStrip({
  slots,
  activeIndex,
  phase,
  reveal,
}: {
  slots: (LockedSlot | null)[]
  activeIndex: number
  phase: 'building' | 'results'
  reveal: boolean
}) {
  return (
    <div className="grid grid-cols-5 gap-2 sm:gap-3">
      {POSITIONS.map((pos, i) => {
        const slot = slots[i]
        const isActive = phase === 'building' && i === activeIndex
        return (
          <div
            key={pos}
            className="flex flex-col items-center rounded-xl border px-1.5 py-2.5 sm:px-2 sm:py-3 text-center transition-colors"
            style={{
              background: slot ? 'oklch(0.20 0.01 30)' : 'oklch(0.16 0.01 30)',
              borderColor: isActive
                ? 'oklch(0.70 0.18 45)'
                : slot
                ? 'oklch(0.30 0.01 30)'
                : 'oklch(0.26 0.01 30)',
              boxShadow: isActive ? '0 0 18px oklch(0.70 0.18 45 / 0.35)' : 'none',
            }}
          >
            <span
              className="text-[10px] font-bold uppercase tracking-widest"
              style={{ color: isActive ? 'oklch(0.70 0.18 45)' : 'oklch(0.58 0 0)' }}
            >
              {pos}
            </span>

            {slot ? (
              <div className="mt-1.5 flex w-full flex-col items-center gap-1">
                <div className="flex items-center justify-center gap-1">
                  <div className="relative h-5 w-5 shrink-0">
                    <SafeImage src={slot.team.logoUrl} alt={slot.team.fullName} />
                  </div>
                  <div className="relative h-6 w-6 shrink-0 overflow-hidden rounded-full bg-muted">
                    <SafeImage src={slot.headshotUrl} alt={slot.playerName} />
                  </div>
                </div>
                <span className="line-clamp-1 w-full text-[9px] font-semibold leading-tight text-foreground">
                  {slot.playerName}
                </span>
                <span className="text-[8px] text-muted-foreground">{slot.season}</span>
                {reveal ? (
                  <span className="text-[11px] font-black" style={{ color: 'oklch(0.70 0.18 45)' }}>
                    {fmt(slot.ppg)}
                  </span>
                ) : (
                  <span className="text-[10px] font-bold tracking-[0.2em] text-muted-foreground" title="Hidden until the end">
                    •••
                  </span>
                )}
              </div>
            ) : (
              <span className="mt-3 text-[9px] font-medium text-muted-foreground">empty</span>
            )}
          </div>
        )
      })}
    </div>
  )
}

export function HundredPpgGame({ onBack }: HundredPpgGameProps) {
  const [streak, setStreak] = useState(0)
  const [allTeams, setAllTeams] = useState<FranchiseTeam[]>([])
  const [loadError, setLoadError] = useState<string | null>(null)

  const [slots, setSlots] = useState<(LockedSlot | null)[]>([null, null, null, null, null])
  const [phase, setPhase] = useState<'building' | 'results'>('building')
  const [step, setStep] = useState<Step>('spin')

  // Spin state
  const [spinning, setSpinning] = useState(false)
  const [spinFace, setSpinFace] = useState<FranchiseTeam | null>(null)
  const [landedTeam, setLandedTeam] = useState<FranchiseTeam | null>(null)
  const [respinsUsed, setRespinsUsed] = useState(0)
  const spinTimer = useRef<ReturnType<typeof setInterval> | null>(null)

  // Roster / picks
  const [roster, setRoster] = useState<FranchiseRoster | null>(null)
  const [rosterLoading, setRosterLoading] = useState(false)
  const [rosterError, setRosterError] = useState<string | null>(null)
  const [selectedPlayer, setSelectedPlayer] = useState<FranchisePlayer | null>(null)
  const [search, setSearch] = useState('')

  const recordedRef = useRef(false)

  const activeIndex = useMemo(() => {
    const idx = slots.findIndex((s) => s === null)
    return idx === -1 ? POSITIONS.length - 1 : idx
  }, [slots])

  const activePosition = POSITIONS[activeIndex]
  const canRespin = respinsUsed < MAX_RESPINS

  const total = useMemo(
    () => slots.reduce((sum, s) => sum + (s?.ppg ?? 0), 0),
    [slots]
  )

  // Teams are NOT removed from the pool once chosen — the full franchise list
  // is always available, so the same team can be spun for multiple positions.
  const availableTeams = allTeams

  useEffect(() => {
    setStreak(getPlayStreak())
  }, [])

  useEffect(() => {
    let cancelled = false
    ;(async () => {
      try {
        const res = await fetch('/api/ppg/teams', { cache: 'no-store' })
        if (!res.ok) throw new Error('bad response')
        const data = (await res.json()) as { teams: FranchiseTeam[] }
        if (!cancelled) setAllTeams(data.teams)
      } catch {
        if (!cancelled) setLoadError('Unable to load NBA franchises.')
      }
    })()
    return () => {
      cancelled = true
    }
  }, [])

  useEffect(() => {
    return () => {
      if (spinTimer.current) clearInterval(spinTimer.current)
    }
  }, [])

  // Record the completed run exactly once when we reach the results screen.
  useEffect(() => {
    if (phase !== 'results' || recordedRef.current) return
    recordedRef.current = true
    const won = isWin(total)
    const newStreak = recordModeComplete('ppg', {
      status: won ? 'won' : 'lost',
      attempts: slots
        .filter((s): s is LockedSlot => s !== null)
        .map((s) => ({ team: s.team.fullName, year: s.season })),
      hints: [],
    })
    setStreak(newStreak)
    if (won) {
      const end = Date.now() + 2500
      const frame = () => {
        confetti({ particleCount: 3, angle: 60, spread: 55, origin: { x: 0, y: 0.8 }, colors: ['#f97316', '#ffffff', '#22c55e'] })
        confetti({ particleCount: 3, angle: 120, spread: 55, origin: { x: 1, y: 0.8 }, colors: ['#f97316', '#ffffff', '#22c55e'] })
        if (Date.now() < end) requestAnimationFrame(frame)
      }
      frame()
    }
  }, [phase, total, slots])


  const handleSpin = useCallback(() => {
    if (spinning || availableTeams.length === 0) return
    // A spin while a team is already showing counts as a re-spin — cap at MAX_RESPINS.
    const isRespin = landedTeam !== null
    if (isRespin && respinsUsed >= MAX_RESPINS) return
    if (isRespin) setRespinsUsed((n) => n + 1)

    setLandedTeam(null)
    setSpinning(true)

    const pool = availableTeams
    spinTimer.current = setInterval(() => {
      setSpinFace(pool[Math.floor(Math.random() * pool.length)])
    }, 70)

    // Land after a short reel, on a randomly selected available team.
    window.setTimeout(() => {
      if (spinTimer.current) {
        clearInterval(spinTimer.current)
        spinTimer.current = null
      }
      const winner = pool[Math.floor(Math.random() * pool.length)]
      setSpinFace(winner)
      setLandedTeam(winner)
      setSpinning(false)
    }, 1300)
  }, [spinning, availableTeams, landedTeam, respinsUsed])

  const confirmTeam = useCallback(async () => {
    if (!landedTeam) return
    setRosterLoading(true)
    setRosterError(null)
    setRoster(null)
    setSelectedPlayer(null)
    setSearch('')
    try {
      const res = await fetch(`/api/ppg/roster?team=${encodeURIComponent(landedTeam.abbreviation)}`, {
        cache: 'no-store',
      })
      if (!res.ok) throw new Error('bad response')
      const data = (await res.json()) as FranchiseRoster
      setRoster(data)
      setStep('player')
    } catch {
      setRosterError('Unable to load that roster. Try re-spinning.')
    } finally {
      setRosterLoading(false)
    }
  }, [landedTeam])

  const pickPlayer = useCallback((player: FranchisePlayer) => {
    setSelectedPlayer(player)
    setStep('season')
  }, [])

  const lockSeason = useCallback(
    (season: FranchiseSeason) => {
      if (!landedTeam || !selectedPlayer) return
      const slot: LockedSlot = {
        position: POSITIONS[activeIndex],
        team: landedTeam,
        playerName: selectedPlayer.name,
        headshotUrl: selectedPlayer.headshotUrl,
        season: season.season,
        ppg: season.ppg,
      }
      const nextSlots = [...slots]
      nextSlots[activeIndex] = slot
      setSlots(nextSlots)

      // Reset the per-position flow for the next open slot.
      // NOTE: respinsUsed is intentionally NOT reset — re-spins are capped
      // across the whole run, not per position.
      setLandedTeam(null)
      setSpinFace(null)
      setRoster(null)
      setSelectedPlayer(null)
      setSearch('')

      if (activeIndex >= POSITIONS.length - 1) {
        setPhase('results')
      } else {
        setStep('spin')
      }
    },
    [landedTeam, selectedPlayer, activeIndex, slots]
  )

  // Step back one screen without losing locked-in positions.
  const goBackStep = useCallback(() => {
    if (step === 'season') {
      setSelectedPlayer(null)
      setStep('player')
    } else if (step === 'player') {
      setRoster(null)
      setSelectedPlayer(null)
      setStep('spin') // landedTeam preserved → user can re-spin
    }
  }, [step])

  const replay = useCallback(() => {
    recordedRef.current = false
    setSlots([null, null, null, null, null])
    setPhase('building')
    setStep('spin')
    setLandedTeam(null)
    setSpinFace(null)
    setRespinsUsed(0)
    setRoster(null)
    setSelectedPlayer(null)
    setSearch('')
  }, [])

  // Players eligible for the ACTIVE position: a player must have started that
  // position for this franchise at least once. Once eligible, we expose ALL of
  // their franchise seasons (any position) to pick from — e.g. LeBron qualifies
  // for every slot he ever started, and you can then choose any of his seasons
  // with that team regardless of the position listed for that specific season.
  // Ordered alphabetically (NOT by scoring) so the list never hints at PPG.
  const eligiblePlayers = useMemo<FranchisePlayer[]>(() => {
    if (!roster) return []
    const q = search.trim().toLowerCase()
    return roster.players
      .filter((p) => p.seasons.some((s) => s.position === activePosition))
      .filter((p) => !q || p.name.toLowerCase().includes(q))
      .sort((a, b) => a.name.localeCompare(b.name))
  }, [roster, activePosition, search])


  if (loadError) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-4">
        <div className="max-w-sm rounded-2xl border border-border bg-card px-6 py-5 text-center shadow-lg">
          <p className="text-sm font-semibold text-foreground">{loadError}</p>
          <button
            type="button"
            onClick={onBack}
            className="mt-4 rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground"
          >
            Back to home
          </button>
        </div>
      </div>
    )
  }

  const progressPct = Math.min((total / 120) * 100, 100)
  const markerPct = (TARGET / 120) * 100

  return (
    <div className="min-h-screen bg-background py-6 sm:py-10 px-4 sm:px-6">
      <div className="max-w-2xl mx-auto">

        {/* ── Header ── */}
        <motion.div
          className="flex items-center justify-between mb-6"
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
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
              Starting <span className="text-primary">5</span>
            </h1>
            <span className="text-[11px] font-semibold tracking-widest uppercase mt-1" style={{ color: 'oklch(0.55 0 0)' }}>
              100 PPG
            </span>
          </div>

          <motion.div
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border"
            style={{ background: 'oklch(0.70 0.18 45 / 0.1)', borderColor: 'oklch(0.70 0.18 45 / 0.35)' }}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, type: 'spring' }}
          >
            <FlameIcon />
            <span className="text-sm font-bold text-primary">{streak}</span>
          </motion.div>
        </motion.div>

        {/* ── Running total + progress ── */}
        {/* Blind during play: the total and bar fill only appear on the results
            screen, so they can't help the user reverse-engineer the math. */}
        {phase === 'results' ? (
          <div className="mb-5 text-center">
            <motion.div
              key={fmt(total)}
              initial={{ scale: 0.9, opacity: 0.6 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: 'spring', stiffness: 300, damping: 18 }}
              className="text-4xl sm:text-5xl font-black tracking-tight"
              style={{ color: totalColor(total) }}
            >
              Total: {fmt(total)} <span className="text-2xl sm:text-3xl">PPG</span>
            </motion.div>

            <div className="relative mt-3 h-3 w-full rounded-full" style={{ background: 'oklch(0.20 0.01 30)' }}>
              <motion.div
                className="absolute left-0 top-0 h-full rounded-full"
                style={{ background: 'oklch(0.70 0.18 45)' }}
                initial={{ width: 0 }}
                animate={{ width: `${progressPct}%` }}
                transition={{ type: 'spring', stiffness: 120, damping: 20 }}
              />
              {/* 100-point target marker */}
              <div className="absolute top-[-3px] h-[calc(100%+6px)] w-[2px]" style={{ left: `${markerPct}%`, background: 'oklch(0.85 0.12 140)' }} />
              <span className="absolute top-4 text-[9px] font-bold" style={{ left: `calc(${markerPct}% - 8px)`, color: 'oklch(0.78 0.14 140)' }}>
                100
              </span>
            </div>
          </div>
        ) : (
          <div className="mb-6 flex flex-col items-center text-center">
            <motion.div
              className="mb-2 flex h-12 w-12 items-center justify-center rounded-2xl"
              style={{ background: 'oklch(0.70 0.18 45 / 0.14)', color: 'oklch(0.70 0.18 45)' }}
              animate={{ scale: [1, 1.06, 1] }}
              transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
            >
              <LockIcon />
            </motion.div>
            <p className="text-lg font-bold text-foreground">Total hidden</p>
            <p className="mt-0.5 text-xs text-muted-foreground">
              Your PPG is revealed once all five are locked
            </p>
            <div className="mt-3 flex items-center gap-2">
              {POSITIONS.map((_, i) => (
                <span
                  key={i}
                  className="h-2.5 w-2.5 rounded-full transition-colors"
                  style={{ background: slots[i] ? 'oklch(0.70 0.18 45)' : 'oklch(0.30 0.01 30)' }}
                />
              ))}
            </div>
          </div>
        )}

        {/* ── Position slots ── */}
        <div className="mb-6 mt-7">
          <SlotStrip slots={slots} activeIndex={activeIndex} phase={phase} reveal={phase === 'results'} />
        </div>


        {/* ── Building flow ── */}
        {phase === 'building' && (
          <AnimatePresence mode="wait">

            {/* STEP 1 — Spin for a team */}
            {step === 'spin' && (
              <motion.div
                key="spin"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                className="relative rounded-2xl border p-6 text-center"
                style={{ background: 'oklch(0.18 0.01 30)', borderColor: 'oklch(0.30 0.01 30)' }}
              >
                {/* Re-spin counter — one re-spin allowed per position */}
                <div
                  className="absolute right-3 top-3 flex items-center gap-1 rounded-full border px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide"
                  style={{
                    background: canRespin ? 'oklch(0.70 0.18 45 / 0.12)' : 'oklch(0.20 0.01 30)',
                    borderColor: canRespin ? 'oklch(0.70 0.18 45 / 0.4)' : 'oklch(0.30 0.01 30)',
                    color: canRespin ? 'oklch(0.70 0.18 45)' : 'oklch(0.55 0 0)',
                  }}
                  title="Re-spins used this position"
                >
                  Re-spins {respinsUsed}/{MAX_RESPINS}
                </div>

                <p className="mb-1 text-sm font-semibold text-foreground">
                  Spin for the {POSITIONS[activeIndex]} slot
                </p>
                <p className="mb-5 text-xs text-muted-foreground">
                  {availableTeams.length} franchises in the pool
                </p>

                <div className="mx-auto mb-5 flex h-32 w-32 items-center justify-center rounded-2xl border" style={{ background: 'oklch(0.14 0.01 30)', borderColor: spinning ? 'oklch(0.70 0.18 45)' : 'oklch(0.30 0.01 30)' }}>
                  {spinFace ? (
                    <motion.div
                      key={spinFace.abbreviation + String(spinning)}
                      className="relative h-20 w-20"
                      animate={spinning ? { rotate: [0, 12, -12, 0] } : { scale: [0.8, 1.1, 1] }}
                      transition={{ duration: spinning ? 0.15 : 0.4 }}
                    >
                      <SafeImage src={spinFace.logoUrl} alt={spinFace.fullName} />
                    </motion.div>
                  ) : (
                    <BasketballIcon size={44} />
                  )}
                </div>

                {landedTeam && !spinning && (
                  <motion.p
                    className="mb-4 text-lg font-black text-foreground"
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    {landedTeam.fullName}
                  </motion.p>
                )}

                <div className="flex flex-wrap items-center justify-center gap-3">
                  {!landedTeam || spinning ? (
                    <button
                      type="button"
                      onClick={handleSpin}
                      disabled={spinning}
                      className="rounded-xl px-6 py-2.5 text-sm font-bold disabled:opacity-60"
                      style={{ background: 'oklch(0.70 0.18 45)', color: 'oklch(0.10 0.01 30)' }}
                    >
                      {spinning ? 'Spinning…' : 'Spin'}
                    </button>
                  ) : (
                    <>
                      <button
                        type="button"
                        onClick={confirmTeam}
                        disabled={rosterLoading}
                        className="rounded-xl px-6 py-2.5 text-sm font-bold disabled:opacity-60"
                        style={{ background: 'oklch(0.70 0.18 45)', color: 'oklch(0.10 0.01 30)' }}
                      >
                        {rosterLoading ? 'Loading…' : 'Continue →'}
                      </button>
                      <button
                        type="button"
                        onClick={handleSpin}
                        disabled={!canRespin}
                        className="rounded-xl border px-6 py-2.5 text-sm font-bold disabled:opacity-50"
                        style={{ borderColor: 'oklch(0.70 0.18 45 / 0.5)', color: 'oklch(0.70 0.18 45)' }}
                      >
                        {canRespin ? 'Re-spin' : 'No re-spins left'}
                      </button>
                    </>
                  )}
                </div>

                {rosterError && <p className="mt-3 text-xs text-destructive">{rosterError}</p>}
              </motion.div>
            )}

            {/* STEP 2 — Pick a player */}
            {step === 'player' && roster && (
              <motion.div
                key="player"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                className="rounded-2xl border p-4 sm:p-5"
                style={{ background: 'oklch(0.18 0.01 30)', borderColor: 'oklch(0.30 0.01 30)' }}
              >
                <div className="mb-3 flex items-center gap-2">
                  <div className="relative h-7 w-7 shrink-0">
                    <SafeImage src={roster.team.logoUrl} alt={roster.team.fullName} />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-bold text-foreground">{roster.team.fullName}</p>
                    <p className="text-[11px] text-muted-foreground">
                      All-time {activePosition}s · pick your scorer
                    </p>
                  </div>
                  <button type="button" onClick={goBackStep} className="text-xs text-muted-foreground hover:underline">
                    ← Back
                  </button>
                </div>

                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search players…"
                  className="mb-3 w-full rounded-xl border bg-transparent px-3 py-2 text-sm text-foreground outline-none placeholder:text-muted-foreground"
                  style={{ borderColor: 'oklch(0.30 0.01 30)' }}
                />

                <div className="max-h-[320px] space-y-1.5 overflow-y-auto pr-1">
                  {eligiblePlayers.length === 0 ? (
                    <p className="py-6 text-center text-sm text-muted-foreground">
                      {search.trim()
                        ? 'No players match that search.'
                        : `No ${activePosition}s on record for this franchise — re-spin for another team.`}
                    </p>
                  ) : (
                    eligiblePlayers.map((player) => (
                      <button
                        key={player.name}
                        type="button"
                        onClick={() => pickPlayer(player)}
                        className="flex w-full items-center gap-3 rounded-xl border px-3 py-2 text-left transition-colors hover:border-primary/50"
                        style={{ background: 'oklch(0.16 0.01 30)', borderColor: 'oklch(0.26 0.01 30)' }}
                      >
                        <div className="relative h-9 w-9 shrink-0 overflow-hidden rounded-full bg-muted">
                          <SafeImage src={player.headshotUrl} alt={player.name} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="truncate text-sm font-semibold text-foreground">{player.name}</p>
                          <p className="text-[11px] text-muted-foreground">
                            {player.firstSeason === player.lastSeason
                              ? player.firstSeason
                              : `${player.firstSeason} – ${player.lastSeason}`}
                            {' · '}
                            {player.seasons.length} {player.seasons.length === 1 ? 'season' : 'seasons'}
                          </p>
                        </div>
                        <span className="text-muted-foreground">→</span>
                      </button>
                    ))
                  )}
                </div>
              </motion.div>
            )}


            {/* STEP 3 — Pick a season */}
            {step === 'season' && selectedPlayer && landedTeam && (
              <motion.div
                key="season"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                className="rounded-2xl border p-4 sm:p-5"
                style={{ background: 'oklch(0.18 0.01 30)', borderColor: 'oklch(0.30 0.01 30)' }}
              >
                <div className="mb-3 flex items-center gap-3">
                  <div className="relative h-11 w-11 shrink-0 overflow-hidden rounded-full bg-muted">
                    <SafeImage src={selectedPlayer.headshotUrl} alt={selectedPlayer.name} />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-bold text-foreground">{selectedPlayer.name}</p>
                    <p className="text-[11px] text-muted-foreground">{landedTeam.fullName}</p>
                  </div>
                  <button type="button" onClick={goBackStep} className="text-xs text-muted-foreground hover:underline">
                    ← Back
                  </button>
                </div>

                {/* Single-season players skip the list entirely — one card, one action. */}
                {selectedPlayer.seasons.length === 1 ? (
                  <div className="rounded-xl border p-4 text-center" style={{ borderColor: 'oklch(0.70 0.18 45 / 0.4)', background: 'oklch(0.16 0.01 30)' }}>
                    <p className="text-xs uppercase tracking-widest text-muted-foreground">Only franchise season</p>
                    <p className="my-1 text-2xl font-black text-foreground">{selectedPlayer.seasons[0].season}</p>
                    <p className="mb-4 text-xs text-muted-foreground">PPG stays hidden until the end</p>
                    <button
                      type="button"
                      onClick={() => lockSeason(selectedPlayer.seasons[0])}
                      className="rounded-xl px-6 py-2.5 text-sm font-bold"
                      style={{ background: 'oklch(0.70 0.18 45)', color: 'oklch(0.10 0.01 30)' }}
                    >
                      Lock in →
                    </button>
                  </div>
                ) : (
                  <>
                    <p className="mb-2 text-[11px] text-muted-foreground">Pick a season — stats stay hidden, so trust your gut.</p>
                    <div className="max-h-[320px] space-y-1.5 overflow-y-auto pr-1">
                      {[...selectedPlayer.seasons]
                        .sort((a, b) => a.season.localeCompare(b.season))
                        .map((s) => (
                          <button
                            key={s.season}
                            type="button"
                            onClick={() => lockSeason(s)}
                            className="flex w-full items-center justify-between rounded-xl border px-3 py-2.5 text-left transition-colors hover:border-primary/50"
                            style={{ background: 'oklch(0.16 0.01 30)', borderColor: 'oklch(0.26 0.01 30)' }}
                          >
                            <div className="flex items-center gap-2">
                              <div className="relative h-5 w-5">
                                <SafeImage src={landedTeam.logoUrl} alt={landedTeam.fullName} />
                              </div>
                              <span className="text-sm font-semibold text-foreground">{s.season}</span>
                              <span className="rounded-md px-1.5 py-0.5 text-[9px] font-bold uppercase" style={{ background: 'oklch(0.26 0.01 30)', color: 'oklch(0.65 0 0)' }}>
                                {s.position}
                              </span>
                            </div>
                            <span className="text-muted-foreground">→</span>
                          </button>
                        ))}
                    </div>
                  </>
                )}
              </motion.div>
            )}

          </AnimatePresence>
        )}


        {/* ── Results ── */}
        {phase === 'results' && (
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: 'spring', stiffness: 200, damping: 20 }}
            className="rounded-2xl border p-5 sm:p-6"
            style={{
              background: isWin(total) ? 'linear-gradient(135deg, oklch(0.22 0.06 145 / 0.5), oklch(0.20 0.05 45 / 0.4))' : 'oklch(0.18 0.01 30)',
              borderColor: isWin(total) ? 'oklch(0.55 0.15 145 / 0.5)' : 'oklch(0.30 0.01 30)',
            }}
          >
            <p className="text-center text-3xl font-black sm:text-4xl" style={{ color: totalColor(total) }}>
              {isWin(total)
                ? '🎯 100 PPG Club'
                : total > TARGET
                ? `Overshot — ${fmt(total)} PPG`
                : `Bigger swings needed — ${fmt(total)} PPG`}
            </p>
            <p className="mt-1 text-center text-sm text-muted-foreground">
              {isWin(total)
                ? 'Landed within 0.9 of 100 — clutch.'
                : `Target was 100 ±${WIN_TOLERANCE}.`}
            </p>

            {/* Recap table */}
            <div className="mt-5 overflow-hidden rounded-xl border" style={{ borderColor: 'oklch(0.28 0.01 30)' }}>
              <table className="w-full text-left text-xs sm:text-sm">
                <thead>
                  <tr style={{ background: 'oklch(0.16 0.01 30)' }}>
                    <th className="px-2 py-2 font-semibold text-muted-foreground sm:px-3">Pos</th>
                    <th className="px-2 py-2 font-semibold text-muted-foreground sm:px-3">Team</th>
                    <th className="px-2 py-2 font-semibold text-muted-foreground sm:px-3">Player</th>
                    <th className="px-2 py-2 font-semibold text-muted-foreground sm:px-3">Season</th>
                    <th className="px-2 py-2 text-right font-semibold text-muted-foreground sm:px-3">PPG</th>
                  </tr>
                </thead>
                <tbody>
                  {slots.filter((s): s is LockedSlot => s !== null).map((s) => (
                    <tr key={s.position} className="border-t" style={{ borderColor: 'oklch(0.24 0.01 30)' }}>
                      <td className="px-2 py-2 font-bold text-primary sm:px-3">{s.position}</td>
                      <td className="px-2 py-2 sm:px-3">
                        <div className="flex items-center gap-1.5">
                          <div className="relative h-4 w-4 shrink-0">
                            <SafeImage src={s.team.logoUrl} alt={s.team.fullName} />
                          </div>
                          <span className="hidden text-foreground sm:inline">{s.team.name}</span>
                          <span className="text-foreground sm:hidden">{s.team.abbreviation}</span>
                        </div>
                      </td>
                      <td className="px-2 py-2 font-medium text-foreground sm:px-3">{s.playerName}</td>
                      <td className="px-2 py-2 text-muted-foreground sm:px-3">{s.season}</td>
                      <td className="px-2 py-2 text-right font-black text-foreground sm:px-3">{fmt(s.ppg)}</td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr style={{ background: 'oklch(0.16 0.01 30)' }}>
                    <td className="px-2 py-2 font-bold text-muted-foreground sm:px-3" colSpan={4}>Total</td>
                    <td className="px-2 py-2 text-right text-base font-black sm:px-3" style={{ color: totalColor(total) }}>{fmt(total)}</td>
                  </tr>
                </tfoot>
              </table>
            </div>

            <div className="mt-5 flex flex-wrap justify-center gap-3">
              <button
                type="button"
                onClick={replay}
                className="rounded-xl px-6 py-2.5 text-sm font-bold"
                style={{ background: 'oklch(0.70 0.18 45)', color: 'oklch(0.10 0.01 30)' }}
              >
                Play again
              </button>
              <button
                type="button"
                onClick={onBack}
                className="rounded-xl border px-6 py-2.5 text-sm font-bold"
                style={{ borderColor: 'oklch(0.30 0.01 30)', color: 'oklch(0.75 0 0)' }}
              >
                Home
              </button>
            </div>
          </motion.div>
        )}

      </div>
    </div>
  )
}
