import { motion } from 'framer-motion'
import { ShieldCheck } from 'lucide-react'
import WalletInput from './WalletInput.jsx'
import { CHAINS } from '../lib/mockData.js'

export default function HeroSection({ onAnalyze, isBusy }) {
  return (
    <section className="relative overflow-hidden px-5 pb-20 pt-16 sm:px-8 sm:pt-24">
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-[-120px] h-[420px] w-[720px] -translate-x-1/2 animate-drift rounded-full bg-signal-blue/20 blur-[110px]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute right-[-120px] top-[80px] h-[300px] w-[300px] rounded-full bg-signal-violet/20 blur-[100px]"
      />

      <div className="relative mx-auto max-w-3xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mx-auto mb-6 inline-flex max-w-[92vw] items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-1.5"
        >
          <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-signal-mint" />
          <span className="label-tag text-mist-300">Public wallet analytics, five EVM chains</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.05 }}
          className="text-balance text-[2.5rem] font-semibold leading-[1.08] tracking-tight text-mist-100 sm:text-6xl"
        >
          Every Wallet Has A Story
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.12 }}
          className="mx-auto mt-5 max-w-xl text-balance text-base leading-relaxed text-mist-500 sm:text-lg"
        >
          Discover your onchain journey, from your first milestone to your biggest moments.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mx-auto mt-10 max-w-xl"
        >
          <WalletInput onSubmit={onAnalyze} isBusy={isBusy} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-5 flex items-center justify-center gap-2 text-sm text-mist-500"
        >
          <ShieldCheck size={15} className="text-signal-mint" />
          No wallet connection required. Only public blockchain data is analyzed.
        </motion.div>

        <motion.div
          id="chains"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.38 }}
          className="mx-auto mt-16 flex max-w-lg flex-wrap items-center justify-center gap-x-8 gap-y-4"
        >
          {CHAINS.map((chain) => (
            <div key={chain.id} className="flex items-center gap-2 text-mist-500">
              <span
                className="h-2 w-2 rounded-full"
                style={{ backgroundColor: chain.color }}
                aria-hidden
              />
              <span className="text-sm">{chain.name}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
