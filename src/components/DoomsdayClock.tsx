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
    <div className="relative w-full">
      <div className="relative flex flex-col items-center gap-12 py-16">
        <motion.div 
          className="relative w-[400px] h-[400px] md:w-[500px] md:h-[500px]"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1, ease: 'easeOut' }}
        >
          <div 
            className="absolute inset-0 rounded-full opacity-20 blur-3xl"
            style={{ backgroundColor: getStateColor() }}
          />
          
          <svg viewBox="0 0 500 500" className="w-full h-full relative z-10">
            <defs>
              <filter id="glow">
                <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
                <feMerge>
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
              <filter id="strong-glow">
                <feGaussianBlur stdDeviation="8" result="coloredBlur"/>
                <feMerge>
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
              <radialGradient id="clockFace">
                <stop offset="0%" stopColor="oklch(0.22 0.042 265)" />
                <stop offset="100%" stopColor="oklch(0.16 0.042 265)" />
              </radialGradient>
            </defs>

            <circle
              cx="250"
              cy="250"
              r="230"
              fill="url(#clockFace)"
              stroke={getStateColor()}
              strokeWidth="3"
              filter="url(#glow)"
            />

            <circle
              cx="250"
              cy="250"
              r="210"
              fill="none"
              stroke="oklch(0.30 0.05 265)"
              strokeWidth="1"
              opacity="0.4"
            />

            {[...Array(60)].map((_, i) => {
              const isMajor = i % 5 === 0
              const tickAngle = (i * 6 - 90) * (Math.PI / 180)
              const innerRadius = isMajor ? 190 : 200
              const outerRadius = 210
              const x1 = 250 + innerRadius * Math.cos(tickAngle)
              const y1 = 250 + innerRadius * Math.sin(tickAngle)
              const x2 = 250 + outerRadius * Math.cos(tickAngle)
              const y2 = 250 + outerRadius * Math.sin(tickAngle)
              return (
                <line
                  key={i}
                  x1={x1}
                  y1={y1}
                  x2={x2}
                  y2={y2}
                  stroke={isMajor ? getStateColor() : 'oklch(0.40 0.05 265)'}
                  strokeWidth={isMajor ? '3' : '1'}
                  opacity={isMajor ? '0.8' : '0.3'}
                />
              )
            })}

            {[...Array(12)].map((_, i) => {
              const tickAngle = (i * 30 - 90) * (Math.PI / 180)
              const x = 250 + 165 * Math.cos(tickAngle)
              const y = 250 + 165 * Math.sin(tickAngle)
              const numeral = i === 0 ? 'XII' : i.toString()
              return (
                <text
                  key={i}
                  x={x}
                  y={y + 5}
                  textAnchor="middle"
                  fill={getStateColor()}
                  fontSize={i === 0 ? '20' : '16'}
                  fontFamily="Space Mono, monospace"
                  fontWeight="700"
                  filter="url(#glow)"
                >
                  {numeral}
                </text>
              )
            })}

            <motion.path
              d={`M 250 250 L 250 40 A 210 210 0 ${angle > 180 ? 1 : 0} 1 ${
                250 + 210 * Math.sin((angle * Math.PI) / 180)
              } ${250 - 210 * Math.cos((angle * Math.PI) / 180)} Z`}
              fill={getStateColor()}
              opacity="0.15"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.15 }}
              transition={{ duration: 1.5, ease: 'easeInOut' }}
            />

            <motion.line
              x1="250"
              y1="250"
              x2="250"
              y2="70"
              stroke={getStateColor()}
              strokeWidth="6"
              strokeLinecap="round"
              filter="url(#strong-glow)"
              initial={{ rotate: 0 }}
              animate={{ rotate: angle }}
              transition={{ duration: 2, ease: [0.43, 0.13, 0.23, 0.96] }}
              style={{ transformOrigin: '250px 250px' }}
            />

            <circle
              cx="250"
              cy="250"
              r="12"
              fill={getStateColor()}
              filter="url(#strong-glow)"
            />

            <circle
              cx="250"
              cy="250"
              r="8"
              fill="oklch(0.16 0.042 265)"
            />

            {historicalEvents.map((event, i) => {
              const eventAngle = ((12 - event.minutesToMidnight) / 12) * 360 - 90
              const radians = (eventAngle * Math.PI) / 180
              const x = 250 + 185 * Math.cos(radians)
              const y = 250 + 185 * Math.sin(radians)
              return (
                <motion.g 
                  key={i}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.5 + i * 0.1, duration: 0.5 }}
                >
                  <circle
                    cx={x}
                    cy={y}
                    r="5"
                    fill="none"
                    stroke="oklch(0.60 0.10 265)"
                    strokeWidth="2"
                    opacity="0.6"
                  />
                  <circle
                    cx={x}
                    cy={y}
                    r="2"
                    fill="oklch(0.60 0.10 265)"
                    opacity="0.8"
                  />
                </motion.g>
              )
            })}
          </svg>
        </motion.div>

        <motion.div 
          className="flex flex-col items-center gap-4"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          <motion.div
            className="font-display text-7xl md:text-8xl font-bold tabular-nums tracking-tighter"
            style={{ color: getStateColor() }}
            animate={riskState === 'critical' ? { 
              opacity: [1, 0.6, 1],
              textShadow: [
                `0 0 20px ${getStateColor()}`,
                `0 0 40px ${getStateColor()}`,
                `0 0 20px ${getStateColor()}`
              ]
            } : {}}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          >
            {minutesToMidnight.toFixed(1)}
          </motion.div>
          <div className="font-mono text-base uppercase tracking-[0.3em] text-muted-foreground">
            Minutes to Midnight
          </div>
          <motion.div
            className="font-mono text-sm uppercase tracking-[0.4em] px-6 py-2 rounded-sm border-2 font-bold mt-2"
            style={{
              color: getStateColor(),
              borderColor: getStateColor(),
              boxShadow: `0 0 20px ${getStateColor()}40`
            }}
            animate={riskState === 'critical' ? {
              boxShadow: [
                `0 0 20px ${getStateColor()}40`,
                `0 0 40px ${getStateColor()}80`,
                `0 0 20px ${getStateColor()}40`
              ]
            } : {}}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          >
            {getStateLabel()}
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}
