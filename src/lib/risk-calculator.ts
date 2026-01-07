import { Signal, RiskState } from './types'

export function calculateCurrentWeight(signal: Signal, currentTime: number): number {
  const hoursElapsed = (currentTime - signal.timestamp) / (1000 * 60 * 60)
  const decayedWeight = signal.weight * Math.exp(-signal.decayRate * hoursElapsed)
  if (signal.weight >= 0) {
    return Math.max(0, decayedWeight)
  } else {
    return Math.min(0, decayedWeight)
  }
}

export function calculateTotalScore(signals: Signal[], currentTime: number): number {
  return signals.reduce((total, signal) => {
    return total + calculateCurrentWeight(signal, currentTime)
  }, 0)
}

export function scoreToMinutes(score: number): number {
  const minutes = Math.max(1, 12 - (score / 10))
  return Math.round(minutes * 10) / 10
}

export function getRiskState(minutes: number): RiskState {
  if (minutes >= 10) return 'stable'
  if (minutes >= 5) return 'elevated'
  if (minutes >= 2) return 'severe'
  return 'critical'
}

export function getSignalDecayPercent(signal: Signal, currentTime: number): number {
  const currentWeight = calculateCurrentWeight(signal, currentTime)
  return Math.abs((currentWeight / signal.weight) * 100)
}
