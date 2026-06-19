import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { ALL_SEASONS } from '@/lib/game-data'
import { NBA_TEAMS, TEAM_LOGOS, getTeamsForSeason } from '@/lib/team-data'

interface GuessInputProps {
  onGuess: (teamName: string, season: string) => void
  disabled: boolean
  attemptsLeft: number
}

const GuessInput = ({ onGuess, disabled, attemptsLeft }: GuessInputProps) => {
  const [year, setYear] = useState('')
  const [value, setValue] = useState('')
  const [suggestions, setSuggestions] = useState<typeof NBA_TEAMS>([])
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [selectedIndex, setSelectedIndex] = useState(-1)
  const [showYearDropdown, setShowYearDropdown] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const suggestionsRef = useRef<HTMLDivElement>(null)
  const yearRef = useRef<HTMLDivElement>(null)

  const seasonTeams = year
    ? getTeamsForSeason(year).map((t) => ({ name: `${t.teamCity} ${t.teamName}`, conference: t.conference, division: t.division }))
    : []

  useEffect(() => {
    if (value.length > 0 && year && !seasonTeams.some((t) => t.name.toLowerCase() === value.toLowerCase())) {
      setValue('')
      setSuggestions([])
      setShowSuggestions(false)
      return
    }

    if (value.length > 0 && year) {
      const filtered = seasonTeams.filter((team) =>
        team.name.toLowerCase().includes(value.toLowerCase())
      )
      setSuggestions(filtered)
      setShowSuggestions(true)
      setSelectedIndex(-1)
    } else {
      setSuggestions(year ? seasonTeams : [])
      setShowSuggestions(false)
    }
  }, [value, year])

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        suggestionsRef.current && !suggestionsRef.current.contains(e.target as Node) &&
        inputRef.current && !inputRef.current.contains(e.target as Node)
      ) {
        setShowSuggestions(false)
      }
      if (
        yearRef.current && !yearRef.current.contains(e.target as Node)
      ) {
        setShowYearDropdown(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleSubmit = (teamName?: string) => {
    const guessValue = teamName || value
    const team = seasonTeams.find(
      (t) => t.name.toLowerCase() === guessValue.toLowerCase()
    )
    if (team && year) {
      onGuess(team.name, year)
      setValue('')
      setYear('')
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
      setShowYearDropdown(false)
    }
  }

  const handleSuggestionClick = (teamName: string) => {
    setValue(teamName)
    setShowSuggestions(false)
    setSelectedIndex(-1)
  }

  const handleFocus = () => {
    if (year && value.length === 0) {
      setSuggestions(seasonTeams)
      setShowSuggestions(true)
    }
  }

  const canSubmit = seasonTeams.some((t) => t.name.toLowerCase() === value.toLowerCase()) && year !== ''
  const teamInputDisabled = disabled || !year

  return (
    <div className="relative w-full mx-auto">
      <div className="flex gap-2">
        {/* Season dropdown — first */}
        <div className="relative w-[130px]" ref={yearRef}>
          <button
            type="button"
            onClick={() => setShowYearDropdown(!showYearDropdown)}
            disabled={disabled}
            className="w-full px-3 py-3 bg-input border border-border rounded-lg text-foreground text-sm text-left focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-between"
          >
            <span className={year ? '' : 'text-muted-foreground'}>
              {year || 'Season'}
            </span>
            <svg
              className={`w-4 h-4 ml-1 transition-transform ${showYearDropdown ? 'rotate-180' : ''}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          <AnimatePresence>
            {showYearDropdown && (
              <motion.div
                className="absolute z-50 w-full mt-1 bg-popover border border-border rounded-lg shadow-xl overflow-hidden max-h-48 overflow-y-auto"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.15 }}
              >
                {ALL_SEASONS.map((s) => (
                  <button
                    key={s}
                    type="button"
                    className={`w-full px-3 py-2 text-left text-sm transition-colors ${
                      s === year
                        ? 'bg-primary text-primary-foreground'
                        : 'text-foreground hover:bg-muted'
                    }`}
                    onClick={() => {
                      setYear(s)
                      setValue('')
                      setShowYearDropdown(false)
                    }}
                  >
                    {s}
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Team input — second, disabled until season selected */}
        <div className="relative flex-1">
          <input
            ref={inputRef}
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={handleKeyDown}
            onFocus={handleFocus}
            disabled={teamInputDisabled}
            placeholder={year ? 'Search NBA teams...' : 'Pick a season first'}
            className="w-full px-4 py-3 bg-input border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          />

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

        <motion.button
          onClick={() => handleSubmit()}
          disabled={disabled || !canSubmit}
          className="px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          Guess
        </motion.button>
      </div>
    </div>
  )
}

export { GuessInput }
export default GuessInput
