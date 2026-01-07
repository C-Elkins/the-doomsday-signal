import { useEffect, useRef } from 'react'

export function useAudio(enabled: boolean) {
  const audioContextRef = useRef<AudioContext | null>(null)

  useEffect(() => {
    if (enabled && !audioContextRef.current) {
      audioContextRef.current = new AudioContext()
    }
  }, [enabled])

  const playWarningTone = () => {
    if (!audioContextRef.current || !enabled) return

    const ctx = audioContextRef.current
    const oscillator = ctx.createOscillator()
    const gainNode = ctx.createGain()

    oscillator.connect(gainNode)
    gainNode.connect(ctx.destination)

    oscillator.frequency.setValueAtTime(440, ctx.currentTime)
    oscillator.frequency.exponentialRampToValueAtTime(220, ctx.currentTime + 0.3)
    
    gainNode.gain.setValueAtTime(0.1, ctx.currentTime)
    gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.3)

    oscillator.start(ctx.currentTime)
    oscillator.stop(ctx.currentTime + 0.3)
  }

  const playTickSound = () => {
    if (!audioContextRef.current || !enabled) return

    const ctx = audioContextRef.current
    const oscillator = ctx.createOscillator()
    const gainNode = ctx.createGain()

    oscillator.connect(gainNode)
    gainNode.connect(ctx.destination)

    oscillator.frequency.setValueAtTime(800, ctx.currentTime)
    
    gainNode.gain.setValueAtTime(0.05, ctx.currentTime)
    gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.05)

    oscillator.start(ctx.currentTime)
    oscillator.stop(ctx.currentTime + 0.05)
  }

  const playZoneCrossing = (zoneType: 'elevated' | 'severe' | 'critical') => {
    if (!audioContextRef.current || !enabled) return

    const ctx = audioContextRef.current
    
    const frequencies = {
      elevated: [400, 450],
      severe: [350, 300],
      critical: [500, 250]
    }

    const durations = {
      elevated: 0.2,
      severe: 0.35,
      critical: 0.5
    }

    const [freq1, freq2] = frequencies[zoneType]
    const duration = durations[zoneType]

    const oscillator1 = ctx.createOscillator()
    const oscillator2 = ctx.createOscillator()
    const gainNode = ctx.createGain()

    oscillator1.connect(gainNode)
    oscillator2.connect(gainNode)
    gainNode.connect(ctx.destination)

    oscillator1.type = 'sine'
    oscillator2.type = 'sine'
    
    oscillator1.frequency.setValueAtTime(freq1, ctx.currentTime)
    oscillator2.frequency.setValueAtTime(freq2, ctx.currentTime)
    
    if (zoneType === 'critical') {
      oscillator1.frequency.exponentialRampToValueAtTime(freq1 * 0.7, ctx.currentTime + duration)
      oscillator2.frequency.exponentialRampToValueAtTime(freq2 * 1.3, ctx.currentTime + duration)
    }
    
    gainNode.gain.setValueAtTime(0.12, ctx.currentTime)
    gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + duration)

    oscillator1.start(ctx.currentTime)
    oscillator2.start(ctx.currentTime)
    oscillator1.stop(ctx.currentTime + duration)
    oscillator2.stop(ctx.currentTime + duration)

    if (zoneType === 'critical') {
      setTimeout(() => {
        const osc3 = ctx.createOscillator()
        const gain3 = ctx.createGain()
        
        osc3.connect(gain3)
        gain3.connect(ctx.destination)
        
        osc3.frequency.setValueAtTime(600, ctx.currentTime)
        osc3.frequency.exponentialRampToValueAtTime(200, ctx.currentTime + 0.3)
        
        gain3.gain.setValueAtTime(0.08, ctx.currentTime)
        gain3.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.3)
        
        osc3.start(ctx.currentTime)
        osc3.stop(ctx.currentTime + 0.3)
      }, duration * 800)
    }
  }

  return { playWarningTone, playTickSound, playZoneCrossing }
}
