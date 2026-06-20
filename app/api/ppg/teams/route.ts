import { NextResponse } from 'next/server'
import { getFranchiseTeams } from '@/lib/puzzle-service'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export async function GET() {
  const teams = await getFranchiseTeams()
  return NextResponse.json(
    { teams },
    { headers: { 'Cache-Control': 'no-store, max-age=0' } }
  )
}
