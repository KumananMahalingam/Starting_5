import initSqlJs from 'sql.js'
import fs from 'fs'
import path from 'path'

const MODE_TEAM_OFFSET = { college: 0, country: 1, stats: 2 }

function getDateKey(referenceDate) {
  return referenceDate.toISOString().slice(0, 10)
}

function getDailyIndex(referenceDate, length, mode) {
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

const SQL = await initSqlJs({
  locateFile: (file) => path.join('node_modules/sql.js/dist', file),
})
const db = new SQL.Database(fs.readFileSync('nba_2022.db'))
const teamRows = db.exec(`
  SELECT DISTINCT team, season
  FROM starters
  GROUP BY season, team
  HAVING COUNT(*) = 5 AND COUNT(DISTINCT position) = 5
  ORDER BY season, team
`)[0]

const today = new Date('2026-06-06')
for (const mode of ['college', 'country', 'stats']) {
  const index = getDailyIndex(today, teamRows.values.length, mode)
  const [team, season] = teamRows.values[index]
  console.log(`${mode}: ${team} (${season})`)
}

const sample = db.exec(
  'SELECT player_name, college_image, nationality_image FROM starters WHERE college_image != "" LIMIT 3'
)[0]
console.log('Sample images:', sample.values)
