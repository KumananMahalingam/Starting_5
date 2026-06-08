import sqlite3
import re
import os

SR_COLLEGE_LOGO_BASE = "https://cdn.ssref.net/nocdn/tlogo/ncaa"

COLLEGE_SLUG_OVERRIDES = {
    "UNC": "north-carolina",
    "UConn": "connecticut",
    "USC": "southern-california",
    "UNLV": "nevada-las-vegas",
    "Pitt": "pittsburgh",
    "Ole Miss": "mississippi",
    "St. John's": "st-johns-ny",
    "BYU": "brigham-young",
    "LSU": "louisiana-state",
    "TCU": "texas-christian",
    "SMU": "southern-methodist",
    "UCF": "central-florida",
    "UTEP": "texas-el-paso",
    "UTSA": "texas-san-antonio",
    "VCU": "virginia-commonwealth",
    "UMass": "massachusetts",
    "UMBC": "maryland-baltimore-county",
    "GW": "george-washington",
    "Penn": "pennsylvania",
    "Little Rock": "arkansas-little-rock",
    "ULM": "louisiana-monroe",
    "UTRGV": "texas-rio-grande-valley",
    "Colorado St": "colorado-state",
    "San Diego St": "san-diego-state",
    "San Jose St": "san-jose-state",
    "Mississippi St": "mississippi-state",
    "Long Beach St": "long-beach-state",
    "Cal St Fullerton": "cal-state-fullerton",
    "Cal St Northridge": "cal-state-northridge",
    "Cal St Bakersfield": "cal-state-bakersfield",
}

KNOWN_COLLEGES = {
    "Alabama", "Arizona", "Arizona State", "Arkansas",
    "Auburn", "Boston College", "Bowling Green", "Butler",
    "California", "Cincinnati", "Clemson", "Colorado",
    "Creighton", "Davidson", "Duke", "Baylor", "Florida",
    "Florida State", "Fresno State", "Georgetown", "Georgia",
    "Georgia Tech", "Gonzaga", "Houston", "Illinois",
    "Indiana", "Iowa", "Iowa State", "Kansas", "Kansas State",
    "Kentucky", "Lehigh", "Louisville", "LSU", "Marquette",
    "Maryland", "Memphis", "Miami", "Miami (FL)", "Michigan",
    "Michigan State", "Minnesota", "Mississippi State",
    "Missouri", "Murray State", "NC State", "Nebraska",
    "Northwestern", "Notre Dame", "Ohio State", "Oklahoma",
    "Oklahoma State", "Old Dominion", "Ole Miss", "Oregon",
    "Oregon State", "Penn State", "Pitt", "Providence",
    "Purdue", "Rutgers", "Seton Hall", "South Carolina",
    "St. John's", "Stanford", "Syracuse", "TCU", "Tennessee",
    "Tennessee State", "Texas", "Texas A&M", "Texas Tech",
    "UCLA", "UConn", "UNC", "UNLV", "USC", "Utah",
    "Vanderbilt", "Villanova", "Virginia", "Virginia Tech",
    "Wake Forest", "Washington", "Washington State",
    "Weber State", "West Virginia", "Western Kentucky",
    "Wichita State", "Wisconsin", "Xavier",
}

COLLEGE_NAME_MAP = {
    "North Carolina": "UNC",
    "Connecticut": "UConn",
    "Southern California": "USC",
    "Nevada-Las Vegas": "UNLV",
    "Pittsburgh": "Pitt",
    "Texas Christian": "TCU",
    "Central Florida": "UCF",
    "Louisiana State": "LSU",
    "Mississippi State": "Mississippi St",
    "Brigham Young": "BYU",
    "George Washington": "GW",
    "Pennsylvania": "Penn",
    "Massachusetts": "UMass",
    "Texas-El Paso": "UTEP",
    "Texas-San Antonio": "UTSA",
    "Colorado State": "Colorado St",
    "San Diego State": "San Diego St",
    "San Jose State": "San Jose St",
    "Arkansas-Little Rock": "Little Rock",
    "Maryland-Baltimore County": "UMBC",
    "Louisiana-Lafayette": "Louisiana",
    "Louisiana-Monroe": "ULM",
    "Texas-Rio Grande Valley": "UTRGV",
    "Cal State Fullerton": "Cal St Fullerton",
    "Cal State Northridge": "Cal St Northridge",
    "Cal State Bakersfield": "Cal St Bakersfield",
    "Long Beach State": "Long Beach St",
}

def college_to_slug(name):
    if not name:
        return ""
    name = name.strip()
    if name in COLLEGE_SLUG_OVERRIDES:
        return COLLEGE_SLUG_OVERRIDES[name]
    slug = name.lower()
    slug = slug.replace(" ", "-")
    slug = slug.replace(".", "")
    slug = slug.replace("'", "")
    slug = slug.replace("&", "")
    slug = slug.replace("(", "").replace(")", "")
    slug = slug.replace(",", "")
    slug = re.sub(r"-+", "-", slug)
    slug = slug.strip("-")
    return slug

def normalize_college_name(name):
    if not name:
        return ""
    cleaned = name.strip()
    for prefix in ("University of ", "The "):
        if cleaned.startswith(prefix):
            cleaned = cleaned[len(prefix):]
    cleaned = re.sub(r"\s*\([^)]*\)", "", cleaned).strip()
    return COLLEGE_NAME_MAP.get(cleaned, cleaned)

def primary_college_name(college):
    trimmed = (college or "").strip()
    if not trimmed:
        return ""
    parts = [p.strip() for p in trimmed.split(",")]
    for part in reversed(parts):
        normalized = normalize_college_name(part)
        if normalized in KNOWN_COLLEGES or part in KNOWN_COLLEGES:
            return part
    return parts[-1]

def resolve_college_image(college):
    primary = primary_college_name(college)
    if not primary:
        return ""
    slug = college_to_slug(primary)
    if not slug:
        normalized = normalize_college_name(primary)
        slug = college_to_slug(normalized)
    if not slug:
        return ""
    return f"{SR_COLLEGE_LOGO_BASE}/{slug}.png"

db_path = os.path.join(os.path.dirname(__file__), "..", "thing.db")
conn = sqlite3.connect(db_path)
conn.row_factory = sqlite3.Row
cur = conn.cursor()

rows = cur.execute(
    "SELECT id, college FROM starters WHERE college IS NOT NULL AND college != '' AND (college_image IS NULL OR college_image = '')"
).fetchall()

print(f"Found {len(rows)} players missing college images.")

updated = 0
for row in rows:
    college = row["college"]
    url = resolve_college_image(college)
    if url:
        cur.execute("UPDATE starters SET college_image = ? WHERE id = ?", (url, row["id"]))
        updated += 1
    else:
        print(f"  No slug for college: {college!r}")

conn.commit()
conn.close()
print(f"Updated {updated} rows with college images.")
