import { motion } from 'framer-motion'
import { RiskState } from '@/lib/types'
import { HistoricalEvent } from '@/lib/types'

interface DoomsdayClockProps {
  minutesToMidnight: number
  riskState: RiskState
  historicalEvents: HistoricalEvent[]
}

export function DoomsdayClock({ minutesToMidnight, riskState, historicalEvents }: DoomsdayClockProps) {
  const angle = ((12 - minutesToMidnight) / 12) * 360

  const getStateColor = () => {
    switch (riskState) {
      case 'stable': return 'oklch(0.68 0.20 150)'
      case 'elevated': return 'oklch(0.75 0.20 75)'
      case 'severe': return 'oklch(0.72 0.22 50)'
      case 'critical': return 'oklch(0.62 0.26 28)'
    }
  }

  const getStateLabel = () => {
    switch (riskState) {
      case 'stable': return 'STABLE'
      case 'elevated': return 'ELEVATED'
      case 'severe': return 'SEVERE'
      case 'critical': return 'CRITICAL'
    }
  }

  return (
    <div className="flex flex-col items-center gap-8 py-12">
      <div className="relative w-80 h-80 md:w-96 md:h-96">
        <svg viewBox="0 0 400 400" className="w-full h-full">
          <defs>
            <filter id="glow">
              <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>

          <circle
            cx="200"
            cy="200"
            r="180"
            fill="none"
            stroke="oklch(0.26 0.02 135)"
            strokeWidth="2"
          />

          <circle
            cx="200"
            cy="200"
            r="160"
            fill="none"
            stroke="oklch(0.22 0.02 135)"
            strokeWidth="1"
          />

          {[...Array(12)].map((_, i) => {
            const tickAngle = (i * 30 - 90) * (Math.PI / 180)
            const x1 = 200 + 170 * Math.cos(tickAngle)
            const y1 = 200 + 170 * Math.sin(tickAngle)
            const x2 = 200 + 180 * Math.cos(tickAngle)
            const y2 = 200 + 180 * Math.sin(tickAngle)
            return (
              <line
                key={i}
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke="oklch(0.52 0.02 140)"
                strokeWidth="2"
              />
            )
          })}

          <motion.path
            d={`M 200 200 L 200 40 A 160 160 0 ${angle > 180 ? 1 : 0} 1 ${
              200 + 160 * Math.sin((angle * Math.PI) / 180)
            } ${200 - 160 * Math.cos((angle * Math.PI) / 180)} Z`}
            fill={getStateColor()}
            opacity="0.3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.3 }}
            transition={{ duration: 1, ease: 'easeInOut' }}
          />

          <motion.line
            x1="200"
            y1="200"
            x2="200"
            y2="60"
            stroke={getStateColor()}
            strokeWidth="4"
            strokeLinecap="round"
            filter="url(#glow)"
            initial={{ rotate: 0 }}
            animate={{ rotate: angle }}
            transition={{ duration: 2, ease: 'easeInOut' }}
            style={{ transformOrigin: '200px 200px' }}
          />

          <circle
            cx="200"
            cy="200"
            r="8"
            fill={getStateColor()}
            filter="url(#glow)"
          />

          <text
            x="200"
            y="210"
            textAnchor="middle"
            fill="oklch(0.52 0.02 140)"
            fontSize="14"
            fontFamily="Space Mono, monospace"
            fontWeight="700"
          >
            XII
          </text>

          {historicalEvents.map((event, i) => {
            const eventAngle = ((12 - event.minutesToMidnight) / 12) * 360 - 90
            const radians = (eventAngle * Math.PI) / 180
            const x = 200 + 150 * Math.cos(radians)
            const y = 200 + 150 * Math.sin(radians)
            return (
              <g key={i}>
                <circle
                  cx={x}
                  cy={y}
                  r="3"
                  fill="oklch(0.52 0.02 140)"
                  opacity="0.5"
                />
              </g>
            )
          })}
        </svg>
      </div>

      <div className="flex flex-col items-center gap-2">
        <motion.div
          className="font-display text-6xl md:text-7xl font-bold tabular-nums tracking-tight"
          style={{ color: getStateColor() }}
          animate={riskState === 'critical' ? { opacity: [1, 0.7, 1] } : {}}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        >
          {minutesToMidnight.toFixed(1)}
        </motion.div>
        <div className="font-mono text-sm uppercase tracking-wider text-muted-foreground">
          Minutes to Midnight
        </div>
        <div
          className="font-mono text-xs uppercase tracking-widest px-3 py-1 rounded border-2 font-bold"
          style={{
            color: getStateColor(),
            borderColor: getStateColor(),
          }}
        >
          {getStateLabel()}
        </div>
      </div>
    </div>
  )
}
