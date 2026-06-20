module.exports = [
"[externals]/next/dist/compiled/next-server/app-route-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-route-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/@opentelemetry/api [external] (next/dist/compiled/@opentelemetry/api, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/@opentelemetry/api", () => require("next/dist/compiled/@opentelemetry/api"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/after-task-async-storage.external.js [external] (next/dist/server/app-render/after-task-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/after-task-async-storage.external.js", () => require("next/dist/server/app-render/after-task-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/path [external] (path, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("path", () => require("path"));

module.exports = mod;
}),
"[externals]/fs/promises [external] (fs/promises, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("fs/promises", () => require("fs/promises"));

module.exports = mod;
}),
"[externals]/node:fs [external] (node:fs, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("node:fs", () => require("node:fs"));

module.exports = mod;
}),
"[externals]/node:crypto [external] (node:crypto, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("node:crypto", () => require("node:crypto"));

module.exports = mod;
}),
"[project]/lib/college-logos.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "primaryCollegeName",
    ()=>primaryCollegeName,
    "resolveCollegeImage",
    ()=>resolveCollegeImage
]);
const SR_COLLEGE_LOGO_BASE = 'https://cdn.ssref.net/nocdn/tlogo/ncaa';
const COLLEGE_SLUG_OVERRIDES = {
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
    'Cal St Bakersfield': 'cal-state-bakersfield'
};
const KNOWN_COLLEGES = new Set([
    'Alabama',
    'Arizona',
    'Arizona State',
    'Arkansas',
    'Auburn',
    'Boston College',
    'Bowling Green',
    'Butler',
    'California',
    'Cincinnati',
    'Clemson',
    'Colorado',
    'Creighton',
    'Davidson',
    'Duke',
    'Baylor',
    'Florida',
    'Florida State',
    'Fresno State',
    'Georgetown',
    'Georgia',
    'Georgia Tech',
    'Gonzaga',
    'Houston',
    'Illinois',
    'Indiana',
    'Iowa',
    'Iowa State',
    'Kansas',
    'Kansas State',
    'Kentucky',
    'Lehigh',
    'Louisville',
    'LSU',
    'Marquette',
    'Maryland',
    'Memphis',
    'Miami',
    'Miami (FL)',
    'Michigan',
    'Michigan State',
    'Minnesota',
    'Mississippi State',
    'Missouri',
    'Murray State',
    'NC State',
    'Nebraska',
    'Northwestern',
    'Notre Dame',
    'Ohio State',
    'Oklahoma',
    'Oklahoma State',
    'Old Dominion',
    'Ole Miss',
    'Oregon',
    'Oregon State',
    'Penn State',
    'Pitt',
    'Providence',
    'Purdue',
    'Rutgers',
    'Seton Hall',
    'South Carolina',
    "St. John's",
    'Stanford',
    'Syracuse',
    'TCU',
    'Tennessee',
    'Tennessee State',
    'Texas',
    'Texas A&M',
    'Texas Tech',
    'UCLA',
    'UConn',
    'UNC',
    'UNLV',
    'USC',
    'Utah',
    'Vanderbilt',
    'Villanova',
    'Virginia',
    'Virginia Tech',
    'Wake Forest',
    'Washington',
    'Washington State',
    'Weber State',
    'West Virginia',
    'Western Kentucky',
    'Wichita State',
    'Wisconsin',
    'Xavier'
]);
const COLLEGE_NAME_MAP = {
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
    'Winston-Salem State': 'Winston-Salem'
};
function normalizeCollegeName(name) {
    let cleaned = name.trim();
    for (const prefix of [
        'University of ',
        'The '
    ]){
        if (cleaned.startsWith(prefix)) {
            cleaned = cleaned.slice(prefix.length);
        }
    }
    cleaned = cleaned.replace(/\s*\([^)]*\)/g, '').trim();
    return COLLEGE_NAME_MAP[cleaned] || cleaned;
}
function collegeToSlug(name) {
    if (!name) return '';
    name = name.trim();
    if (COLLEGE_SLUG_OVERRIDES[name]) return COLLEGE_SLUG_OVERRIDES[name];
    let slug = name.toLowerCase();
    slug = slug.replace(/ /g, '-');
    slug = slug.replace(/\./g, '');
    slug = slug.replace(/'/g, '');
    slug = slug.replace(/&/g, '');
    slug = slug.replace(/\(/g, '').replace(/\)/g, '');
    slug = slug.replace(/,/g, '');
    slug = slug.replace(/-+/g, '-');
    slug = slug.replace(/^-+|-+$/g, '');
    return slug;
}
function primaryCollegeName(college) {
    const trimmed = college.trim();
    if (!trimmed) {
        return '';
    }
    const parts = trimmed.split(',').map((p)=>p.trim());
    // Try right-to-left, return first segment that can produce an image
    for(let i = parts.length - 1; i >= 0; i--){
        const part = parts[i];
        const normalized = normalizeCollegeName(part);
        if (KNOWN_COLLEGES.has(normalized) || KNOWN_COLLEGES.has(part)) return part;
    }
    // Fallback: rightmost segment
    return parts[parts.length - 1];
}
function resolveCollegeImage(college) {
    const primary = primaryCollegeName(college);
    if (!primary) {
        return '';
    }
    let slug = collegeToSlug(primary);
    if (!slug) {
        const normalized = normalizeCollegeName(primary);
        slug = collegeToSlug(normalized);
    }
    if (!slug) {
        return '';
    }
    return `${SR_COLLEGE_LOGO_BASE}/${slug}.png`;
}
}),
"[project]/lib/team-data.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "NBA_TEAMS",
    ()=>NBA_TEAMS,
    "TEAM_BY_ABBREVIATION",
    ()=>TEAM_BY_ABBREVIATION,
    "TEAM_INFO",
    ()=>TEAM_INFO,
    "TEAM_LOGOS",
    ()=>TEAM_LOGOS,
    "getTeamsForSeason",
    ()=>getTeamsForSeason,
    "isTeamInSeason",
    ()=>isTeamInSeason
]);
function seasonStart(season) {
    return parseInt(season.split('-')[0], 10);
}
function isTeamInSeason(team, season) {
    const s = seasonStart(season);
    return s >= seasonStart(team.firstSeason) && s <= seasonStart(team.lastSeason);
}
function getTeamsForSeason(season) {
    return TEAM_INFO.filter((t)=>isTeamInSeason(t, season));
}
const TEAM_INFO = [
    {
        abbreviation: 'KCK',
        teamCity: 'Kansas City',
        teamName: 'Kings',
        conference: 'Western',
        division: 'Midwest',
        logoUrl: 'https://cdn.nba.com/logos/nba/1610612758/global/L/logo.svg',
        firstSeason: '1983-84',
        lastSeason: '1984-85'
    },
    {
        abbreviation: 'SDC',
        teamCity: 'San Diego',
        teamName: 'Clippers',
        conference: 'Western',
        division: 'Pacific',
        logoUrl: 'https://cdn.nba.com/logos/nba/1610612746/global/L/logo.svg',
        firstSeason: '1983-84',
        lastSeason: '1983-84'
    },
    {
        abbreviation: 'WSB',
        teamCity: 'Washington',
        teamName: 'Bullets',
        conference: 'Eastern',
        division: 'Atlantic',
        logoUrl: 'https://cdn.nba.com/logos/nba/1610612764/global/L/logo.svg',
        firstSeason: '1983-84',
        lastSeason: '1996-97'
    },
    {
        abbreviation: 'ATL',
        teamCity: 'Atlanta',
        teamName: 'Hawks',
        conference: 'Eastern',
        division: 'Southeast',
        logoUrl: 'https://cdn.nba.com/logos/nba/1610612737/global/L/logo.svg',
        firstSeason: '1983-84',
        lastSeason: '2025-26'
    },
    {
        abbreviation: 'BOS',
        teamCity: 'Boston',
        teamName: 'Celtics',
        conference: 'Eastern',
        division: 'Atlantic',
        logoUrl: 'https://cdn.nba.com/logos/nba/1610612738/global/L/logo.svg',
        firstSeason: '1983-84',
        lastSeason: '2025-26'
    },
    {
        abbreviation: 'CHI',
        teamCity: 'Chicago',
        teamName: 'Bulls',
        conference: 'Eastern',
        division: 'Central',
        logoUrl: 'https://cdn.nba.com/logos/nba/1610612741/global/L/logo.svg',
        firstSeason: '1983-84',
        lastSeason: '2024-25'
    },
    {
        abbreviation: 'CLE',
        teamCity: 'Cleveland',
        teamName: 'Cavaliers',
        conference: 'Eastern',
        division: 'Central',
        logoUrl: 'https://cdn.nba.com/logos/nba/1610612739/global/L/logo.svg',
        firstSeason: '1983-84',
        lastSeason: '2025-26'
    },
    {
        abbreviation: 'DAL',
        teamCity: 'Dallas',
        teamName: 'Mavericks',
        conference: 'Western',
        division: 'Southwest',
        logoUrl: 'https://cdn.nba.com/logos/nba/1610612742/global/L/logo.svg',
        firstSeason: '1983-84',
        lastSeason: '2023-24'
    },
    {
        abbreviation: 'DEN',
        teamCity: 'Denver',
        teamName: 'Nuggets',
        conference: 'Western',
        division: 'Northwest',
        logoUrl: 'https://cdn.nba.com/logos/nba/1610612743/global/L/logo.svg',
        firstSeason: '1983-84',
        lastSeason: '2023-24'
    },
    {
        abbreviation: 'DET',
        teamCity: 'Detroit',
        teamName: 'Pistons',
        conference: 'Eastern',
        division: 'Central',
        logoUrl: 'https://cdn.nba.com/logos/nba/1610612765/global/L/logo.svg',
        firstSeason: '1983-84',
        lastSeason: '2025-26'
    },
    {
        abbreviation: 'GSW',
        teamCity: 'Golden State',
        teamName: 'Warriors',
        conference: 'Western',
        division: 'Pacific',
        logoUrl: 'https://cdn.nba.com/logos/nba/1610612744/global/L/logo.svg',
        firstSeason: '1983-84',
        lastSeason: '2023-24'
    },
    {
        abbreviation: 'HOU',
        teamCity: 'Houston',
        teamName: 'Rockets',
        conference: 'Western',
        division: 'Southwest',
        logoUrl: 'https://cdn.nba.com/logos/nba/1610612745/global/L/logo.svg',
        firstSeason: '1983-84',
        lastSeason: '2023-24'
    },
    {
        abbreviation: 'IND',
        teamCity: 'Indiana',
        teamName: 'Pacers',
        conference: 'Eastern',
        division: 'Central',
        logoUrl: 'https://cdn.nba.com/logos/nba/1610612754/global/L/logo.svg',
        firstSeason: '1983-84',
        lastSeason: '2024-25'
    },
    {
        abbreviation: 'LAL',
        teamCity: 'Los Angeles',
        teamName: 'Lakers',
        conference: 'Western',
        division: 'Pacific',
        logoUrl: 'https://cdn.nba.com/logos/nba/1610612747/global/L/logo.svg',
        firstSeason: '1983-84',
        lastSeason: '2023-24'
    },
    {
        abbreviation: 'MIL',
        teamCity: 'Milwaukee',
        teamName: 'Bucks',
        conference: 'Eastern',
        division: 'Central',
        logoUrl: 'https://cdn.nba.com/logos/nba/1610612749/global/L/logo.svg',
        firstSeason: '1983-84',
        lastSeason: '2024-25'
    },
    {
        abbreviation: 'NJN',
        teamCity: 'New Jersey',
        teamName: 'Nets',
        conference: 'Eastern',
        division: 'Atlantic',
        logoUrl: 'https://cdn.nba.com/logos/nba/1610612751/global/L/logo.svg',
        firstSeason: '1983-84',
        lastSeason: '2011-12'
    },
    {
        abbreviation: 'NYK',
        teamCity: 'New York',
        teamName: 'Knicks',
        conference: 'Eastern',
        division: 'Atlantic',
        logoUrl: 'https://cdn.nba.com/logos/nba/1610612752/global/L/logo.svg',
        firstSeason: '1983-84',
        lastSeason: '2025-26'
    },
    {
        abbreviation: 'PHI',
        teamCity: 'Philadelphia',
        teamName: '76ers',
        conference: 'Eastern',
        division: 'Atlantic',
        logoUrl: 'https://cdn.nba.com/logos/nba/1610612755/global/L/logo.svg',
        firstSeason: '1983-84',
        lastSeason: '2023-24'
    },
    {
        abbreviation: 'PHO',
        teamCity: 'Phoenix',
        teamName: 'Suns',
        conference: 'Western',
        division: 'Pacific',
        logoUrl: 'https://cdn.nba.com/logos/nba/1610612756/global/L/logo.svg',
        firstSeason: '1983-84',
        lastSeason: '2023-24'
    },
    {
        abbreviation: 'POR',
        teamCity: 'Portland',
        teamName: 'Trail Blazers',
        conference: 'Western',
        division: 'Northwest',
        logoUrl: 'https://cdn.nba.com/logos/nba/1610612757/global/L/logo.svg',
        firstSeason: '1983-84',
        lastSeason: '2023-24'
    },
    {
        abbreviation: 'SAS',
        teamCity: 'San Antonio',
        teamName: 'Spurs',
        conference: 'Western',
        division: 'Southwest',
        logoUrl: 'https://cdn.nba.com/logos/nba/1610612759/global/L/logo.svg',
        firstSeason: '1983-84',
        lastSeason: '2023-24'
    },
    {
        abbreviation: 'SEA',
        teamCity: 'Seattle',
        teamName: 'Supersonics',
        conference: 'Western',
        division: 'Pacific',
        logoUrl: 'https://cdn.nba.com/logos/nba/1610612760/global/L/logo.svg',
        firstSeason: '1983-84',
        lastSeason: '2007-08'
    },
    {
        abbreviation: 'UTA',
        teamCity: 'Utah',
        teamName: 'Jazz',
        conference: 'Western',
        division: 'Northwest',
        logoUrl: 'https://cdn.nba.com/logos/nba/1610612762/global/L/logo.svg',
        firstSeason: '1983-84',
        lastSeason: '2023-24'
    },
    {
        abbreviation: 'LAC',
        teamCity: 'LA',
        teamName: 'Clippers',
        conference: 'Western',
        division: 'Pacific',
        logoUrl: 'https://cdn.nba.com/logos/nba/1610612746/global/L/logo.svg',
        firstSeason: '1984-85',
        lastSeason: '2023-24'
    },
    {
        abbreviation: 'SAC',
        teamCity: 'Sacramento',
        teamName: 'Kings',
        conference: 'Western',
        division: 'Pacific',
        logoUrl: 'https://cdn.nba.com/logos/nba/1610612758/global/L/logo.svg',
        firstSeason: '1985-86',
        lastSeason: '2023-24'
    },
    {
        abbreviation: 'CHH',
        teamCity: 'Charlotte',
        teamName: 'Hornets',
        conference: 'Eastern',
        division: 'Central',
        logoUrl: 'https://cdn.nba.com/logos/nba/1610612766/global/L/logo.svg',
        firstSeason: '1988-89',
        lastSeason: '2001-02'
    },
    {
        abbreviation: 'MIA',
        teamCity: 'Miami',
        teamName: 'Heat',
        conference: 'Eastern',
        division: 'Southeast',
        logoUrl: 'https://cdn.nba.com/logos/nba/1610612748/global/L/logo.svg',
        firstSeason: '1988-89',
        lastSeason: '2024-25'
    },
    {
        abbreviation: 'MIN',
        teamCity: 'Minnesota',
        teamName: 'Timberwolves',
        conference: 'Western',
        division: 'Northwest',
        logoUrl: 'https://cdn.nba.com/logos/nba/1610612750/global/L/logo.svg',
        firstSeason: '1989-90',
        lastSeason: '2023-24'
    },
    {
        abbreviation: 'ORL',
        teamCity: 'Orlando',
        teamName: 'Magic',
        conference: 'Eastern',
        division: 'Southeast',
        logoUrl: 'https://cdn.nba.com/logos/nba/1610612753/global/L/logo.svg',
        firstSeason: '1989-90',
        lastSeason: '2024-25'
    },
    {
        abbreviation: 'TOR',
        teamCity: 'Toronto',
        teamName: 'Raptors',
        conference: 'Eastern',
        division: 'Atlantic',
        logoUrl: 'https://cdn.nba.com/logos/nba/1610612761/global/L/logo.svg',
        firstSeason: '1995-96',
        lastSeason: '2025-26'
    },
    {
        abbreviation: 'VAN',
        teamCity: 'Vancouver',
        teamName: 'Grizzlies',
        conference: 'Western',
        division: 'Midwest',
        logoUrl: 'https://cdn.nba.com/logos/nba/1610612763/global/L/logo.svg',
        firstSeason: '1995-96',
        lastSeason: '2000-01'
    },
    {
        abbreviation: 'WAS',
        teamCity: 'Washington',
        teamName: 'Wizards',
        conference: 'Eastern',
        division: 'Southeast',
        logoUrl: 'https://cdn.nba.com/logos/nba/1610612764/global/L/logo.svg',
        firstSeason: '1997-98',
        lastSeason: '2023-24'
    },
    {
        abbreviation: 'MEM',
        teamCity: 'Memphis',
        teamName: 'Grizzlies',
        conference: 'Western',
        division: 'Southwest',
        logoUrl: 'https://cdn.nba.com/logos/nba/1610612763/global/L/logo.svg',
        firstSeason: '2001-02',
        lastSeason: '2023-24'
    },
    {
        abbreviation: 'NOH',
        teamCity: 'New Orleans',
        teamName: 'Hornets',
        conference: 'Western',
        division: 'Southwest',
        logoUrl: 'https://cdn.nba.com/logos/nba/1610612740/global/L/logo.svg',
        firstSeason: '2002-03',
        lastSeason: '2012-13'
    },
    {
        abbreviation: 'CHA',
        teamCity: 'Charlotte',
        teamName: 'Bobcats',
        conference: 'Eastern',
        division: 'Southeast',
        logoUrl: 'https://cdn.nba.com/logos/nba/1610612766/global/L/logo.svg',
        firstSeason: '2004-05',
        lastSeason: '2013-14'
    },
    {
        abbreviation: 'NOK',
        teamCity: 'New Orleans',
        teamName: 'Hornets',
        conference: 'Western',
        division: 'Southwest',
        logoUrl: 'https://cdn.nba.com/logos/nba/1610612740/global/L/logo.svg',
        firstSeason: '2005-06',
        lastSeason: '2006-07'
    },
    {
        abbreviation: 'OKC',
        teamCity: 'Oklahoma City',
        teamName: 'Thunder',
        conference: 'Western',
        division: 'Northwest',
        logoUrl: 'https://cdn.nba.com/logos/nba/1610612760/global/L/logo.svg',
        firstSeason: '2008-09',
        lastSeason: '2024-25'
    },
    {
        abbreviation: 'BRK',
        teamCity: 'Brooklyn',
        teamName: 'Nets',
        conference: 'Eastern',
        division: 'Atlantic',
        logoUrl: 'https://cdn.nba.com/logos/nba/1610612751/global/L/logo.svg',
        firstSeason: '2012-13',
        lastSeason: '2023-24'
    },
    {
        abbreviation: 'NOP',
        teamCity: 'New Orleans',
        teamName: 'Pelicans',
        conference: 'Western',
        division: 'Southwest',
        logoUrl: 'https://cdn.nba.com/logos/nba/1610612740/global/L/logo.svg',
        firstSeason: '2013-14',
        lastSeason: '2023-24'
    },
    {
        abbreviation: 'CHO',
        teamCity: 'Charlotte',
        teamName: 'Hornets',
        conference: 'Eastern',
        division: 'Southeast',
        logoUrl: 'https://cdn.nba.com/logos/nba/1610612766/global/L/logo.svg',
        firstSeason: '2014-15',
        lastSeason: '2023-24'
    }
];
const TEAM_BY_ABBREVIATION = Object.fromEntries(TEAM_INFO.map((team)=>[
        team.abbreviation,
        team
    ]));
