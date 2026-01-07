import { Signal } from '@/lib/types'
import { Card } from '@/components/ui/card'
import { Pulse, TrendUp, Clock, Minus } from '@phosphor-icons/react'
import { motion } from 'framer-motion'

interface StatsSummaryProps {
  signals: Signal[]
  totalScore: number
  currentTime: number
}

export function StatsSummary({ signals, totalScore, currentTime }: StatsSummaryProps) {
  const positiveSignals = signals.filter(s => s.weight > 0).length
  const negativeSignals = signals.filter(s => s.weight < 0).length
  
  const avgDecayRate = signals.length > 0
    ? signals.reduce((sum, s) => sum + s.decayRate, 0) / signals.length
    : 0

  const recentSignals = signals.filter(
    s => (currentTime - s.timestamp) < (24 * 60 * 60 * 1000)
  ).length

  const stats = [
    {
      label: 'Active Signals',
      value: signals.length,
      icon: Pulse,
      color: 'oklch(0.68 0.20 150)'
    },
    {
      label: 'Escalation',
      value: positiveSignals,
      icon: TrendUp,
      color: 'oklch(0.62 0.26 28)'
    },
    {
      label: 'De-escalation',
      value: negativeSignals,
      icon: Minus,
      color: 'oklch(0.75 0.20 75)'
    },
    {
      label: 'Last 24h',
      value: recentSignals,
      icon: Clock,
      color: 'oklch(0.72 0.22 50)'
    }
  ]

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {stats.map((stat, i) => (
        <motion.div
          key={stat.label}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: i * 0.1, duration: 0.5 }}
        >
          <Card className="p-4 border-2 bg-card/50">
            <div className="flex items-center gap-3">
              <stat.icon 
                size={24} 
                weight="duotone"
                style={{ color: stat.color }}
              />
              <div className="flex-1">
                <div 
                  className="font-display text-2xl font-bold tabular-nums"
                  style={{ color: stat.color }}
                >
                  {stat.value}
                </div>
                <div className="font-mono text-xs text-muted-foreground uppercase tracking-wider">
                  {stat.label}
                </div>
              </div>
            </div>
          </Card>
        </motion.div>
      ))}
    </div>
  )
}
