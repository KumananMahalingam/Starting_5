'use client'

import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { HomePage, DailyChallengePage, PlayAnytimePage } from '@/components/home-page'
import { StartingFiveGame } from '@/components/starting-five-game'
import { CountryGame } from '@/components/country-game'
import { StatsGame } from '@/components/stats-game'
import { HundredPpgGame } from '@/components/hundred-ppg-game'

type Screen = 'home' | 'daily' | 'anytime' | 'college' | 'country' | 'stats' | 'ppg'

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
          <HomePage
            onSelectSection={(section) => setScreen(section === 'daily' ? 'daily' : 'anytime')}
          />
        </motion.div>
      )}

      {screen === 'daily' && (
        <motion.div
          key="daily"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          <DailyChallengePage onSelectMode={(mode) => setScreen(mode)} onBack={() => setScreen('home')} />
        </motion.div>
      )}

      {screen === 'anytime' && (
        <motion.div
          key="anytime"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          <PlayAnytimePage onSelectMode={(mode) => setScreen(mode)} onBack={() => setScreen('home')} />
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
          <StartingFiveGame onBack={() => setScreen('daily')} mode="college" />
        </motion.div>
      )}

      {screen === 'country' && (
        <motion.div
          key="country"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          <CountryGame onBack={() => setScreen('daily')} />
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
          <StatsGame onBack={() => setScreen('daily')} />
        </motion.div>
      )}

      {screen === 'ppg' && (
        <motion.div
          key="ppg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          <HundredPpgGame onBack={() => setScreen('anytime')} />
        </motion.div>
      )}
    </AnimatePresence>
  )
}