const NBA_TEAMS = TEAM_INFO.map((team)=>({
        name: `${team.teamCity} ${team.teamName}`,
        conference: team.conference,
        division: team.division
    }));
const TEAM_LOGOS = Object.fromEntries(TEAM_INFO.map((team)=>[
        `${team.teamCity} ${team.teamName}`,
        team.logoUrl
    ]));
}),
"[project]/lib/puzzle-service.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getDailyPuzzle",
    ()=>getDailyPuzzle,
    "getFranchiseRoster",
    ()=>getFranchiseRoster,
    "getFranchiseTeams",
    ()=>getFranchiseTeams
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/path [external] (path, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$fs$2f$promises__$5b$external$5d$__$28$fs$2f$promises$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/fs/promises [external] (fs/promises, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$sql$2e$js$40$1$2e$14$2e$1$2f$node_modules$2f$sql$2e$js$2f$dist$2f$sql$2d$wasm$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/sql.js@1.14.1/node_modules/sql.js/dist/sql-wasm.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$college$2d$logos$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/college-logos.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$team$2d$data$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/team-data.ts [app-route] (ecmascript)");
;
;
;
;
;
const POSITION_ORDER = {
    PG: 0,
    SG: 1,
    SF: 2,
    PF: 3,
    C: 4
};
const NATIONALITY_CODES = {
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
    'United Kingdom': 'gb'
};
const MODE_TEAM_OFFSET = {
    college: 0,
    country: 1,
    stats: 2
};
let sqlJsPromise = null;
function getDateKey(referenceDate) {
    return referenceDate.toISOString().slice(0, 10);
}
function getDailyIndex(referenceDate, length, mode) {
    const dateKey = getDateKey(referenceDate);
    let hash = 0;
    for (const character of dateKey){
        hash = hash * 31 + character.charCodeAt(0) >>> 0;
    }
    for (const character of mode){
        hash = hash * 31 + character.charCodeAt(0) >>> 0;
    }
    const baseIndex = hash % length;
    return (baseIndex + MODE_TEAM_OFFSET[mode]) % length;
}
function normalizeNationality(nationality) {
    if (nationality === 'USA') {
        return 'United States';
    }
    return nationality;
}
function getNationalityCode(nationality) {
    return NATIONALITY_CODES[nationality] ?? 'un';
}
function normalizeTeamAbbreviation(teamAbbreviation) {
    return teamAbbreviation;
}
function escapeSvgText(value) {
    return value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}
function initialsFrom(value, count = 2) {
    return value.split(/\s+/).filter(Boolean).slice(0, count).map((part)=>part[0]?.toUpperCase() ?? '').join('');
}
function makeBadgeUrl(label, accent) {
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
  `.trim();
    return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
}
function createHeadshotUrl(playerName, teamAbbreviation) {
    const initials = playerName.split(/\s+/).filter(Boolean).slice(0, 2).map((part)=>part[0]?.toUpperCase() ?? '').join('');
    const team = __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$team$2d$data$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["TEAM_BY_ABBREVIATION"][teamAbbreviation];
    const accent = team?.abbreviation === 'BOS' ? '#f97316' : '#f59e0b';
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
  `.trim();
    return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
}
function buildPlayer(row) {
    const rawNationality = String(row.nationality ?? '');
    const nationality = normalizeNationality(rawNationality);
    const nationalityCode = getNationalityCode(rawNationality) || getNationalityCode(nationality);
    const teamAbbreviation = normalizeTeamAbbreviation(String(row.team ?? ''));
    const college = String(row.college ?? '');
    const storedCollegeImage = String(row.college_image ?? '').trim();
    const storedNationalityImage = String(row.nationality_image ?? '').trim();
    const resolvedCollegeImage = storedCollegeImage || (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$college$2d$logos$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["resolveCollegeImage"])(college);
    const resolvedNationalityImage = storedNationalityImage || `https://flagcdn.com/w160/${nationalityCode}.png`;
    const team = __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$team$2d$data$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["TEAM_BY_ABBREVIATION"][teamAbbreviation];
    const accent = team?.abbreviation === 'BOS' ? '#f97316' : '#f59e0b';
    return {
        name: String(row.player_name ?? ''),
        position: String(row.position ?? ''),
        college,
        collegeLogo: resolvedCollegeImage,
        collegeImage: resolvedCollegeImage || makeBadgeUrl(college || String(row.player_name ?? ''), accent),
        stats: {
            pts: Number(row.pts_per_g ?? 0),
            reb: Number(row.trb_per_g ?? 0),
            ast: Number(row.ast_per_g ?? 0)
        },
        nationality,
        nationalityCode,
        nationalityImage: resolvedNationalityImage,
        headshotUrl: String(row.headshot_url ?? '').trim() || createHeadshotUrl(String(row.player_name ?? ''), teamAbbreviation)
    };
}
async function getSqlJs() {
    if (!sqlJsPromise) {
        const wasmBuffer = await (0, __TURBOPACK__imported__module__$5b$externals$5d2f$fs$2f$promises__$5b$external$5d$__$28$fs$2f$promises$2c$__cjs$29$__["readFile"])(__TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__["default"].join(process.cwd(), 'public', 'sql-wasm.wasm'));
        sqlJsPromise = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$sql$2e$js$40$1$2e$14$2e$1$2f$node_modules$2f$sql$2e$js$2f$dist$2f$sql$2d$wasm$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"])({
            wasmBinary: wasmBuffer
        });
    }
    return sqlJsPromise;
}
async function getDailyPuzzle(mode, referenceDate = new Date()) {
    const sqlJs = await getSqlJs();
    const dbBuffer = await (0, __TURBOPACK__imported__module__$5b$externals$5d2f$fs$2f$promises__$5b$external$5d$__$28$fs$2f$promises$2c$__cjs$29$__["readFile"])(__TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__["default"].join(process.cwd(), 'thing.db'));
    const database = new sqlJs.Database(new Uint8Array(dbBuffer));
    const nationalityFilter = mode === 'country' ? `AND COUNT(DISTINCT CASE WHEN nationality NOT IN ('', 'Unknown') THEN nationality END) >= 3` : '';
    const teamRows = database.exec(`
    SELECT DISTINCT team, season
    FROM starters
    GROUP BY season, team
    HAVING COUNT(*) = 5 AND COUNT(DISTINCT position) = 5 ${nationalityFilter}
    ORDER BY season, team
  `)[0];
    if (!teamRows) {
        throw new Error('No teams found in dataset');
    }
    const teamIndex = getDailyIndex(referenceDate, teamRows.values.length, mode);
    const [rawTeamAbbreviation, season] = teamRows.values[teamIndex];
    const teamAbbreviation = normalizeTeamAbbreviation(rawTeamAbbreviation);
    const team = __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$team$2d$data$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["TEAM_BY_ABBREVIATION"][teamAbbreviation] ?? __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$team$2d$data$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["TEAM_INFO"].find((item)=>item.abbreviation === teamAbbreviation);
    if (!team) {
        throw new Error(`No team metadata found for ${teamAbbreviation}`);
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
  `;
    const statement = database.prepare(query);
    statement.bind([
        rawTeamAbbreviation,
        season
    ]);
    const columns = statement.getColumnNames();
    const rows = [];
    while(statement.step()){
        rows.push(statement.getAsObject());
    }
    statement.free();
    if (rows.length === 0) {
        throw new Error(`No lineup found for ${team.abbreviation} ${season}`);
    }
    const players = rows.map((row)=>buildPlayer(row));
    return {
        date: getDateKey(referenceDate),
        season,
        teamName: team.teamName,
        teamCity: team.teamCity,
        teamLogo: team.logoUrl,
        conference: team.conference,
        division: team.division,
        clueMode: mode,
        players: players.sort((left, right)=>POSITION_ORDER[left.position] - POSITION_ORDER[right.position])
    };
}
// ── 100 PPG mode data access ────────────────────────────────────────
//
// All data is sourced from the same local `thing.db` "starters" table the
// daily puzzles use — no new external fetch logic. Each row is one
// (season, team, player, position, pts_per_g) record, so a player's PPG is
// already keyed by franchise. Trades/partial seasons are handled implicitly:
// the dataset attributes each season's row to the team the player started for,
// and pts_per_g is that player's scoring average for that season. We surface
// the value as-is and label it by franchise; if a player split a season
// between two teams the dataset only carries the franchise they started for.
async function openDatabase() {
    const sqlJs = await getSqlJs();
    const dbBuffer = await (0, __TURBOPACK__imported__module__$5b$externals$5d2f$fs$2f$promises__$5b$external$5d$__$28$fs$2f$promises$2c$__cjs$29$__["readFile"])(__TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__["default"].join(process.cwd(), 'thing.db'));
    return new sqlJs.Database(new Uint8Array(dbBuffer));
}
function resolveHeadshot(row) {
    const stored = String(row.headshot_url ?? '').trim();
    return stored || createHeadshotUrl(String(row.player_name ?? ''), String(row.team ?? ''));
}
async function getFranchiseTeams() {
    const database = await openDatabase();
    const rows = database.exec(`
    SELECT team, COUNT(DISTINCT player_name) AS players
    FROM starters
    GROUP BY team
    HAVING players >= 5
    ORDER BY team
  `)[0];
    database.close();
    if (!rows) return [];
    const teams = rows.values.map(([abbreviation])=>{
        const abbr = normalizeTeamAbbreviation(String(abbreviation));
        const meta = __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$team$2d$data$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["TEAM_BY_ABBREVIATION"][abbr];
        if (!meta) return null;
        return {
            abbreviation: abbr,
            city: meta.teamCity,
            name: meta.teamName,
            fullName: `${meta.teamCity} ${meta.teamName}`,
            logoUrl: meta.logoUrl
        };
    }).filter((team)=>team !== null);
    return teams;
}
async function getFranchiseRoster(teamAbbreviation) {
    const database = await openDatabase();
    const statement = database.prepare(`
    SELECT player_name, position, season, pts_per_g, headshot_url, team
    FROM starters
    WHERE team = ?
    ORDER BY player_name, season
  `);
    statement.bind([
        teamAbbreviation
    ]);
    const byPlayer = new Map();
    while(statement.step()){
        const row = statement.getAsObject();
        const name = String(row.player_name ?? '');
        if (!name) continue;
        let entry = byPlayer.get(name);
        if (!entry) {
            entry = {
                name,
                headshotUrl: resolveHeadshot(row),
                seasons: []
            };
            byPlayer.set(name, entry);
        }
        entry.seasons.push({
            season: String(row.season ?? ''),
            ppg: Number(row.pts_per_g ?? 0),
            position: String(row.position ?? '')
        });
    }
    statement.free();
    database.close();
    const players = Array.from(byPlayer.values()).map((player)=>{
        const seasons = player.seasons.sort((a, b)=>a.season.localeCompare(b.season));
        const peakPpg = seasons.reduce((max, s)=>Math.max(max, s.ppg), 0);
        return {
            name: player.name,
            headshotUrl: player.headshotUrl,
            firstSeason: seasons[0]?.season ?? '',
            lastSeason: seasons[seasons.length - 1]?.season ?? '',
            seasons,
            peakPpg
        };
    }).sort((a, b)=>b.peakPpg - a.peakPpg);
    const meta = __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$team$2d$data$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["TEAM_BY_ABBREVIATION"][teamAbbreviation];
    return {
        team: meta ? {
            abbreviation: teamAbbreviation,
            city: meta.teamCity,
            name: meta.teamName,
            fullName: `${meta.teamCity} ${meta.teamName}`,
            logoUrl: meta.logoUrl
        } : null,
        players
    };
}
}),
"[project]/app/api/ppg/roster/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "GET",
    ()=>GET,
    "dynamic",
    ()=>dynamic,
    "runtime",
    ()=>runtime
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$6_$40$babel$2b$core$40$7$2e$2_40a7effce8bcad24669d45809ebe449e$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.2.6_@babel+core@7.2_40a7effce8bcad24669d45809ebe449e/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$puzzle$2d$service$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/puzzle-service.ts [app-route] (ecmascript)");
;
;
const runtime = 'nodejs';
const dynamic = 'force-dynamic';
async function GET(request) {
    const url = new URL(request.url);
    const team = url.searchParams.get('team');
    if (!team) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$6_$40$babel$2b$core$40$7$2e$2_40a7effce8bcad24669d45809ebe449e$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: 'Missing team parameter'
        }, {
            status: 400
        });
    }
    const roster = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$puzzle$2d$service$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getFranchiseRoster"])(team);
    if (!roster.team) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$6_$40$babel$2b$core$40$7$2e$2_40a7effce8bcad24669d45809ebe449e$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: `Unknown team: ${team}`
        }, {
            status: 404
        });
    }
    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$6_$40$babel$2b$core$40$7$2e$2_40a7effce8bcad24669d45809ebe449e$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json(roster, {
        headers: {
            'Cache-Control': 'no-store, max-age=0'
        }
    });
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__0.t.iji._.js.map