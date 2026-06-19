#!/usr/bin/env python
"""Debug the URL generation and scraping"""

import requests
from bs4 import BeautifulSoup

def debug_season(season_year):
    print(f"\n=== Debugging {season_year} ===")
    
    # Extract the full 4-digit year from season format
    year_str = season_year.split('-')[1]
    full_year = int('19' + year_str) if int(year_str) <= 99 else int('20' + year_str)
    url = f'https://www.basketball-reference.com/leagues/NBA_{full_year}_per_game.html'
    
    print(f"Year string: '{year_str}'")
    print(f"Full year: {full_year}")
    print(f"URL: {url}")
    
    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
    }
    
    try:
        response = requests.get(url, headers=headers, timeout=60)
        print(f"Status: {response.status_code}")
        
        if response.status_code == 200:
            soup = BeautifulSoup(response.text, 'html.parser')
            table = soup.find('table', {'id': 'per_game_stats'})
            
            if table:
                print("✅ Found per_game_stats table")
                
                # Check for name_display cells
                name_cells = table.find_all('td', {'data-stat': 'name_display'})
                print(f"Name cells: {len(name_cells)}")
                
                if name_cells:
                    for i, cell in enumerate(name_cells[:3]):
                        name = cell.get_text(strip=True)
                        print(f"Sample {i+1}: '{name}'")
                else:
                    print("❌ No name cells found")
                    
                    # Try to find any links in the first row
                    rows = table.find_all('tr')
                    if rows:
                        first_row_links = rows[0].find_all('a')
                        print(f"Header links: {len(first_row_links)}")
                        
                        second_row_links = rows[1].find_all('a')
                        print(f"First data row links: {len(second_row_links)}")
                        if second_row_links:
                            print(f"Sample link text: '{second_row_links[0].get_text(strip=True)}'")
            else:
                print("❌ No per_game_stats table found")
        else:
            print(f"❌ Failed to fetch page (HTTP {response.status_code})")
            
    except Exception as e:
        print(f"❌ Exception: {type(e).__name__}: {e}")

if __name__ == '__main__':
    print("=== DEBUG ===")
    
    # Test a few seasons
    test_seasons = ['2025-26', '1999-00', '2000-01']
    
    for season in test_seasons:
        debug_season(season)