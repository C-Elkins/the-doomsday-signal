import { Signal } from '@/lib/types'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Globe, Newspaper, ShieldWarning, Rocket, TrendUp, TrendDown } from '@phosphor-icons/react'
import { getSignalDecayPercent } from '@/lib/risk-calculator'

interface SignalCardProps {
  signal: Signal
  currentTime: number
}

export function SignalCard({ signal, currentTime }: SignalCardProps) {
  const getCategoryIcon = () => {
    switch (signal.category) {
      case 'geopolitical': return <Globe weight="duotone" />
      case 'media': return <Newspaper weight="duotone" />
      case 'cyber': return <ShieldWarning weight="duotone" />
      case 'strategic': return <Rocket weight="duotone" />
    }
  }

  const getCategoryColor = () => {
    switch (signal.category) {
      case 'geopolitical': return 'oklch(0.55 0.15 240)'
      case 'media': return 'oklch(0.60 0.15 280)'
      case 'cyber': return 'oklch(0.55 0.18 355)'
      case 'strategic': return 'oklch(0.50 0.15 25)'
    }
  }

  const decayPercent = getSignalDecayPercent(signal, currentTime)
  const hoursElapsed = Math.floor((currentTime - signal.timestamp) / (1000 * 60 * 60))
  const isPositive = signal.weight > 0

  return (
    <Card className="p-6 border-2">
      <div className="flex items-start gap-4">
        <div className="text-2xl" style={{ color: getCategoryColor() }}>
          {getCategoryIcon()}
        </div>
        <div className="flex-1 space-y-3">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <Badge
                variant="outline"
                className="mb-2 font-mono text-xs uppercase tracking-wide"
                style={{ borderColor: getCategoryColor(), color: getCategoryColor() }}
              >
                {signal.category}
              </Badge>
              <p className="font-mono text-sm leading-relaxed">{signal.description}</p>
            </div>
            <div className="flex items-center gap-2 flex-shrink-0">
              {isPositive ? (
                <TrendUp className="text-destructive" weight="bold" />
              ) : (
                <TrendDown className="text-accent" weight="bold" />
              )}
              <span
                className={`font-display text-2xl font-bold tabular-nums ${
                  isPositive ? 'text-destructive' : 'text-accent'
                }`}
              >
                {isPositive ? '+' : ''}{signal.weight}
              </span>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-mono text-muted-foreground">
              <span>{hoursElapsed}h elapsed</span>
              <span>{Math.round(decayPercent)}% impact remaining</span>
            </div>
            <Progress value={decayPercent} className="h-1" />
          </div>

          <div className="text-xs font-mono text-muted-foreground">
            {new Date(signal.timestamp).toLocaleString('en-US', {
              month: 'short',
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit',
            })}
          </div>
        </div>
      </div>
    </Card>
  )
}
