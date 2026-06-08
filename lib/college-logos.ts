const SR_COLLEGE_LOGO_BASE = 'https://cdn.ssref.net/nocdn/tlogo/ncaa'

const COLLEGE_SLUG_OVERRIDES: Record<string, string> = {
  UNC: 'north-carolina',
  UConn: 'connecticut',
  USC: 'southern-california',
  UNLV: 'nevada-las-vegas',
  Pitt: 'pittsburgh',
  'Ole Miss': 'mississippi',
  "St. John's": 'st-johns-ny',
  BYU: 'brigham-young',
  LSU: 'louisiana-state',
  TCU: 'texas-christian',
  SMU: 'southern-methodist',
  UCF: 'central-florida',
  UTEP: 'texas-el-paso',
  UTSA: 'texas-san-antonio',
  VCU: 'virginia-commonwealth',
  UMass: 'massachusetts',
  UMBC: 'maryland-baltimore-county',
  GW: 'george-washington',
  Penn: 'pennsylvania',
  'Little Rock': 'arkansas-little-rock',
  ULM: 'louisiana-monroe',
  UTRGV: 'texas-rio-grande-valley',
  'Colorado St': 'colorado-state',
  'San Diego St': 'san-diego-state',
  'San Jose St': 'san-jose-state',
  'Mississippi St': 'mississippi-state',
  'Long Beach St': 'long-beach-state',
  'Cal St Fullerton': 'cal-state-fullerton',
  'Cal St Northridge': 'cal-state-northridge',
  'Cal St Bakersfield': 'cal-state-bakersfield',
}

const KNOWN_COLLEGES = new Set([
  'Alabama', 'Arizona', 'Arizona State', 'Arkansas',
  'Auburn', 'Boston College', 'Bowling Green', 'Butler',
  'California', 'Cincinnati', 'Clemson', 'Colorado',
  'Creighton', 'Davidson', 'Duke', 'Baylor', 'Florida',
  'Florida State', 'Fresno State', 'Georgetown', 'Georgia',
  'Georgia Tech', 'Gonzaga', 'Houston', 'Illinois',
  'Indiana', 'Iowa', 'Iowa State', 'Kansas', 'Kansas State',
  'Kentucky', 'Lehigh', 'Louisville', 'LSU', 'Marquette',
  'Maryland', 'Memphis', 'Miami', 'Miami (FL)', 'Michigan',
  'Michigan State', 'Minnesota', 'Mississippi State',
  'Missouri', 'Murray State', 'NC State', 'Nebraska',
  'Northwestern', 'Notre Dame', 'Ohio State', 'Oklahoma',
  'Oklahoma State', 'Old Dominion', 'Ole Miss', 'Oregon',
  'Oregon State', 'Penn State', 'Pitt', 'Providence',
  'Purdue', 'Rutgers', 'Seton Hall', 'South Carolina',
  "St. John's", 'Stanford', 'Syracuse', 'TCU', 'Tennessee',
  'Tennessee State', 'Texas', 'Texas A&M', 'Texas Tech',
  'UCLA', 'UConn', 'UNC', 'UNLV', 'USC', 'Utah',
  'Vanderbilt', 'Villanova', 'Virginia', 'Virginia Tech',
  'Wake Forest', 'Washington', 'Washington State',
  'Weber State', 'West Virginia', 'Western Kentucky',
  'Wichita State', 'Wisconsin', 'Xavier',
])

