'use client'

import { useState, useCallback, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import confetti from 'canvas-confetti'
import { BasketballCourt } from '@/components/basketball-court'
import { PlayerCard } from '@/components/player-card'
import { GuessInput } from '@/components/guess-input'
import { TODAYS_PUZZLE, getHint, type Hint } from '@/lib/game-data'
import Image from 'next/image'

type GameState = 'playing' | 'won' | 'lost'

export function StartingFiveGame() {
  const [gameState, setGameState] = useState<GameState>('playing')
  const [attempts, setAttempts] = useState<string[]>([])
  const [hints, setHints] = useState<Hint[]>([])
  const [streak, setStreak] = useState(0)
  const puzzle = TODAYS_PUZZLE
  const attemptsLeft = 3 - attempts.length

  // Load streak from localStorage on mount
  useEffect(() => {
    const savedStreak = localStorage.getItem('starting5-streak')
    if (savedStreak) {
      setStreak(parseInt(savedStreak, 10))
    }
  }, [])

  // Fire confetti on win
  const fireConfetti = useCallback(() => {
    const duration = 3000
    const end = Date.now() + duration

    const frame = () => {
      confetti({
        particleCount: 3,
        angle: 60,
        spread: 55,
        origin: { x: 0, y: 0.8 },
        colors: ['#f97316', '#ffffff', '#22c55e'],
      })
      confetti({
        particleCount: 3,
        angle: 120,
        spread: 55,
        origin: { x: 1, y: 0.8 },
        colors: ['#f97316', '#ffffff', '#22c55e'],
      })

      if (Date.now() < end) {
        requestAnimationFrame(frame)
      }
    }

    frame()
  }, [])

  const handleGuess = useCallback(
    (teamName: string) => {
      if (gameState !== 'playing') return

      const correctTeamFull = `${puzzle.teamCity} ${puzzle.teamName}`

      if (teamName === correctTeamFull) {
        setGameState('won')
        const newStreak = streak + 1
        setStreak(newStreak)
        localStorage.setItem('starting5-streak', newStreak.toString())
        fireConfetti()
        return
      }

      const newAttempts = [...attempts, teamName]
      setAttempts(newAttempts)

      const hint = getHint(teamName, correctTeamFull, puzzle.conference, puzzle.division)
      setHints([...hints, hint])

      if (newAttempts.length >= 3) {
        setGameState('lost')
        // Reset streak on loss
        setStreak(0)
        localStorage.setItem('starting5-streak', '0')
      }
    },
    [gameState, attempts, hints, puzzle, streak, fireConfetti]
  )

  const isRevealed = gameState === 'won' || gameState === 'lost'

  const getClueModeLabel = () => {
    switch (puzzle.clueMode) {
      case 'college':
        return 'College Mode'
      case 'stats':
        return 'Stats Mode'
      case 'nationality':
        return 'Nationality Mode'
    }
  }

  return (
    <div className="min-h-screen bg-background py-4 sm:py-6 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header with streak counter */}
        <motion.div
          className="flex items-center justify-between mb-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-foreground tracking-tight">
              Starting <span className="text-primary">5</span>
            </h1>
            <p className="text-muted-foreground text-xs sm:text-sm">
              Guess the NBA team from their starting lineup
            </p>
          </div>

          {/* Streak counter */}
          <motion.div
            className="flex items-center gap-1.5 px-3 py-1.5 bg-orange-500/10 border border-orange-500/30 rounded-full"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, type: 'spring' }}
          >
            <span className="text-orange-500 text-sm">🔥</span>
            <span className="text-sm font-bold text-orange-500">{streak}</span>
          </motion.div>
        </motion.div>

        {/* Clue mode badge */}
        <motion.div
          className="flex justify-center mb-3"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: 'spring' }}
        >
          <span className="inline-block px-3 py-1 bg-secondary rounded-full text-xs font-medium text-secondary-foreground">
            {getClueModeLabel()}
          </span>
        </motion.div>

        {/* Basketball Court with Players */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <BasketballCourt>
            {puzzle.players.map((player, index) => (
              <PlayerCard
                key={player.position}
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
                  <span className="font-medium text-foreground">{attempt}</span>
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
            <>
              {/* Full-width victory/defeat banner */}
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
                  {/* Team logo */}
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
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            </>
          )}
        </motion.div>

        {/* Footer */}
        <motion.p
          className="text-center text-xs text-muted-foreground mt-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          New puzzle every day at midnight
        </motion.p>
      </div>
    </div>
  )
}
