export type ClueMode = 'college' | 'stats'

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
  stats: PlayerStats
  nationality: string
  nationalityCode: string // ISO 2-letter code for flagcdn
  headshotUrl: string
}

export interface DailyPuzzle {
  date: string
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

// NBA Teams data for autocomplete
export const NBA_TEAMS = [
  { name: 'Atlanta Hawks', conference: 'Eastern', division: 'Southeast' },
  { name: 'Boston Celtics', conference: 'Eastern', division: 'Atlantic' },
  { name: 'Brooklyn Nets', conference: 'Eastern', division: 'Atlantic' },
  { name: 'Charlotte Hornets', conference: 'Eastern', division: 'Southeast' },
  { name: 'Chicago Bulls', conference: 'Eastern', division: 'Central' },
  { name: 'Cleveland Cavaliers', conference: 'Eastern', division: 'Central' },
  { name: 'Dallas Mavericks', conference: 'Western', division: 'Southwest' },
  { name: 'Denver Nuggets', conference: 'Western', division: 'Northwest' },
  { name: 'Detroit Pistons', conference: 'Eastern', division: 'Central' },
  { name: 'Golden State Warriors', conference: 'Western', division: 'Pacific' },
  { name: 'Houston Rockets', conference: 'Western', division: 'Southwest' },
  { name: 'Indiana Pacers', conference: 'Eastern', division: 'Central' },
  { name: 'LA Clippers', conference: 'Western', division: 'Pacific' },
  { name: 'Los Angeles Lakers', conference: 'Western', division: 'Pacific' },
  { name: 'Memphis Grizzlies', conference: 'Western', division: 'Southwest' },
  { name: 'Miami Heat', conference: 'Eastern', division: 'Southeast' },
  { name: 'Milwaukee Bucks', conference: 'Eastern', division: 'Central' },
  { name: 'Minnesota Timberwolves', conference: 'Western', division: 'Northwest' },
  { name: 'New Orleans Pelicans', conference: 'Western', division: 'Southwest' },
  { name: 'New York Knicks', conference: 'Eastern', division: 'Atlantic' },
  { name: 'Oklahoma City Thunder', conference: 'Western', division: 'Northwest' },
  { name: 'Orlando Magic', conference: 'Eastern', division: 'Southeast' },
  { name: 'Philadelphia 76ers', conference: 'Eastern', division: 'Atlantic' },
  { name: 'Phoenix Suns', conference: 'Western', division: 'Pacific' },
  { name: 'Portland Trail Blazers', conference: 'Western', division: 'Northwest' },
  { name: 'Sacramento Kings', conference: 'Western', division: 'Pacific' },
  { name: 'San Antonio Spurs', conference: 'Western', division: 'Southwest' },
  { name: 'Toronto Raptors', conference: 'Eastern', division: 'Atlantic' },
  { name: 'Utah Jazz', conference: 'Western', division: 'Northwest' },
  { name: 'Washington Wizards', conference: 'Eastern', division: 'Southeast' },
]

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

// Stats mode puzzle — same team, stats clue mode
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
    return { type: 'hot', message: '🔥 Same division!' }
  }

  if (guessed.conference === correctConference) {
    return { type: 'warm', message: '🌡️ Warmer — same conference!' }
  }

  return { type: 'cold', message: '❄️ Cold — wrong conference' }
}