const COLLEGE_NAME_MAP: Record<string, string> = {
  'Bowling Green State': 'Bowling Green',
  BYU: 'Brigham Young',
  'Cal State Bakersfield': 'CSU Bakersfield',
  'Cal State Fullerton': 'Cal State Fullerton',
  'Cal State Northridge': 'Cal State Northridge',
  'Central Florida': 'UCF',
  'Colorado State': 'Colorado St.',
  'East Carolina': 'East Carolina',
  'Eastern Michigan': 'Eastern Michigan',
  'George Mason': 'George Mason',
  'Georgia Southern': 'Georgia Southern',
  'Georgia State': 'Georgia State',
  'Illinois State': 'Illinois St.',
  'Iowa State': 'Iowa St.',
  'Jackson State': 'Jackson St.',
  'James Madison': 'James Madison',
  'Kansas City': 'UMKC',
  'Louisiana Tech': 'Louisiana Tech',
  'Louisiana-Lafayette': 'Louisiana',
  'Louisiana-Monroe': 'UL Monroe',
  'Loyola (IL)': 'Loyola Chicago',
  'Loyola Marymount': 'Loyola Marymount',
  'Loyola-Chicago': 'Loyola Chicago',
  'Massachusetts': 'UMass',
  'Miami (FL)': 'Miami (FL)',
  'Miami (OH)': 'Miami (OH)',
  'Middle Tennessee': 'Middle Tennessee',
  'Middle Tennessee State': 'Middle Tennessee',
  'Mississippi State': 'Mississippi St.',
  'Missouri State': 'Missouri St.',
  'Mount Saint Mary': 'Mount St. Mary',
  'Mount Saint Marys': 'Mount St. Mary',
  'Nevada-Las Vegas': 'UNLV',
  'North Carolina': 'UNC',
  'North Carolina State': 'NC State',
  'Northern Iowa': 'Northern Iowa',
  'Northwestern State': 'Northwestern St.',
  'Ohio State': 'Ohio St.',
  'Ole Miss': 'Ole Miss',
  'Penn State': 'Penn St.',
  'Saint Josephs': "Saint Joseph's",
  'Saint Louis': "Saint Louis",
  'Saint Marys': "Saint Mary's",
  'Sam Houston State': 'Sam Houston',
  'San Diego State': 'San Diego St.',
  'SMU': 'SMU',
  'Southern California': 'USC',
  'Southern Illinois': 'Southern Illinois',
  'Southern Mississippi': 'Southern Miss',
  'St. Bonaventure': "St. Bonaventure",
  'St. Francis (NY)': "St. Francis (NY)",
  'St. Francis (PA)': "St. Francis (PA)",
  'St. Johns': "St. John's",
  'St. Josephs': "Saint Joseph's",
  'St. Louis': "Saint Louis",
  'St. Marys': "Saint Mary's",
  'St. Thomas Aquinas': "St. Thomas Aquinas",
  'Stephen F. Austin': "Stephen F. Austin",
  'Tennessee State': "Tennessee St.",
  'Tennessee Tech': "Tennessee Tech",
  'Texas A&M': "Texas A&M",
  'Texas Christian': 'TCU',
  'Texas-El Paso': 'UTEP',
  'Texas-San Antonio': 'UTSA',
  'UC Irvine': 'UC Irvine',
  'UC Santa Barbara': 'UC Santa Barbara',
  'UCLA': 'UCLA',
  'UNC Asheville': 'UNC Asheville',
  'UNC Wilmington': 'UNC Wilmington',
  'UNLV': 'UNLV',
  'USC': 'USC',
  'Virginia Commonwealth': 'VCU',
  'Wake Forest': 'Wake Forest',
  'Washington State': 'Washington St.',
  'Weber State': 'Weber St.',
  'Western Michigan': 'Western Michigan',
  'Wichita State': 'Wichita St.',
  'Winston-Salem State': 'Winston-Salem',
}

function normalizeCollegeName(name: string): string {
  let cleaned = name.trim()
  for (const prefix of ['University of ', 'The ']) {
    if (cleaned.startsWith(prefix)) {
      cleaned = cleaned.slice(prefix.length)
    }
  }
  cleaned = cleaned.replace(/\s*\([^)]*\)/g, '').trim()
  return COLLEGE_NAME_MAP[cleaned] || cleaned
}

function collegeToSlug(name: string): string {
  if (!name) return ''
  name = name.trim()
  if (COLLEGE_SLUG_OVERRIDES[name]) return COLLEGE_SLUG_OVERRIDES[name]
  let slug = name.toLowerCase()
  slug = slug.replace(/ /g, '-')
  slug = slug.replace(/\./g, '')
  slug = slug.replace(/'/g, '')
  slug = slug.replace(/&/g, '')
  slug = slug.replace(/\(/g, '').replace(/\)/g, '')
  slug = slug.replace(/,/g, '')
  slug = slug.replace(/-+/g, '-')
  slug = slug.replace(/^-+|-+$/g, '')
  return slug
}

export function primaryCollegeName(college: string) {
  const trimmed = college.trim()
  if (!trimmed) {
    return ''
  }

  const parts = trimmed.split(',').map(p => p.trim())
  // Try right-to-left, return first segment that can produce an image
  for (let i = parts.length - 1; i >= 0; i--) {
    const part = parts[i]
    const normalized = normalizeCollegeName(part)
    if (KNOWN_COLLEGES.has(normalized) || KNOWN_COLLEGES.has(part)) return part
  }
  // Fallback: rightmost segment
  return parts[parts.length - 1]
}

export function resolveCollegeImage(college: string) {
  const primary = primaryCollegeName(college)
  if (!primary) {
    return ''
  }

  let slug = collegeToSlug(primary)
  if (!slug) {
    const normalized = normalizeCollegeName(primary)
    slug = collegeToSlug(normalized)
  }
  if (!slug) {
    return ''
  }

  return `${SR_COLLEGE_LOGO_BASE}/${slug}.png`
}
