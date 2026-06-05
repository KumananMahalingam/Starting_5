'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { NBA_TEAMS } from '@/lib/game-data'
import Image from 'next/image'

interface GuessInputProps {
  onGuess: (team: string) => void
  disabled: boolean
  attemptsLeft: number
}

// Team logos mapping
const TEAM_LOGOS: Record<string, string> = {
  'Atlanta Hawks': 'https://cdn.nba.com/logos/nba/1610612737/global/L/logo.svg',
  'Boston Celtics': 'https://cdn.nba.com/logos/nba/1610612738/global/L/logo.svg',
  'Brooklyn Nets': 'https://cdn.nba.com/logos/nba/1610612751/global/L/logo.svg',
  'Charlotte Hornets': 'https://cdn.nba.com/logos/nba/1610612766/global/L/logo.svg',
  'Chicago Bulls': 'https://cdn.nba.com/logos/nba/1610612741/global/L/logo.svg',
  'Cleveland Cavaliers': 'https://cdn.nba.com/logos/nba/1610612739/global/L/logo.svg',
  'Dallas Mavericks': 'https://cdn.nba.com/logos/nba/1610612742/global/L/logo.svg',
  'Denver Nuggets': 'https://cdn.nba.com/logos/nba/1610612743/global/L/logo.svg',
  'Detroit Pistons': 'https://cdn.nba.com/logos/nba/1610612765/global/L/logo.svg',
  'Golden State Warriors': 'https://cdn.nba.com/logos/nba/1610612744/global/L/logo.svg',
  'Houston Rockets': 'https://cdn.nba.com/logos/nba/1610612745/global/L/logo.svg',
  'Indiana Pacers': 'https://cdn.nba.com/logos/nba/1610612754/global/L/logo.svg',
  'LA Clippers': 'https://cdn.nba.com/logos/nba/1610612746/global/L/logo.svg',
  'Los Angeles Lakers': 'https://cdn.nba.com/logos/nba/1610612747/global/L/logo.svg',
  'Memphis Grizzlies': 'https://cdn.nba.com/logos/nba/1610612763/global/L/logo.svg',
  'Miami Heat': 'https://cdn.nba.com/logos/nba/1610612748/global/L/logo.svg',
  'Milwaukee Bucks': 'https://cdn.nba.com/logos/nba/1610612749/global/L/logo.svg',
  'Minnesota Timberwolves': 'https://cdn.nba.com/logos/nba/1610612750/global/L/logo.svg',
  'New Orleans Pelicans': 'https://cdn.nba.com/logos/nba/1610612740/global/L/logo.svg',
  'New York Knicks': 'https://cdn.nba.com/logos/nba/1610612752/global/L/logo.svg',
  'Oklahoma City Thunder': 'https://cdn.nba.com/logos/nba/1610612760/global/L/logo.svg',
  'Orlando Magic': 'https://cdn.nba.com/logos/nba/1610612753/global/L/logo.svg',
  'Philadelphia 76ers': 'https://cdn.nba.com/logos/nba/1610612755/global/L/logo.svg',
  'Phoenix Suns': 'https://cdn.nba.com/logos/nba/1610612756/global/L/logo.svg',
  'Portland Trail Blazers': 'https://cdn.nba.com/logos/nba/1610612757/global/L/logo.svg',
  'Sacramento Kings': 'https://cdn.nba.com/logos/nba/1610612758/global/L/logo.svg',
  'San Antonio Spurs': 'https://cdn.nba.com/logos/nba/1610612759/global/L/logo.svg',
  'Toronto Raptors': 'https://cdn.nba.com/logos/nba/1610612761/global/L/logo.svg',
  'Utah Jazz': 'https://cdn.nba.com/logos/nba/1610612762/global/L/logo.svg',
  'Washington Wizards': 'https://cdn.nba.com/logos/nba/1610612764/global/L/logo.svg',
}

