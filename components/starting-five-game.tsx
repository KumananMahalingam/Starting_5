'use client'

import { useState, useCallback, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import confetti from 'canvas-confetti'
import { BasketballCourt } from '@/components/basketball-court'
import { PlayerCard } from '@/components/player-card'
import { GuessInput } from '@/components/guess-input'
import { getHint, getYearHint, type DailyPuzzle, type Hint } from '@/lib/game-data'
import Image from 'next/image'

type GameState = 'playing' | 'won' | 'lost'

type GameMode = 'college' | 'country'

interface StartingFiveGameProps {
  onBack: () => void
  mode: GameMode
}

function HomeIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M2 7.5L9 2L16 7.5V16H11.5V11H6.5V16H2V7.5Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
        fill="none"
      />
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

export function StartingFiveGame({ onBack, mode }: StartingFiveGameProps) {
  const [gameState, setGameState] = useState<GameState>('playing')
  const [attempts, setAttempts] = useState<{ team: string; year: string }[]>([])
  const [hints, setHints] = useState<Hint[]>([])
  const [streak, setStreak] = useState(0)
  const [puzzle, setPuzzle] = useState<DailyPuzzle | null>(null)
  const [loadError, setLoadError] = useState<string | null>(null)
  const attemptsLeft = 3 - attempts.length

  useEffect(() => {
    const savedStreak = localStorage.getItem('starting5-streak')
    if (savedStreak) setStreak(parseInt(savedStreak, 10))
  }, [])

  const loadPuzzle = useCallback(async () => {
    try {
      setLoadError(null)
      const response = await fetch(`/api/puzzle?mode=${mode}`, {
        cache: 'no-store',
      })

      if (!response.ok) {
        throw new Error('Failed to load puzzle')
      }

      const data = (await response.json()) as DailyPuzzle
      setPuzzle(data)
      setGameState('playing')
      setAttempts([])
      setHints([])
    } catch {
      setLoadError('Unable to load today\'s puzzle.')
    }
  }, [mode])

  useEffect(() => {
    void loadPuzzle()
  }, [loadPuzzle])

  const fireConfetti = useCallback(() => {
    const duration = 3000
    const end = Date.now() + duration
    const frame = () => {
      confetti({ particleCount: 3, angle: 60, spread: 55, origin: { x: 0, y: 0.8 }, colors: ['#f97316', '#ffffff', '#22c55e'] })
      confetti({ particleCount: 3, angle: 120, spread: 55, origin: { x: 1, y: 0.8 }, colors: ['#f97316', '#ffffff', '#22c55e'] })
      if (Date.now() < end) requestAnimationFrame(frame)
    }
    frame()
  }, [])

  const handleGuess = useCallback((teamName: string, season: string) => {
    if (gameState !== 'playing' || !puzzle) return
    const correctTeamFull = `${puzzle.teamCity} ${puzzle.teamName}`
    const correctSeason = puzzle.season ?? ''

    if (teamName === correctTeamFull && season === correctSeason) {
      setGameState('won')
      const newStreak = streak + 1
      setStreak(newStreak)
      localStorage.setItem('starting5-streak', newStreak.toString())
      fireConfetti()
      return
    }

    const newAttempt = { team: teamName, year: season }
    const newAttempts = [...attempts, newAttempt]
    setAttempts(newAttempts)

    let hint: Hint
    if (teamName === correctTeamFull) {
      const yh = getYearHint(season, correctSeason)
      hint = { type: yh.type, message: `Correct team! ${yh.message}` }
    } else {
      const th = getHint(teamName, correctTeamFull, puzzle.conference, puzzle.division)
      const yh = getYearHint(season, correctSeason)
      hint = { type: th.type, message: `${th.message} · ${yh.message}` }
    }
    setHints([...hints, hint])

    if (newAttempts.length >= 3) {
      setGameState('lost')
      setStreak(0)
      localStorage.setItem('starting5-streak', '0')
    }
  }, [gameState, attempts, hints, puzzle, streak, fireConfetti])

  const modeLabel = mode === 'college' ? 'College' : 'Country'

  if (!puzzle && !loadError) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-4">
        <div className="rounded-2xl border border-border bg-card px-6 py-5 text-center shadow-lg">
          <p className="text-sm font-medium text-foreground">Loading today&apos;s puzzle...</p>
          <p className="mt-1 text-xs text-muted-foreground">Reading the local NBA dataset</p>
        </div>
      </div>
    )
  }

  if (loadError) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-4">
        <div className="max-w-sm rounded-2xl border border-border bg-card px-6 py-5 text-center shadow-lg">
          <p className="text-sm font-semibold text-foreground">{loadError}</p>
          <button
            type="button"
            onClick={() => void loadPuzzle()}
            className="mt-4 rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground"
          >
            Try again
          </button>
        </div>
      </div>
    )
  }

  const isRevealed = gameState === 'won' || gameState === 'lost'

  return (
    <div className="min-h-screen bg-background py-6 sm:py-10 px-4 sm:px-6">
      <div className="max-w-2xl mx-auto">

        {/* ── Header ── */}
        <motion.div
          className="flex items-center justify-between mb-8"
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          {/* Home icon button */}
          <motion.button
            onClick={onBack}
            className="flex items-center justify-center w-9 h-9 rounded-xl border transition-colors"
            style={{
              background: 'oklch(0.18 0.01 30)',
              borderColor: 'oklch(0.30 0.01 30)',
              color: 'oklch(0.65 0 0)',
            }}
            whileHover={{ scale: 1.08, borderColor: 'oklch(0.70 0.18 45 / 0.5)' }}
            whileTap={{ scale: 0.94 }}
            title="Back to home"
          >
            <HomeIcon />
          </motion.button>

          {/* Title block — centered */}
          <div className="flex flex-col items-center">
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-foreground leading-none">
              Starting <span className="text-primary">5</span>
            </h1>
            <span
              className="text-[11px] font-semibold tracking-widest uppercase mt-1"
              style={{ color: 'oklch(0.55 0 0)' }}
            >
              {modeLabel} Mode
            </span>
            {isRevealed && puzzle.season && (
              <span className="mt-1 text-[10px] font-semibold tracking-[0.2em] uppercase text-muted-foreground">
                {puzzle.season}
              </span>
            )}
          </div>

          {/* Streak pill */}
          <motion.div
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border"
            style={{
              background: 'oklch(0.70 0.18 45 / 0.1)',
              borderColor: 'oklch(0.70 0.18 45 / 0.35)',
            }}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, type: 'spring' }}
          >
            <FlameIcon />
            <span className="text-sm font-bold text-primary">{streak}</span>
          </motion.div>
        </motion.div>

        {/* ── Court ── */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <BasketballCourt>
            {puzzle.players.map((player, index) => (
              <PlayerCard
                key={`${player.position}-${player.name}`}
                player={player}
                clueMode={puzzle.clueMode}
                isRevealed={isRevealed}
                delay={0.3 + index * 0.1}
              />
            ))}
          </BasketballCourt>
        </motion.div>

        {/* Previous Guesses & Hints */}
        <AnimatePresence>
          {hints.length > 0 && (
            <motion.div
              className="mt-4 space-y-2"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
            >
              {attempts.map((attempt, index) => (
                <motion.div
                  key={index}
                  className={`flex items-center justify-between px-4 py-2 rounded-lg text-sm ${
                    hints[index]?.type === 'hot'
                      ? 'bg-orange-500/20 border border-orange-500/30'
                      : hints[index]?.type === 'warm'
                      ? 'bg-yellow-500/20 border border-yellow-500/30'
                      : 'bg-blue-500/20 border border-blue-500/30'
                  }`}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <span className="font-medium text-foreground">{attempt.team} · {attempt.year}</span>
                  <span className="text-muted-foreground">{hints[index]?.message}</span>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Guess Input or Result */}
        <motion.div
          className="mt-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          {gameState === 'playing' ? (
            <GuessInput
              onGuess={handleGuess}
              disabled={gameState !== 'playing'}
              attemptsLeft={attemptsLeft}
            />
          ) : (
            <motion.div
              className={`w-full p-4 sm:p-6 rounded-xl border ${
                gameState === 'won'
                  ? 'bg-gradient-to-r from-green-500/20 to-orange-500/20 border-green-500/30'
                  : 'bg-card border-border'
              }`}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: 'spring', stiffness: 200 }}
            >
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <motion.div
                  className="relative w-20 h-20 sm:w-24 sm:h-24"
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                >
                  <Image
                    src={puzzle.teamLogo}
                    alt={`${puzzle.teamCity} ${puzzle.teamName}`}
                    fill
                    className="object-contain"
                    unoptimized
                  />
                </motion.div>

                <div className="text-center sm:text-left">
                  {gameState === 'won' ? (
                    <>
                      <motion.h2
                        className="text-xl sm:text-2xl font-bold text-green-500 mb-1"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                      >
                        Correct!
                      </motion.h2>
                      <motion.p
                        className="text-muted-foreground text-sm"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4 }}
                      >
                        You got it in {attempts.length + 1}{' '}
                        {attempts.length === 0 ? 'attempt' : 'attempts'}!
                      </motion.p>
                    </>
                  ) : (
                    <>
                      <motion.h2
                        className="text-xl sm:text-2xl font-bold text-destructive mb-1"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                      >
                        Game Over
                      </motion.h2>
                      <motion.p
                        className="text-muted-foreground text-sm"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4 }}
                      >
                        Better luck tomorrow!
                      </motion.p>
                    </>
                  )}
                  <motion.div
                    className="mt-2"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                  >
                    <p className="text-xs text-muted-foreground">{puzzle.teamCity}</p>
                    <p className="text-lg sm:text-xl font-bold text-foreground">{puzzle.teamName}</p>
                    {puzzle.season && (
                      <p className="text-xs text-muted-foreground mt-0.5">{puzzle.season} season</p>
                    )}
                  </motion.div>
                </div>
              </div>
            </motion.div>
          )}
        </motion.div>

        {/* Footer */}
        <motion.p
          className="text-center text-xs text-muted-foreground mt-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          New {modeLabel.toLowerCase()} puzzle every day at midnight
        </motion.p>
      </div>
    </div>
  )
}