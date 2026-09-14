import { motion } from 'framer-motion'
import { ExternalLink } from 'lucide-react'

export default function MilestoneCard({ milestone, index, isLast = false }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -16 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.45, delay: index * 0.06, ease: 'easeOut' }}
      className="relative flex gap-4 pl-2 sm:gap-6"
    >
      <div className="flex flex-col items-center">
        <span
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border text-xs font-semibold"
          style={{
            borderColor: milestone.chainColor + '55',
            color: milestone.chainColor,
            backgroundColor: milestone.chainColor + '14',
          }}
        >
          {index + 1}
        </span>
        {!isLast && <span className="mt-1 w-px flex-1 bg-white/[0.08]" aria-hidden />}
      </div>

      <div className="glass-panel glass-panel-hover mb-6 w-full rounded-2xl p-5">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h3 className="font-display text-base font-medium text-mist-100">
            {milestone.label}
          </h3>
          <span className="font-mono text-lg font-semibold text-signal-mint">
            {milestone.amountDisplay}
          </span>
        </div>

        <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-mist-500">
          <span>{milestone.dateDisplay}</span>
          <span className="flex items-center gap-1.5">
            <span
              className="h-1.5 w-1.5 rounded-full"
              style={{ backgroundColor: milestone.chainColor }}
            />
            {milestone.chainName}
          </span>
          <span className="flex items-center gap-1 font-mono text-xs text-mist-700">
            {milestone.txHashDisplay}
            <ExternalLink size={12} />
          </span>
        </div>
      </div>
    </motion.div>
  )
}
