import path from 'path'
import { readFile } from 'fs/promises'
import initSqlJs from 'sql.js'
import { resolveCollegeImage } from '@/lib/college-logos'
import { TEAM_BY_ABBREVIATION, TEAM_INFO } from '@/lib/team-data'
import type { ClueMode, DailyPuzzle, Player, Position } from '@/lib/game-data'

const POSITION_ORDER: Record<Position, number> = {
  PG: 0,
  SG: 1,
  SF: 2,
  PF: 3,
  C: 4,
}

const NATIONALITY_CODES: Record<string, string> = {
  Australia: 'au',
  Austria: 'at',
  Bahamas: 'bs',
  Bosnia: 'ba',
  Cameroon: 'cm',
  Canada: 'ca',
  'Dominican Republic': 'do',
  Finland: 'fi',
  France: 'fr',
  Germany: 'de',
  Greece: 'gr',
  Italy: 'it',
  Latvia: 'lv',
  Lithuania: 'lt',
  'New Zealand': 'nz',
  Nigeria: 'ng',
  Serbia: 'rs',
  Slovenia: 'si',
  Switzerland: 'ch',
  USA: 'us',
  'United States': 'us',
  'United Kingdom': 'gb',
}

const MODE_TEAM_OFFSET: Record<ClueMode, number> = {
  college: 0,
  country: 1,
  stats: 2,
}

let sqlJsPromise: Promise<ReturnType<typeof initSqlJs>> | null = null

function getDateKey(referenceDate: Date) {
  return referenceDate.toISOString().slice(0, 10)
}

function getDailyIndex(referenceDate: Date, length: number, mode: ClueMode) {
  const dateKey = getDateKey(referenceDate)
  let hash = 0

  for (const character of dateKey) {
    hash = (hash * 31 + character.charCodeAt(0)) >>> 0
  }

  for (const character of mode) {
    hash = (hash * 31 + character.charCodeAt(0)) >>> 0
  }

  const baseIndex = hash % length
  return (baseIndex + MODE_TEAM_OFFSET[mode]) % length
}

function normalizeNationality(nationality: string) {
  if (nationality === 'USA') {
    return 'United States'
  }

  return nationality
}

function getNationalityCode(nationality: string) {
  return NATIONALITY_CODES[nationality] ?? 'un'
}

function normalizeTeamAbbreviation(teamAbbreviation: string) {
  return teamAbbreviation
}

function escapeSvgText(value: string) {
  return value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
}

function initialsFrom(value: string, count = 2) {
  return value
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, count)
    .map((part) => part[0]?.toUpperCase() ?? '')
    .join('')
}

function makeBadgeUrl(label: string, accent: string) {
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 160">
      <defs>
        <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="#111827" />
          <stop offset="100%" stop-color="#030712" />
        </linearGradient>
      </defs>
      <rect width="160" height="160" rx="80" fill="url(#bg)" />
      <circle cx="80" cy="80" r="58" fill="none" stroke="${accent}" stroke-width="8" opacity="0.35" />
      <text x="80" y="92" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-size="48" font-weight="700" fill="#ffffff">${escapeSvgText(initialsFrom(label))}</text>
    </svg>
  `.trim()

  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`
}

function createHeadshotUrl(playerName: string, teamAbbreviation: string) {
  const initials = playerName
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? '')
    .join('')

  const team = TEAM_BY_ABBREVIATION[teamAbbreviation]
  const accent = team?.abbreviation === 'BOS' ? '#f97316' : '#f59e0b'
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
      <defs>
        <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="#111827" />
          <stop offset="100%" stop-color="#030712" />
        </linearGradient>
      </defs>
      <rect width="200" height="200" rx="100" fill="url(#bg)" />
      <circle cx="100" cy="100" r="76" fill="none" stroke="${accent}" stroke-width="8" opacity="0.3" />
      <text x="100" y="112" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-size="72" font-weight="700" fill="#ffffff">${escapeSvgText(initials)}</text>
    </svg>
  `.trim()

  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`
}

