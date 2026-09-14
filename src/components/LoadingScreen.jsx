import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Loader2 } from 'lucide-react'

const MESSAGES = [
  'Analyzing wallet history...',
  'Finding your first milestones...',
  'Building your journey card...',
]

export default function LoadingScreen() {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((i) => Math.min(i + 1, MESSAGES.length - 1))
    }, 900)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-6 py-24 text-center">
      <div className="relative mb-8 flex h-16 w-16 items-center justify-center">
        <span className="absolute inset-0 rounded-full bg-signal-blue/20 blur-xl" />
        <Loader2 className="relative h-10 w-10 animate-spin text-signal-blue" strokeWidth={2} />
      </div>

      <div className="h-7 overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.p
            key={index}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="font-display text-lg text-mist-100"
          >
            {MESSAGES[index]}
          </motion.p>
        </AnimatePresence>
      </div>

      <div className="mt-8 h-1 w-56 overflow-hidden rounded-full bg-white/[0.06]">
        <motion.div
          className="h-full rounded-full bg-gradient-to-r from-signal-blue to-signal-violet"
          initial={{ width: '10%' }}
          animate={{ width: `${((index + 1) / MESSAGES.length) * 100}%` }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        />
      </div>
    </div>
  )
}
