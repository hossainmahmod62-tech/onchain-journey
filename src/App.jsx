import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { AlertCircle } from 'lucide-react'
import Navbar from './components/Navbar.jsx'
import HeroSection from './components/HeroSection.jsx'
import LoadingScreen from './components/LoadingScreen.jsx'
import JourneyDashboard from './components/JourneyDashboard.jsx'
import { fetchWalletProfile } from './lib/dataSource.js'
import { generateJourney } from './lib/journeyGenerator.js'

const STAGES = {
  LANDING: 'landing',
  LOADING: 'loading',
  RESULTS: 'results',
}

export default function App() {
  const [stage, setStage] = useState(STAGES.LANDING)
  const [journey, setJourney] = useState(null)
  const [error, setError] = useState(null)

  async function handleAnalyze(address) {
    setError(null)
    setStage(STAGES.LOADING)

    const loadingFloor = new Promise((resolve) => setTimeout(resolve, 2400))

    try {
      const [profile] = await Promise.all([fetchWalletProfile(address), loadingFloor])
      setJourney(generateJourney(profile))
      setStage(STAGES.RESULTS)
    } catch (err) {
      setError(err.message || 'Something went wrong while analyzing that wallet.')
      setStage(STAGES.LANDING)
    }
  }

  function handleReset() {
    setJourney(null)
    setError(null)
    setStage(STAGES.LANDING)
  }

  return (
    <div className="relative min-h-screen">
      <Navbar onReset={handleReset} />

      <AnimatePresence mode="wait">
        {stage === STAGES.LANDING && (
          <motion.div key="landing" exit={{ opacity: 0 }} transition={{ duration: 0.25 }}>
            <HeroSection onAnalyze={handleAnalyze} isBusy={false} />
            {error && (
              <div className="mx-auto -mt-10 mb-10 flex max-w-md items-center gap-2 rounded-xl border border-rose-500/25 bg-rose-500/[0.06] px-4 py-3 text-sm text-rose-300">
                <AlertCircle size={15} />
                {error}
              </div>
            )}
          </motion.div>
        )}

        {stage === STAGES.LOADING && (
          <motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <LoadingScreen />
          </motion.div>
        )}

        {stage === STAGES.RESULTS && journey && (
          <motion.div key="results" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.35 }}>
            <JourneyDashboard journey={journey} onReset={handleReset} />
          </motion.div>
        )}
      </AnimatePresence>

      <footer className="border-t border-white/[0.06] px-5 py-8 text-center text-xs text-mist-700 sm:px-8">
        Onchain Journey analyzes public wallet addresses only. It never requests a wallet connection, a signature, or a private key.
      </footer>
    </div>
  )
}
