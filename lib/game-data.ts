import { NBA_TEAMS } from '@/lib/team-data'

export type ClueMode = 'college' | 'country' | 'stats'

export type Position = 'PG' | 'SG' | 'SF' | 'PF' | 'C'

export interface PlayerStats {
  pts: number
  reb: number
  ast: number
}

export interface Player {
  name: string
  position: Position
  college: string
  collegeLogo: string
  collegeImage?: string
  stats: PlayerStats
  nationality: string
  nationalityCode: string // ISO 2-letter code for flagcdn
  nationalityImage?: string
  headshotUrl: string
}

export interface DailyPuzzle {
  date: string
  season?: string
  teamName: string
  teamCity: string
  teamLogo: string
  conference: string
  division: string
  clueMode: ClueMode
  players: Player[]
}

export interface Hint {
  type: 'cold' | 'warm' | 'hot'
  message: string
}

// Shared player data — Boston Celtics starting 5
const CELTICS_PLAYERS: Player[] = [
  {
    name: 'Derrick White',
    position: 'PG',
    college: 'Colorado',
    collegeLogo: 'https://upload.wikimedia.org/wikipedia/commons/c/c5/Colorado_Buffaloes_logo.svg',
    stats: { pts: 15.2, reb: 4.3, ast: 5.1 },
    nationality: 'United States',
    nationalityCode: 'us',
    headshotUrl: 'https://cdn.nba.com/headshots/nba/latest/1040x760/1628401.png',
  },
  {
    name: 'Jaylen Brown',
    position: 'SG',
    college: 'California',
    collegeLogo: 'https://upload.wikimedia.org/wikipedia/commons/8/8b/California_Golden_Bears_logo.svg',
    stats: { pts: 23.0, reb: 5.5, ast: 3.6 },
    nationality: 'United States',
    nationalityCode: 'us',
    headshotUrl: 'https://cdn.nba.com/headshots/nba/latest/1040x760/1627759.png',
  },
  {
    name: 'Jayson Tatum',
    position: 'SF',
    college: 'Duke',
    collegeLogo: 'https://upload.wikimedia.org/wikipedia/commons/e/e1/Duke_Athletics_logo.svg',
    stats: { pts: 26.9, reb: 8.1, ast: 4.9 },
    nationality: 'United States',
    nationalityCode: 'us',
    headshotUrl: 'https://cdn.nba.com/headshots/nba/latest/1040x760/1628369.png',
  },
  {
    name: 'Al Horford',
    position: 'PF',
    college: 'Florida',
    collegeLogo: 'https://upload.wikimedia.org/wikipedia/en/1/14/Florida_Gators_gator_logo.svg',
    stats: { pts: 8.6, reb: 6.4, ast: 3.5 },
    nationality: 'Dominican Republic',
    nationalityCode: 'do',
    headshotUrl: 'https://cdn.nba.com/headshots/nba/latest/1040x760/201143.png',
  },
  {
    name: 'Kristaps Porzingis',
    position: 'C',
    college: 'None (International)',
    collegeLogo: '',
    stats: { pts: 20.1, reb: 7.2, ast: 1.8 },
    nationality: 'Latvia',
    nationalityCode: 'lv',
    headshotUrl: 'https://cdn.nba.com/headshots/nba/latest/1040x760/204001.png',
  },
]

// College / Country mode puzzle
export const COLLEGE_PUZZLE: DailyPuzzle = {
  date: '2026-06-04',
  teamName: 'Celtics',
  teamCity: 'Boston',
  teamLogo: 'https://cdn.nba.com/logos/nba/1610612738/global/L/logo.svg',
  conference: 'Eastern',
  division: 'Atlantic',
  clueMode: 'college',
  players: CELTICS_PLAYERS,
}

// Stats mode puzzle — stats clue mode
export const STATS_PUZZLE: DailyPuzzle = {
  date: '2026-06-04',
  teamName: 'Celtics',
  teamCity: 'Boston',
  teamLogo: 'https://cdn.nba.com/logos/nba/1610612738/global/L/logo.svg',
  conference: 'Eastern',
  division: 'Atlantic',
  clueMode: 'stats',
  players: CELTICS_PLAYERS,
}

// Legacy export — keep compatible
export const TODAYS_PUZZLE = COLLEGE_PUZZLE

export function getYearDiff(guessedYear: string, correctYear: string): number {
  const guessedStart = parseInt(guessedYear.split('-')[0], 10)
  const correctStart = parseInt(correctYear.split('-')[0], 10)
  return Math.abs(guessedStart - correctStart)
}

export function getYearHint(guessedYear: string, correctYear: string): Hint {
  const diff = getYearDiff(guessedYear, correctYear)
  if (diff === 0) {
    return { type: 'hot', message: 'Correct year!' }
  }
  if (diff === 1) {
    return { type: 'hot', message: 'Very close — off by 1 season' }
  }
  if (diff <= 3) {
    return { type: 'warm', message: `Off by ${diff} seasons` }
  }
  return { type: 'cold', message: `Off by ${diff} seasons` }
}

export function getHint(
  guessedTeam: string,
  correctTeam: string,
  correctConference: string,
  correctDivision: string
): Hint {
  const guessed = NBA_TEAMS.find((t) => t.name === guessedTeam)

  if (!guessed) {
    return { type: 'cold', message: 'Ice cold — wrong side of the country!' }
  }

  if (guessed.division === correctDivision) {
    return { type: 'hot', message: 'Same division!' }
  }

  if (guessed.conference === correctConference) {
    return { type: 'warm', message: 'Warmer — same conference!' }
  }

  return { type: 'cold', message: 'Wrong conference' }
}

export const ALL_SEASONS: string[] = [
  "1983-84", "1984-85", "1985-86", "1986-87", "1987-88", "1988-89", "1989-90",
  "1990-91", "1991-92", "1992-93", "1993-94", "1994-95", "1995-96",
  "1996-97", "1997-98", "1998-99", "1999-00",
  "2000-01", "2001-02", "2002-03", "2003-04", "2004-05", "2005-06", "2006-07", "2007-08", "2008-09",
  "2009-10", "2010-11", "2011-12", "2012-13", "2013-14", "2014-15", "2015-16", "2016-17", "2017-18", "2018-19",
  "2019-20", "2020-21", "2021-22", "2022-23", "2023-24", "2024-25", "2025-26",
]