import { useState, useEffect } from 'react'
import { useKV } from '@github/spark/hooks'
import { Signal, SignalCategory, HistoricalEvent } from '@/lib/types'
import { calculateTotalScore, scoreToMinutes, getRiskState } from '@/lib/risk-calculator'
import { DoomsdayClock } from '@/components/DoomsdayClock'
import { SignalCard } from '@/components/SignalCard'
import { AddSignalDialog } from '@/components/AddSignalDialog'
import { DisclaimerBanner } from '@/components/DisclaimerBanner'
import { HistoricalContext } from '@/components/HistoricalContext'
import { StatsSummary } from '@/components/StatsSummary'
import { Separator } from '@/components/ui/separator'
import { ScrollArea } from '@/components/ui/scroll-area'
import { useAudio } from '@/hooks/use-audio'
import { motion, AnimatePresence } from 'framer-motion'

function App() {
  const [signals, setSignals] = useKV<Signal[]>('doomsday-signals', [])
  const [currentTime, setCurrentTime] = useState(Date.now())
  const [prevRiskState, setPrevRiskState] = useState<string>('stable')
  const { playWarningTone, playTickSound } = useAudio(false)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(Date.now())
    }, 60000)
    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    setSignals((currentSignals) => 
      (currentSignals || []).filter((signal) => {
        const decayPercent = (calculateTotalScore([signal], currentTime) / signal.weight) * 100
        return decayPercent > 5
      })
    )
  }, [currentTime, setSignals])

  const totalScore = calculateTotalScore(signals || [], currentTime)
  const minutesToMidnight = scoreToMinutes(totalScore)
  const riskState = getRiskState(minutesToMidnight)

  useEffect(() => {
    if (riskState !== prevRiskState) {
      if (riskState === 'critical') {
        playWarningTone()
      }
      setPrevRiskState(riskState)
    }
  }, [riskState, prevRiskState, playWarningTone])

  const historicalEvents: HistoricalEvent[] = [
    {
      name: 'Cuban Missile Crisis',
      minutesToMidnight: 2.0,
      description: 'October 1962 - Peak Cold War nuclear standoff between US and USSR',
    },
    {
      name: 'Post-9/11 Tensions',
      minutesToMidnight: 7.0,
      description: 'September 2001 - Global security paradigm shift',
    },
    {
      name: 'Ukraine Invasion',
      minutesToMidnight: 3.5,
      description: 'February 2022 - Nuclear rhetoric and European security crisis',
    },
    {
      name: 'End of Cold War',
      minutesToMidnight: 11.0,
      description: '1991 - Dissolution of Soviet Union, reduced nuclear tensions',
    },
  ]

  const handleAddSignal = (category: SignalCategory, description: string, weight: number, decayRate: number = 0.05) => {
    const newSignal: Signal = {
      id: `signal-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      category,
      description,
      weight,
      timestamp: Date.now(),
      decayRate,
    }
    setSignals((currentSignals) => [newSignal, ...(currentSignals || [])])
    playTickSound()
  }

  const activeSignals = signals || []

  return (
    <div className="min-h-screen bg-background relative">
      <div className="absolute inset-0 opacity-[0.015] pointer-events-none"
        style={{
          backgroundImage: `repeating-linear-gradient(
            0deg,
            transparent,
            transparent 2px,
            oklch(0.68 0.20 150) 2px,
            oklch(0.68 0.20 150) 4px
          )`
        }}
      />
      <div 
        className="absolute inset-0 opacity-[0.025] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle at 50% 50%, oklch(0.68 0.20 150) 0%, transparent 50%)`
        }}
      />
      <motion.div
        className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary to-transparent"
        animate={{ opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
      />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        <header className="space-y-4 text-slate-100">
          <div className="flex items-start justify-between gap-4 flex-wrap">
            <div>
              <h1 className="font-display text-3xl md:text-4xl font-bold uppercase tracking-tight text-primary">
                The Doomsday Signal
              </h1>
              <p className="font-mono text-sm text-muted-foreground mt-2">
                A symbolic visualization of global tension signals
              </p>
            </div>
            <AddSignalDialog onAddSignal={handleAddSignal} />
          </div>
          <DisclaimerBanner />
        </header>

        <DoomsdayClock
          minutesToMidnight={minutesToMidnight}
          riskState={riskState}
          historicalEvents={historicalEvents}
        />

        <StatsSummary 
          signals={activeSignals}
          totalScore={totalScore}
          currentTime={currentTime}
        />

        <Separator className="my-8" />

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div>
              <h2 className="font-mono text-sm uppercase tracking-widest mb-4 text-muted-foreground">
                Active Signals ({activeSignals.length})
              </h2>
              {activeSignals.length === 0 ? (
                <div className="text-center py-16 px-4 border-2 border-dashed border-border rounded-lg">
                  <p className="font-mono text-sm text-muted-foreground mb-4">
                    No active signals. Add your first signal to see how risk escalates.
                  </p>
                  <p className="font-mono text-xs text-muted-foreground">
                    Current state: STABLE
                  </p>
                </div>
              ) : (
                <ScrollArea className="h-[600px] pr-4">
                  <div className="space-y-4">
                    <AnimatePresence mode="popLayout">
                      {activeSignals.map((signal) => (
                        <motion.div
                          key={signal.id}
                          initial={{ opacity: 0, y: -20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, x: -20 }}
                          transition={{ duration: 0.3 }}
                        >
                          <SignalCard signal={signal} currentTime={currentTime} />
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </div>
                </ScrollArea>
              )}
            </div>
          </div>

          <div className="lg:col-span-1">
            <HistoricalContext events={historicalEvents} currentMinutes={minutesToMidnight} />
          </div>
        </div>

        <footer className="pt-8 border-t border-border">
          <p className="font-mono text-xs text-muted-foreground text-center leading-relaxed">
            This project demonstrates signal aggregation, time decay modeling, and transparent risk assessment.<br />
            No classified data. No predictions. Educational purposes only.
          </p>
        </footer>
      </div>
    </div>
  );
}

export default App