function buildPlayer(row: Record<string, unknown>): Player {
  const rawNationality = String(row.nationality ?? '')
  const nationality = normalizeNationality(rawNationality)
  const nationalityCode = getNationalityCode(rawNationality) || getNationalityCode(nationality)
  const teamAbbreviation = normalizeTeamAbbreviation(String(row.team ?? ''))
  const college = String(row.college ?? '')
  const storedCollegeImage = String(row.college_image ?? '').trim()
  const storedNationalityImage = String(row.nationality_image ?? '').trim()
  const resolvedCollegeImage = storedCollegeImage || resolveCollegeImage(college)
  const resolvedNationalityImage =
    storedNationalityImage || `https://flagcdn.com/w160/${nationalityCode}.png`
  const team = TEAM_BY_ABBREVIATION[teamAbbreviation]
  const accent = team?.abbreviation === 'BOS' ? '#f97316' : '#f59e0b'

  return {
    name: String(row.player_name ?? ''),
    position: String(row.position ?? '') as Position,
    college,
    collegeLogo: resolvedCollegeImage,
    collegeImage:
      resolvedCollegeImage || makeBadgeUrl(college || String(row.player_name ?? ''), accent),
    stats: {
      pts: Number(row.pts_per_g ?? 0),
      reb: Number(row.trb_per_g ?? 0),
      ast: Number(row.ast_per_g ?? 0),
    },
    nationality,
    nationalityCode,
    nationalityImage: resolvedNationalityImage,
    headshotUrl:
      String(row.headshot_url ?? '').trim() ||
      createHeadshotUrl(String(row.player_name ?? ''), teamAbbreviation),
  }
}

async function getSqlJs() {
  if (!sqlJsPromise) {
    const wasmBuffer = await readFile(
      path.join(process.cwd(), 'public', 'sql-wasm.wasm')
    )
    sqlJsPromise = initSqlJs({
      wasmBinary: wasmBuffer,
    })
  }
  return sqlJsPromise
}

export async function getDailyPuzzle(mode: ClueMode, referenceDate = new Date()): Promise<DailyPuzzle> {
  const sqlJs = await getSqlJs()
  const dbBuffer = await readFile(path.join(process.cwd(), 'thing.db'))
  const database = new sqlJs.Database(new Uint8Array(dbBuffer))
  const nationalityFilter =
    mode === 'country' ? `AND COUNT(DISTINCT CASE WHEN nationality NOT IN ('', 'Unknown') THEN nationality END) >= 3` : ''

  const teamRows = database.exec(`
    SELECT DISTINCT team, season
    FROM starters
    GROUP BY season, team
    HAVING COUNT(*) = 5 AND COUNT(DISTINCT position) = 5 ${nationalityFilter}
    ORDER BY season, team
  `)[0]

  if (!teamRows) {
    throw new Error('No teams found in dataset')
  }

  const teamIndex = getDailyIndex(referenceDate, teamRows.values.length, mode)
  const [rawTeamAbbreviation, season] = teamRows.values[teamIndex] as [string, string]
  const teamAbbreviation = normalizeTeamAbbreviation(rawTeamAbbreviation)
  const team = TEAM_BY_ABBREVIATION[teamAbbreviation] ?? TEAM_INFO.find((item) => item.abbreviation === teamAbbreviation)

  if (!team) {
    throw new Error(`No team metadata found for ${teamAbbreviation}`)
  }

  const query = `
    SELECT *
    FROM starters
    WHERE team = ? AND season = ?
    ORDER BY CASE position
      WHEN 'PG' THEN 0
      WHEN 'SG' THEN 1
      WHEN 'SF' THEN 2
      WHEN 'PF' THEN 3
      WHEN 'C' THEN 4
      ELSE 5
    END
  `
  const statement = database.prepare(query)
  statement.bind([rawTeamAbbreviation, season])
  const columns = statement.getColumnNames()
  const rows: Record<string, unknown>[] = []
  while (statement.step()) {
    rows.push(statement.getAsObject() as Record<string, unknown>)
  }
  statement.free()

  if (rows.length === 0) {
    throw new Error(`No lineup found for ${team.abbreviation} ${season}`)
  }

  const players = rows.map((row) => buildPlayer(row))

  return {
    date: getDateKey(referenceDate),
    season,
    teamName: team.teamName,
    teamCity: team.teamCity,
    teamLogo: team.logoUrl,
    conference: team.conference,
    division: team.division,
    clueMode: mode,
    players: players.sort((left, right) => POSITION_ORDER[left.position] - POSITION_ORDER[right.position]),
  }
}