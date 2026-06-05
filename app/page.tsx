'use client'

import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { HomePage } from '@/components/home-page'
import { StartingFiveGame } from '@/components/starting-five-game'
import { StatsGame } from '@/components/stats-game'

type Screen = 'home' | 'college' | 'stats'

export default function Page() {
  const [screen, setScreen] = useState<Screen>('home')

  return (
    <AnimatePresence mode="wait">
      {screen === 'home' && (
        <motion.div
          key="home"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          <HomePage onSelectMode={(mode) => setScreen(mode)} />
        </motion.div>
      )}

      {screen === 'college' && (
        <motion.div
          key="college"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          <StartingFiveGame onBack={() => setScreen('home')} />
        </motion.div>
      )}

      {screen === 'stats' && (
        <motion.div
          key="stats"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          <StatsGame onBack={() => setScreen('home')} />
        </motion.div>
      )}
    </AnimatePresence>
  )
}