export function GuessInput({ onGuess, disabled, attemptsLeft }: GuessInputProps) {
  const [value, setValue] = useState('')
  const [suggestions, setSuggestions] = useState<typeof NBA_TEAMS>([])
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [selectedIndex, setSelectedIndex] = useState(-1)
  const inputRef = useRef<HTMLInputElement>(null)
  const suggestionsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (value.length > 0) {
      const filtered = NBA_TEAMS.filter((team) =>
        team.name.toLowerCase().includes(value.toLowerCase())
      )
      setSuggestions(filtered)
      setShowSuggestions(true)
      setSelectedIndex(-1)
    } else {
      // Show all teams when focused with empty input
      setSuggestions(NBA_TEAMS)
      setShowSuggestions(false)
    }
  }, [value])

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        suggestionsRef.current &&
        !suggestionsRef.current.contains(e.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(e.target as Node)
      ) {
        setShowSuggestions(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleSubmit = (teamName?: string) => {
    const guessValue = teamName || value
    const team = NBA_TEAMS.find(
      (t) => t.name.toLowerCase() === guessValue.toLowerCase()
    )
    if (team) {
      onGuess(team.name)
      setValue('')
      setShowSuggestions(false)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setSelectedIndex((prev) => Math.min(prev + 1, suggestions.length - 1))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setSelectedIndex((prev) => Math.max(prev - 1, -1))
    } else if (e.key === 'Enter') {
      e.preventDefault()
      if (selectedIndex >= 0 && suggestions[selectedIndex]) {
        handleSubmit(suggestions[selectedIndex].name)
      } else if (suggestions.length === 1) {
        handleSubmit(suggestions[0].name)
      }
    } else if (e.key === 'Escape') {
      setShowSuggestions(false)
    }
  }

  const handleSuggestionClick = (teamName: string) => {
    handleSubmit(teamName)
  }

  const handleFocus = () => {
    if (value.length === 0) {
      setSuggestions(NBA_TEAMS)
    }
    setShowSuggestions(true)
  }

  return (
    <div className="relative w-full max-w-md mx-auto">
      <div className="flex gap-2">
        <div className="relative flex-1">
          <input
            ref={inputRef}
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={handleKeyDown}
            onFocus={handleFocus}
            disabled={disabled}
            placeholder="Search NBA teams..."
            className="w-full px-4 py-3 bg-input border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          />

          {/* Autocomplete dropdown with team logos */}
          <AnimatePresence>
            {showSuggestions && suggestions.length > 0 && (
              <motion.div
                ref={suggestionsRef}
                className="absolute z-50 w-full mt-1 bg-popover border border-border rounded-lg shadow-xl overflow-hidden max-h-64 overflow-y-auto"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.15 }}
              >
                {suggestions.map((team, index) => (
                  <motion.button
                    key={team.name}
                    className={`w-full px-3 py-2.5 text-left text-sm transition-colors flex items-center gap-3 ${
                      index === selectedIndex
                        ? 'bg-primary text-primary-foreground'
                        : 'text-foreground hover:bg-muted'
                    }`}
                    onClick={() => handleSuggestionClick(team.name)}
                  >
                    <div className="relative w-6 h-6 flex-shrink-0">
                      <Image
                        src={TEAM_LOGOS[team.name]}
                        alt={team.name}
                        fill
                        className="object-contain"
                        unoptimized
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <span className="font-medium truncate">{team.name}</span>
                      <span className={`ml-2 text-xs ${index === selectedIndex ? 'opacity-70' : 'text-muted-foreground'}`}>
                        {team.conference} · {team.division}
                      </span>
                    </div>
                  </motion.button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Orange accent Guess button */}
        <motion.button
          onClick={() => handleSubmit()}
          disabled={disabled || !NBA_TEAMS.some((t) => t.name.toLowerCase() === value.toLowerCase())}
          className="px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          Guess
        </motion.button>
      </div>

      {/* Attempts indicator - orange for remaining, gray for used */}
      <div className="flex items-center justify-center gap-2 mt-3">
        <span className="text-sm text-muted-foreground">Attempts left:</span>
        <div className="flex gap-1.5">
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className={`w-3 h-3 rounded-full ${
                i < attemptsLeft ? 'bg-orange-500' : 'bg-muted'
              }`}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: i * 0.1 }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
