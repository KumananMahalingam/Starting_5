'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { NBA_TEAMS } from '@/lib/game-data'

interface GuessInputProps {
  onGuess: (team: string) => void
  disabled: boolean
  attemptsLeft: number
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
      setSuggestions([])
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
            onFocus={() => value.length > 0 && setShowSuggestions(true)}
            disabled={disabled}
            placeholder="Enter NBA team name..."
            className="w-full px-4 py-3 bg-input border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          />

          {/* Autocomplete suggestions */}
          <AnimatePresence>
            {showSuggestions && suggestions.length > 0 && (
              <motion.div
                ref={suggestionsRef}
                className="absolute z-50 w-full mt-1 bg-popover border border-border rounded-lg shadow-xl overflow-hidden"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.15 }}
              >
                {suggestions.map((team, index) => (
                  <motion.button
                    key={team.name}
                    className={`w-full px-4 py-2.5 text-left text-sm transition-colors ${
                      index === selectedIndex
                        ? 'bg-primary text-primary-foreground'
                        : 'text-foreground hover:bg-muted'
                    }`}
                    onClick={() => handleSuggestionClick(team.name)}
                    whileHover={{ x: 4 }}
                    transition={{ duration: 0.1 }}
                  >
                    <span className="font-medium">{team.name}</span>
                    <span className="ml-2 text-xs opacity-60">
                      {team.conference} · {team.division}
                    </span>
                  </motion.button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <motion.button
          onClick={() => handleSubmit()}
          disabled={disabled || !NBA_TEAMS.some((t) => t.name.toLowerCase() === value.toLowerCase())}
          className="px-6 py-3 bg-primary text-primary-foreground font-semibold rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors hover:bg-primary/90"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          Guess
        </motion.button>
      </div>

      {/* Attempts indicator */}
      <div className="flex items-center justify-center gap-2 mt-3">
        <span className="text-sm text-muted-foreground">Attempts left:</span>
        <div className="flex gap-1">
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className={`w-3 h-3 rounded-full ${
                i < attemptsLeft ? 'bg-primary' : 'bg-muted'
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
