import { NextResponse } from 'next/server'
import { getFranchiseRoster } from '@/lib/puzzle-service'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export async function GET(request: Request) {
  const url = new URL(request.url)
  const team = url.searchParams.get('team')

  if (!team) {
    return NextResponse.json({ error: 'Missing team parameter' }, { status: 400 })
  }

  const roster = await getFranchiseRoster(team)

  if (!roster.team) {
    return NextResponse.json({ error: `Unknown team: ${team}` }, { status: 404 })
  }

  return NextResponse.json(roster, {
    headers: { 'Cache-Control': 'no-store, max-age=0' },
  })
}
