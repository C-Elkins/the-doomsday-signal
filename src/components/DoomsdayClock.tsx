import { motion } from 'framer-motion'
import { RiskState } from '@/lib/types'
import { HistoricalEvent } from '@/lib/types'

interface DoomsdayClockProps {
  minutesToMidnight: number
  riskState: RiskState
  historicalEvents: HistoricalEvent[]
}

export function DoomsdayClock({ minutesToMidnight, riskState, historicalEvents }: DoomsdayClockProps) {
  const clampedMinutes = Math.max(0, Math.min(12, minutesToMidnight))
  const dangerPercent = ((12 - clampedMinutes) / 12) * 100
  const angle = (dangerPercent / 100) * 360

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

  const romanNumerals = ['XII', 'I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI']

  return (
    <div className="relative w-full">
      <div className="relative flex flex-col items-center gap-12 py-16">
        <motion.div 
          className="relative w-[350px] h-[350px] sm:w-[450px] sm:h-[450px] md:w-[550px] md:h-[550px]"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1, ease: 'easeOut' }}
        >
          <motion.div 
            className="absolute inset-0 rounded-full blur-[80px]"
            style={{ backgroundColor: getStateColor() }}
            animate={{ 
              opacity: riskState === 'critical' ? [0.15, 0.3, 0.15] : [0.15, 0.2, 0.15]
            }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          />
          
          <svg viewBox="0 0 500 500" className="w-full h-full relative z-10">
            <defs>
              <filter id="glow">
                <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                <feMerge>
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
              <filter id="strong-glow">
                <feGaussianBlur stdDeviation="6" result="coloredBlur"/>
                <feMerge>
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
              <filter id="ultra-glow">
                <feGaussianBlur stdDeviation="10" result="coloredBlur"/>
                <feMerge>
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
              <radialGradient id="clockFace">
                <stop offset="0%" stopColor="oklch(0.20 0.042 265)" />
                <stop offset="60%" stopColor="oklch(0.16 0.042 265)" />
                <stop offset="100%" stopColor="oklch(0.12 0.042 265)" />
              </radialGradient>
              <linearGradient id="rimGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor={getStateColor()} stopOpacity="0.8" />
                <stop offset="50%" stopColor={getStateColor()} stopOpacity="1" />
                <stop offset="100%" stopColor={getStateColor()} stopOpacity="0.6" />
              </linearGradient>
            </defs>

            <circle
              cx="250"
              cy="250"
              r="235"
              fill="none"
              stroke="url(#rimGradient)"
              strokeWidth="4"
              filter="url(#strong-glow)"
            />

            <circle
              cx="250"
              cy="250"
              r="225"
              fill="url(#clockFace)"
              stroke={getStateColor()}
              strokeWidth="1"
              opacity="0.3"
            />

            <circle
              cx="250"
              cy="250"
              r="215"
              fill="none"
              stroke="oklch(0.25 0.05 265)"
              strokeWidth="1"
              opacity="0.3"
            />

            <circle
              cx="250"
              cy="250"
              r="205"
              fill="none"
              stroke="oklch(0.30 0.05 265)"
              strokeWidth="0.5"
              opacity="0.2"
            />

            {[...Array(60)].map((_, i) => {
              const isMajor = i % 5 === 0
              const tickAngle = (i * 6 - 90) * (Math.PI / 180)
              const innerRadius = isMajor ? 185 : 195
              const outerRadius = 205
              const x1 = 250 + innerRadius * Math.cos(tickAngle)
              const y1 = 250 + innerRadius * Math.sin(tickAngle)
              const x2 = 250 + outerRadius * Math.cos(tickAngle)
              const y2 = 250 + outerRadius * Math.sin(tickAngle)
              
              const isInDangerZone = i >= 55 || i <= 5
              
              return (
                <motion.line
                  key={i}
                  x1={x1}
                  y1={y1}
                  x2={x2}
                  y2={y2}
                  stroke={isMajor ? getStateColor() : (isInDangerZone ? 'oklch(0.50 0.10 265)' : 'oklch(0.35 0.05 265)')}
                  strokeWidth={isMajor ? '3' : '1'}
                  opacity={isMajor ? '0.9' : (isInDangerZone ? '0.5' : '0.3')}
                  filter={isMajor ? 'url(#glow)' : undefined}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: isMajor ? 0.9 : (isInDangerZone ? 0.5 : 0.3) }}
                  transition={{ delay: 0.5 + i * 0.01, duration: 0.5 }}
                />
              )
            })}

            {romanNumerals.map((numeral, i) => {
              const tickAngle = (i * 30 - 90) * (Math.PI / 180)
              const x = 250 + 155 * Math.cos(tickAngle)
              const y = 250 + 155 * Math.sin(tickAngle)
              const isMidnight = i === 0
              
              return (
                <motion.text
                  key={i}
                  x={x}
                  y={y + 6}
                  textAnchor="middle"
                  fill={isMidnight ? 'oklch(0.62 0.26 28)' : getStateColor()}
                  fontSize={isMidnight ? '24' : '18'}
                  fontFamily="Fira Code, monospace"
                  fontWeight="700"
                  filter={isMidnight ? 'url(#ultra-glow)' : 'url(#glow)'}
                  opacity={isMidnight ? '1' : '0.85'}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: isMidnight ? 1 : 0.85 }}
                  transition={{ delay: 0.7 + i * 0.05, duration: 0.6, ease: 'backOut' }}
                >
                  {numeral}
                </motion.text>
              )
            })}

            {angle > 0 && (
              <motion.path
                d={`M 250 250 L 250 35 A 215 215 0 ${angle > 180 ? 1 : 0} 1 ${
                  250 + 215 * Math.sin((angle * Math.PI) / 180)
                } ${250 - 215 * Math.cos((angle * Math.PI) / 180)} Z`}
                fill={getStateColor()}
                opacity="0.25"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 0.25, scale: 1 }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
                filter="url(#glow)"
              />
            )}

            <circle
              cx="250"
              cy="250"
              r="8"
              fill={getStateColor()}
              filter="url(#strong-glow)"
            />

            <circle
              cx="250"
              cy="250"
              r="4"
              fill="oklch(0.14 0.042 265)"
            />

            {historicalEvents.map((event, i) => {
              const eventAngle = ((60 - event.minutesToMidnight) / 60) * 360 - 90
              const radians = (eventAngle * Math.PI) / 180
              const x = 250 + 175 * Math.cos(radians)
              const y = 250 + 175 * Math.sin(radians)
              return (
                <motion.g 
                  key={i}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 1 + i * 0.1, duration: 0.5 }}
                >
                  <circle
                    cx={x}
                    cy={y}
                    r="6"
                    fill="none"
                    stroke="oklch(0.55 0.08 265)"
                    strokeWidth="2"
                    opacity="0.5"
                  />
                  <circle
                    cx={x}
                    cy={y}
                    r="3"
                    fill="oklch(0.55 0.08 265)"
                    opacity="0.7"
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
            className="font-display text-6xl sm:text-7xl md:text-8xl font-bold tabular-nums tracking-tighter"
            style={{ 
              color: getStateColor(),
              textShadow: `0 0 30px ${getStateColor()}60`
            }}
            animate={riskState === 'critical' ? { 
              opacity: [1, 0.7, 1],
              textShadow: [
                `0 0 30px ${getStateColor()}60`,
                `0 0 50px ${getStateColor()}90`,
                `0 0 30px ${getStateColor()}60`
              ]
            } : {}}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          >
            {minutesToMidnight.toFixed(1)}
          </motion.div>
          <div className="font-mono text-sm sm:text-base uppercase tracking-[0.3em] text-muted-foreground">
            Minutes to Midnight
          </div>
          <motion.div
            className="font-mono text-xs sm:text-sm uppercase tracking-[0.4em] px-6 py-2 rounded-none border-2 font-bold mt-2"
            style={{
              color: getStateColor(),
              borderColor: getStateColor(),
              boxShadow: `0 0 20px ${getStateColor()}40, inset 0 0 20px ${getStateColor()}10`
            }}
            animate={riskState === 'critical' ? {
              boxShadow: [
                `0 0 20px ${getStateColor()}40, inset 0 0 20px ${getStateColor()}10`,
                `0 0 40px ${getStateColor()}80, inset 0 0 30px ${getStateColor()}20`,
                `0 0 20px ${getStateColor()}40, inset 0 0 20px ${getStateColor()}10`
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
