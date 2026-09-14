import { motion } from 'framer-motion'
import { Sparkles, Clock3, Gauge } from 'lucide-react'

function ScoreRing({ score }) {
  const radius = 46
  const circumference = 2 * Math.PI * radius
  const offset = circumference - (score / 100) * circumference

  return (
    <div className="relative flex h-32 w-32 shrink-0 items-center justify-center">
      <svg viewBox="0 0 108 108" className="h-32 w-32 -rotate-90">
        <circle cx="54" cy="54" r={radius} fill="none" stroke="rgba(255,255,255,0.07)" strokeWidth="8" />
        <motion.circle
          cx="54"
          cy="54"
          r={radius}
          fill="none"
          stroke="url(#scoreGradient)"
          strokeWidth="8"
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1.1, ease: 'easeOut', delay: 0.2 }}
        />
        <defs>
          <linearGradient id="scoreGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#4C6FFF" />
            <stop offset="100%" stopColor="#9B5BFF" />
          </linearGradient>
        </defs>
      </svg>
      <div className="absolute flex flex-col items-center">
        <span className="font-display text-3xl font-semibold text-mist-100">{score}</span>
        <span className="text-[11px] text-mist-500">OG Score</span>
      </div>
    </div>
  )
}

export default function PersonalityCard({ journey }) {
  return (
    <div className="grid gap-5 sm:grid-cols-[auto,1fr] sm:items-center">
      <div className="glass-panel flex items-center justify-center rounded-2xl p-6">
        <ScoreRing score={journey.ogScore} />
      </div>

      <div className="glass-panel rounded-2xl p-6">
        <div className="mb-1 flex items-center gap-2">
          <Gauge size={15} className="text-signal-blue" />
          <span className="label-tag">{journey.ogTier.label} tier</span>
        </div>
        <p className="text-sm text-mist-500">{journey.ogTier.description}</p>

        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          <div>
            <div className="mb-2 flex items-center gap-2">
              <Sparkles size={14} className="text-signal-violet" />
              <span className="label-tag">Wallet personality</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {journey.personalities.map((p) => (
                <span
                  key={p.id}
                  className="rounded-full border border-signal-violet/30 bg-signal-violet/10 px-3 py-1 text-sm text-mist-100"
                >
                  {p.name}
                </span>
              ))}
            </div>
          </div>

          <div>
            <div className="mb-2 flex items-center gap-2">
              <Clock3 size={14} className="text-signal-blue" />
              <span className="label-tag">Web3 era</span>
            </div>
            <span className="inline-flex rounded-full border border-signal-blue/30 bg-signal-blue/10 px-3 py-1 text-sm text-mist-100">
              {journey.era.name}
            </span>
            <p className="mt-2 text-xs text-mist-500">{journey.era.description}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
