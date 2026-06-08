'use client'

import { StartingFiveGame } from '@/components/starting-five-game'

interface CountryGameProps {
  onBack: () => void
}

export function CountryGame({ onBack }: CountryGameProps) {
  return <StartingFiveGame onBack={onBack} mode="country" />
}