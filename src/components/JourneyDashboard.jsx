import { useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { Wallet, Activity, Layers, ArrowLeft } from 'lucide-react'
import MilestoneCard from './MilestoneCard.jsx'
import PersonalityCard from './PersonalityCard.jsx'
import JourneyCard, { CARD_VARIANTS } from './JourneyCard.jsx'
import DownloadButton from './DownloadButton.jsx'
import ShareButton from './ShareButton.jsx'

function StatTile({ icon: Icon, label, value }) {
  return (
    <div className="glass-panel rounded-2xl p-5">
      <div className="mb-2 flex items-center gap-2 text-mist-500">
        <Icon size={14} />
        <span className="label-tag">{label}</span>
      </div>
      <p className="font-display text-2xl font-semibold text-mist-100">{value}</p>
    </div>
  )
}

export default function JourneyDashboard({ journey, onReset }) {
  const [activeVariant, setActiveVariant] = useState(CARD_VARIANTS[0].id)
  const cardRef = useRef(null)

  const activeMeta = CARD_VARIANTS.find((v) => v.id === activeVariant)

  return (
    <div className="mx-auto max-w-5xl px-5 pb-24 sm:px-8">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="flex flex-wrap items-center justify-between gap-4 py-8"
      >
        <div>
          <button
            onClick={onReset}
            className="mb-3 flex items-center gap-1.5 text-sm text-mist-500 transition-colors hover:text-mist-100"
          >
            <ArrowLeft size={14} />
            Analyze another wallet
          </button>
          <h1 className="font-display text-2xl font-semibold text-mist-100 sm:text-3xl">
            {journey.addressDisplay}
          </h1>
          <p className="mt-1 text-sm text-mist-500">
            Wallet age {journey.walletAgeDisplay} · {journey.era.name}
          </p>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, delay: 0.05 }}
        className="mb-6"
      >
        <PersonalityCard journey={journey} />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, delay: 0.1 }}
        className="mb-10 grid grid-cols-2 gap-4 sm:grid-cols-4"
      >
        <StatTile icon={Activity} label="Transactions" value={journey.stats.totalTransactions.toLocaleString()} />
        <StatTile icon={Layers} label="Protocols used" value={journey.stats.uniqueProtocols} />
        <StatTile icon={Wallet} label="NFTs held" value={journey.stats.nftsHeld} />
        <StatTile icon={Layers} label="Chains active" value={journey.activeChains.length} />
      </motion.div>

      <div className="mb-12">
        <h2 className="mb-6 font-display text-xl font-semibold text-mist-100">Milestone timeline</h2>
        <div className="flex flex-col">
          <MilestoneCard
            milestone={{
              id: 'first-activity',
              label: journey.firstActivity.label,
              amountDisplay: 'Genesis',
              dateDisplay: journey.firstActivity.dateDisplay,
              chainName: journey.firstActivity.chainName,
              chainColor: journey.firstActivity.chainColor,
              txHashDisplay: journey.firstActivity.txHashDisplay,
            }}
            index={0}
          />
          {journey.milestones.map((m, i) => (
            <MilestoneCard
              key={m.id}
              milestone={m}
              index={i + 1}
              isLast={i === journey.milestones.length - 1}
            />
          ))}
        </div>
      </div>

      <div id="how-it-works" className="mb-8">
        <h2 className="mb-2 font-display text-xl font-semibold text-mist-100">Your journey card</h2>
        <p className="mb-6 text-sm text-mist-500">
          Choose a style, download it as a PNG, or share it directly.
        </p>

        <div className="mb-6 flex flex-wrap gap-2">
          {CARD_VARIANTS.map((variant) => (
            <button
              key={variant.id}
              onClick={() => setActiveVariant(variant.id)}
              className={`rounded-full border px-4 py-2 text-sm transition-colors ${
                activeVariant === variant.id
                  ? 'border-signal-blue/50 bg-signal-blue/10 text-mist-100'
                  : 'border-white/10 bg-white/[0.02] text-mist-500 hover:text-mist-100'
              }`}
            >
              {variant.name}
            </button>
          ))}
        </div>

        <div className="grid gap-8 sm:grid-cols-[minmax(0,380px),1fr] sm:items-center">
          <motion.div
            key={activeVariant}
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <JourneyCard ref={cardRef} variant={activeVariant} journey={journey} />
          </motion.div>

          <div className="glass-panel flex flex-col justify-center gap-4 rounded-2xl p-6">
            <div>
              <h3 className="font-display text-lg font-medium text-mist-100">{activeMeta.name}</h3>
              <p className="mt-1 text-sm text-mist-500">{activeMeta.description}</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <DownloadButton
                targetRef={cardRef}
                filename={`onchain-journey-${activeVariant}.png`}
                label="Download PNG"
              />
              <ShareButton journey={journey} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
