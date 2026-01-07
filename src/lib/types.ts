export type SignalCategory = 'geopolitical' | 'media' | 'cyber' | 'strategic'

export type RiskState = 'stable' | 'elevated' | 'severe' | 'critical'

export interface Signal {
  id: string
  category: SignalCategory
  description: string
  weight: number
  timestamp: number
  decayRate: number
}

export interface HistoricalEvent {
  name: string
  minutesToMidnight: number
  description: string
}
