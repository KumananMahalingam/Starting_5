'use client'

import { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
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
  const puzzle = TODAYS_PUZZLE
  const attemptsLeft = 3 - attempts.length

  const handleGuess = useCallback(
    (teamName: string) => {
      if (gameState !== 'playing') return

      const correctTeamFull = `${puzzle.teamCity} ${puzzle.teamName}`

      if (teamName === correctTeamFull) {
        setGameState('won')
        return
      }

      const newAttempts = [...attempts, teamName]
      setAttempts(newAttempts)

      const hint = getHint(teamName, correctTeamFull, puzzle.conference, puzzle.division)
      setHints([...hints, hint])

      if (newAttempts.length >= 3) {
        setGameState('lost')
      }
    },
    [gameState, attempts, hints, puzzle]
  )

  const isRevealed = gameState === 'won' || gameState === 'lost'

  const getClueModeLabel = () => {
    switch (puzzle.clueMode) {
      case 'college':
        return '🎓 College Mode'
      case 'stats':
        return '📊 Stats Mode'
      case 'nationality':
        return '🌍 Nationality Mode'
    }
  }

  return (
    <div className="min-h-screen bg-background py-6 px-4">
      <div className="max-w-lg mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-6"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl sm:text-4xl font-bold text-foreground tracking-tight">
            Starting <span className="text-primary">5</span>
          </h1>
          <p className="text-muted-foreground text-sm mt-1">
            Guess the NBA team from their starting lineup
          </p>
          <motion.div
            className="inline-block mt-3 px-3 py-1.5 bg-secondary rounded-full"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, type: 'spring' }}
          >
            <span className="text-sm font-medium text-secondary-foreground">
              {getClueModeLabel()}
            </span>
          </motion.div>
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
              className="mt-6 space-y-2"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
            >
              {attempts.map((attempt, index) => (
                <motion.div
                  key={index}
                  className={`flex items-center justify-between px-4 py-2.5 rounded-lg ${
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
                  <span className="text-sm font-medium text-foreground">{attempt}</span>
                  <span className="text-sm text-muted-foreground">{hints[index]?.message}</span>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Guess Input or Result */}
        <motion.div
          className="mt-6"
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
              className="text-center p-6 bg-card rounded-xl border border-border"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: 'spring', stiffness: 200 }}
            >
              {gameState === 'won' ? (
                <>
                  <motion.div
                    className="text-4xl mb-3"
                    initial={{ scale: 0 }}
                    animate={{ scale: [0, 1.2, 1] }}
                    transition={{ duration: 0.5 }}
                  >
                    🏀
                  </motion.div>
                  <h2 className="text-2xl font-bold text-primary mb-2">Correct!</h2>
                  <p className="text-muted-foreground">
                    You got it in {attempts.length + 1}{' '}
                    {attempts.length === 0 ? 'attempt' : 'attempts'}!
                  </p>
                </>
              ) : (
                <>
                  <motion.div
                    className="text-4xl mb-3"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1, rotate: [0, -10, 10, 0] }}
                    transition={{ duration: 0.5 }}
                  >
                    😔
                  </motion.div>
                  <h2 className="text-2xl font-bold text-destructive mb-2">Game Over</h2>
                  <p className="text-muted-foreground">Better luck tomorrow!</p>
                </>
              )}

              {/* Team reveal */}
              <motion.div
                className="mt-4 flex items-center justify-center gap-3"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <div className="relative w-12 h-12">
                  <Image
                    src={puzzle.teamLogo}
                    alt={`${puzzle.teamCity} ${puzzle.teamName}`}
                    fill
                    className="object-contain"
                    unoptimized
                  />
                </div>
                <div className="text-left">
                  <p className="text-sm text-muted-foreground">{puzzle.teamCity}</p>
                  <p className="text-xl font-bold text-foreground">{puzzle.teamName}</p>
                </div>
              </motion.div>
            </motion.div>
          )}
        </motion.div>

        {/* Footer */}
        <motion.p
          className="text-center text-xs text-muted-foreground mt-8"
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
