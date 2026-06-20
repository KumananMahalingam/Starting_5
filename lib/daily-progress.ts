export type GameMode = 'college' | 'country' | 'stats' | 'ppg'

// Single source of truth for all daily game modes. Add new modes here and the
// "puzzles played today" counter + streak logic stays mode-agnostic.
export const GAME_MODES: GameMode[] = ['college', 'country', 'stats', 'ppg']

export type ModeStatus = 'playing' | 'won' | 'lost'

export interface ModeAttempt {
  team: string
  year: string
}

export interface SavedHint {
  type: 'cold' | 'warm' | 'hot'
  message: string
}

export interface ModeDayState {
  status: ModeStatus
  attempts: ModeAttempt[]
  hints: SavedHint[]
}

interface DailyProgressStore {
  streak: number
  lastPlayDate: string | null
  days: Record<string, Partial<Record<GameMode, ModeDayState>>>
}

const STORAGE_KEY = 'starting5-daily-progress'

export function getTodayKey(): string {
  const now = new Date()
  const year = now.getFullYear()
  const month = String(now.getMonth() + 1).padStart(2, '0')
  const day = String(now.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

function getYesterdayKey(): string {
  const d = new Date()
  d.setDate(d.getDate() - 1)
  const year = d.getFullYear()
  const month = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

function loadStore(): DailyProgressStore {
  if (typeof window === 'undefined') {
    return { streak: 0, lastPlayDate: null, days: {} }
  }

  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return { streak: 0, lastPlayDate: null, days: {} }
    const parsed = JSON.parse(raw) as DailyProgressStore
    return {
      streak: parsed.streak ?? 0,
      lastPlayDate: parsed.lastPlayDate ?? null,
      days: parsed.days ?? {},
    }
  } catch {
    return { streak: 0, lastPlayDate: null, days: {} }
  }
}

function saveStore(store: DailyProgressStore) {
  if (typeof window === 'undefined') return
  localStorage.setItem(STORAGE_KEY, JSON.stringify(store))
}

export function getPlayStreak(): number {
  return loadStore().streak
}

export function getModeState(mode: GameMode): ModeDayState | null {
  const store = loadStore()
  return store.days[getTodayKey()]?.[mode] ?? null
}

export function isModeFinishedToday(mode: GameMode): boolean {
  const state = getModeState(mode)
  return state?.status === 'won' || state?.status === 'lost'
}

export function getTodayCompletedCount(): number {
  const store = loadStore()
  const today = store.days[getTodayKey()]
  if (!today) return 0
  return GAME_MODES.filter(
    (mode) => today[mode]?.status === 'won' || today[mode]?.status === 'lost'
  ).length
}

/** Total number of daily modes available — drives the "N/total played" caption. */
export function getTotalModeCount(): number {
  return GAME_MODES.length
}

export function saveModeProgress(mode: GameMode, state: ModeDayState): void {
  const store = loadStore()
  const today = getTodayKey()
  if (!store.days[today]) store.days[today] = {}

  const existing = store.days[today][mode]
  if (existing?.status === 'won' || existing?.status === 'lost') return

  store.days[today][mode] = state
  saveStore(store)
}

/** Call when a mode is won or lost. Updates play streak and returns the new streak. */
export function recordModeComplete(mode: GameMode, state: ModeDayState): number {
  const store = loadStore()
  const today = getTodayKey()
  if (!store.days[today]) store.days[today] = {}

  store.days[today][mode] = state

  const alreadyPlayedToday = store.lastPlayDate === today
  if (!alreadyPlayedToday) {
    const yesterday = getYesterdayKey()
    if (store.lastPlayDate === yesterday) {
      store.streak = store.streak + 1
    } else {
      store.streak = 1
    }
    store.lastPlayDate = today
  }

  saveStore(store)
  return store.streak
}
