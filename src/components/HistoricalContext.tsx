import { Card } from '@/components/ui/card'
import { HistoricalEvent } from '@/lib/types'
import { Separator } from '@/components/ui/separator'

interface HistoricalContextProps {
  events: HistoricalEvent[]
  currentMinutes: number
}

export function HistoricalContext({ events, currentMinutes }: HistoricalContextProps) {
  const sortedEvents = [...events].sort((a, b) => a.minutesToMidnight - b.minutesToMidnight)

  return (
    <Card className="p-6 border-2">
      <h3 className="font-mono text-sm uppercase tracking-widest mb-6 text-muted-foreground">
        Historical Reference Points
      </h3>
      <div className="space-y-4">
        {sortedEvents.map((event, i) => {
          const isCurrent = Math.abs(event.minutesToMidnight - currentMinutes) < 0.5
          return (
            <div key={i}>
              {i > 0 && <Separator className="my-4" />}
              <div className="flex items-start gap-4">
                <div className={`font-display text-2xl font-bold tabular-nums flex-shrink-0 ${isCurrent ? 'text-accent' : 'text-muted-foreground'}`}>
                  {event.minutesToMidnight.toFixed(1)}
                </div>
                <div className="flex-1 space-y-1">
                  <div className={`font-mono text-sm font-bold uppercase tracking-wide ${isCurrent ? 'text-accent' : ''}`}>
                    {event.name}
                  </div>
                  <p className="font-mono text-xs text-muted-foreground leading-relaxed">
                    {event.description}
                  </p>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </Card>
  )
}
