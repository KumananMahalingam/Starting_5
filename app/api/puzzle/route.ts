import { NextResponse } from 'next/server'
import type { ClueMode } from '@/lib/game-data'
import { getDailyPuzzle } from '@/lib/puzzle-service'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

function getMode(searchParams: URLSearchParams): ClueMode {
  const mode = searchParams.get('mode')
  if (mode === 'country' || mode === 'stats') {
    return mode
  }
  return 'college'
}

export async function GET(request: Request) {
  const url = new URL(request.url)
  const mode = getMode(url.searchParams)
  const puzzle = await getDailyPuzzle(mode)

  return NextResponse.json(puzzle, {
    headers: {
      'Cache-Control': 'no-store, max-age=0',
    },
  })
}