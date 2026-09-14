import { motion } from 'framer-motion'
import { Compass } from 'lucide-react'

export default function Navbar({ onReset }) {
  return (
    <motion.header
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="sticky top-0 z-40 border-b border-white/[0.06] bg-ink-950/70 backdrop-blur-xl"
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 sm:px-8">
        <button
          onClick={onReset}
          className="flex items-center gap-2.5 text-left"
          aria-label="Onchain Journey home"
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-signal-blue to-signal-violet">
            <Compass className="text-white" size={18} strokeWidth={2.2} />
          </span>
          <span className="font-display text-[17px] font-semibold tracking-tight text-mist-100">
            Onchain Journey
          </span>
        </button>

        <nav className="hidden items-center gap-8 sm:flex">
          <a href="#how-it-works" className="text-sm text-mist-500 transition-colors hover:text-mist-100">
            How it works
          </a>
          <a href="#chains" className="text-sm text-mist-500 transition-colors hover:text-mist-100">
            Supported chains
          </a>
        </nav>
      </div>
    </motion.header>
  )
}
