import { Signal } from '@/lib/types'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Button } from '@/components/ui/button'
import { Globe, Newspaper, ShieldWarning, Rocket, TrendUp, TrendDown, Trash } from '@phosphor-icons/react'
import { getSignalDecayPercent } from '@/lib/risk-calculator'
import { motion } from 'framer-motion'

interface SignalCardProps {
  signal: Signal
  currentTime: number
  onDelete?: (signalId: string) => void
}

export function SignalCard({ signal, currentTime, onDelete }: SignalCardProps) {
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
      case 'geopolitical': return 'oklch(0.65 0.18 240)'
      case 'media': return 'oklch(0.68 0.18 280)'
      case 'cyber': return 'oklch(0.65 0.20 355)'
      case 'strategic': return 'oklch(0.62 0.20 35)'
    }
  }

  const decayPercent = getSignalDecayPercent(signal, currentTime)
  const hoursElapsed = Math.floor((currentTime - signal.timestamp) / (1000 * 60 * 60))
  const isPositive = signal.weight > 0
  const isRecent = hoursElapsed < 1

  return (
    <Card className="p-6 border-2 relative overflow-hidden group hover:border-primary/30 transition-colors duration-300">
      {isRecent && (
        <motion.div
          className="absolute top-0 left-0 right-0 h-0.5 bg-primary"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.5 }}
        />
      )}
      
      <div className="flex items-start gap-4">
        <motion.div 
          className="text-2xl"
          style={{ color: getCategoryColor() }}
          whileHover={{ scale: 1.1 }}
          transition={{ type: 'spring', stiffness: 400, damping: 10 }}
        >
          {getCategoryIcon()}
        </motion.div>
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
            <div className="flex items-center gap-3">
              <motion.div 
                className="flex items-center gap-2 flex-shrink-0"
                initial={{ scale: 1.2, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.1, duration: 0.3 }}
              >
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
              </motion.div>
              {onDelete && (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onDelete(signal.id)}
                  className="opacity-0 group-hover:opacity-100 transition-opacity h-8 w-8"
                  aria-label="Delete signal"
                >
                  <Trash weight="bold" className="text-destructive" />
                </Button>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-mono text-muted-foreground">
              <span>{hoursElapsed}h elapsed</span>
              <span>{Math.round(decayPercent)}% impact remaining</span>
            </div>
            <div className="relative">
              <Progress value={decayPercent} className="h-1" />
              {decayPercent < 20 && (
                <motion.div
                  className="absolute inset-0 bg-destructive/20 rounded-full"
                  animate={{ opacity: [0.2, 0.5, 0.2] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              )}
            </div>
          </div>

          <div className="flex items-center justify-between text-xs font-mono text-muted-foreground">
            <span>
              {new Date(signal.timestamp).toLocaleString('en-US', {
                month: 'short',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
              })}
            </span>
            {isRecent && (
              <motion.span
                className="text-primary font-bold uppercase tracking-wider"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                NEW
              </motion.span>
            )}
          </div>
        </div>
      </div>
    </Card>
  )
}
