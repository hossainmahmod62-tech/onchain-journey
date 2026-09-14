import { forwardRef } from 'react'
import { Compass, Sparkles } from 'lucide-react'

const FRAME =
  'relative mx-auto flex aspect-[4/5] w-full max-w-[380px] flex-col overflow-hidden rounded-[28px] border border-white/[0.09] p-7'

function CardChrome({ children, gradientFrom, gradientTo }) {
  return (
    <div
      className={FRAME}
      style={{
        background: `linear-gradient(160deg, ${gradientFrom} 0%, #05070D 55%, ${gradientTo} 100%)`,
      }}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)',
          backgroundSize: '28px 28px',
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-10 -top-10 h-44 w-44 rounded-full opacity-40 blur-3xl"
        style={{ backgroundColor: gradientFrom }}
      />
      {children}
    </div>
  )
}

function CardHeader({ eyebrow }) {
  return (
    <div className="relative z-10 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <span className="flex h-7 w-7 items-center justify-center rounded-md bg-gradient-to-br from-signal-blue to-signal-violet">
          <Compass size={14} className="text-white" />
        </span>
        <span className="font-display text-[13px] font-semibold text-mist-100">Onchain Journey</span>
      </div>
      <span className="label-tag rounded-full border border-white/10 px-2.5 py-1 text-mist-300">{eyebrow}</span>
    </div>
  )
}

function CardFooter({ addressDisplay }) {
  return (
    <div className="relative z-10 mt-auto flex items-center justify-between border-t border-white/[0.08] pt-4">
      <span className="font-mono text-xs text-mist-500">{addressDisplay}</span>
      <span className="text-xs text-mist-700">Every Wallet Has A Story</span>
    </div>
  )
}

const GenesisCard = forwardRef(({ journey }, ref) => (
  <div ref={ref}>
    <CardChrome gradientFrom="#1B2550" gradientTo="#2A1B4A">
      <CardHeader eyebrow="Genesis" />
      <div className="relative z-10 mt-10 flex flex-1 flex-col justify-center">
        <p className="label-tag mb-3 text-mist-500">First onchain activity</p>
        <h3 className="font-display text-2xl font-semibold leading-snug text-mist-100">
          {journey.firstActivity.label}
        </h3>
        <div className="mt-6 space-y-2 text-sm text-mist-300">
          <p>{journey.firstActivity.dateDisplay}</p>
          <p className="flex items-center gap-2">
            <span
              className="h-1.5 w-1.5 rounded-full"
              style={{ backgroundColor: journey.firstActivity.chainColor }}
            />
            {journey.firstActivity.chainName}
          </p>
        </div>
        <div className="mt-8 inline-flex w-fit items-center gap-2 rounded-full border border-white/10 bg-white/[0.05] px-3 py-1.5 text-xs text-mist-500">
          Wallet age: {journey.walletAgeDisplay}
        </div>
      </div>
      <CardFooter addressDisplay={journey.addressDisplay} />
    </CardChrome>
  </div>
))
GenesisCard.displayName = 'GenesisCard'

const TimelineCard = forwardRef(({ journey }, ref) => (
  <div ref={ref}>
    <CardChrome gradientFrom="#132A3D" gradientTo="#1E1B4A">
      <CardHeader eyebrow="Timeline" />
      <div className="relative z-10 mt-6 flex-1">
        <p className="label-tag mb-4 text-mist-500">Milestone timeline</p>
        <div className="space-y-3.5">
          {journey.milestones.map((m) => (
            <div key={m.id} className="flex items-center gap-3">
              <span
                className="h-2 w-2 shrink-0 rounded-full"
                style={{ backgroundColor: m.chainColor }}
              />
              <span className="flex-1 text-[13px] text-mist-300">{m.label.replace('First ', '')}</span>
              <span className="font-mono text-[13px] text-mist-100">{m.dateDisplay}</span>
            </div>
          ))}
        </div>
      </div>
      <CardFooter addressDisplay={journey.addressDisplay} />
    </CardChrome>
  </div>
))
TimelineCard.displayName = 'TimelineCard'

const AchievementCard = forwardRef(({ journey }, ref) => (
  <div ref={ref}>
    <CardChrome gradientFrom="#2A1B4A" gradientTo="#12203D">
      <CardHeader eyebrow="Achievement" />
      <div className="relative z-10 mt-6 flex flex-1 flex-col items-center justify-center text-center">
        <div className="relative flex h-28 w-28 items-center justify-center rounded-full border border-signal-violet/40 bg-signal-violet/10">
          <span className="font-display text-4xl font-semibold text-mist-100">{journey.ogScore}</span>
        </div>
        <p className="mt-3 text-sm text-mist-500">{journey.ogTier.label} tier</p>

        <div className="mt-6 flex flex-wrap justify-center gap-2">
          {journey.personalities.map((p) => (
            <span
              key={p.id}
              className="flex items-center gap-1 rounded-full border border-white/10 bg-white/[0.05] px-3 py-1 text-xs text-mist-100"
            >
              <Sparkles size={11} className="text-signal-gold" />
              {p.name}
            </span>
          ))}
        </div>
      </div>
      <CardFooter addressDisplay={journey.addressDisplay} />
    </CardChrome>
  </div>
))
AchievementCard.displayName = 'AchievementCard'

const CompleteJourneyCard = forwardRef(({ journey }, ref) => (
  <div ref={ref}>
    <CardChrome gradientFrom="#1B2550" gradientTo="#2A1B4A">
      <CardHeader eyebrow="Complete Journey" />
      <div className="relative z-10 mt-6 flex-1">
        <h3 className="font-display text-xl font-semibold text-mist-100">{journey.addressDisplay}</h3>
        <p className="mt-1 text-xs text-mist-500">
          {journey.walletAgeDisplay} old · {journey.era.name}
        </p>

        <div className="mt-6 grid grid-cols-2 gap-3">
          <div className="rounded-xl border border-white/[0.08] bg-white/[0.03] p-3">
            <p className="label-tag text-mist-500">OG Score</p>
            <p className="mt-1 font-display text-xl font-semibold text-mist-100">{journey.ogScore}</p>
          </div>
          <div className="rounded-xl border border-white/[0.08] bg-white/[0.03] p-3">
            <p className="label-tag text-mist-500">Chains active</p>
            <p className="mt-1 font-display text-xl font-semibold text-mist-100">{journey.activeChains.length}</p>
          </div>
          <div className="rounded-xl border border-white/[0.08] bg-white/[0.03] p-3">
            <p className="label-tag text-mist-500">Milestones</p>
            <p className="mt-1 font-display text-xl font-semibold text-mist-100">{journey.milestones.length}</p>
          </div>
          <div className="rounded-xl border border-white/[0.08] bg-white/[0.03] p-3">
            <p className="label-tag text-mist-500">Personality</p>
            <p className="mt-1 truncate text-sm font-medium text-mist-100">{journey.personalities[0]?.name}</p>
          </div>
        </div>
      </div>
      <CardFooter addressDisplay={journey.addressDisplay} />
    </CardChrome>
  </div>
))
CompleteJourneyCard.displayName = 'CompleteJourneyCard'

const VARIANTS = {
  genesis: GenesisCard,
  timeline: TimelineCard,
  achievement: AchievementCard,
  complete: CompleteJourneyCard,
}

const JourneyCard = forwardRef(({ variant, journey }, ref) => {
  const Component = VARIANTS[variant] || GenesisCard
  return <Component journey={journey} ref={ref} />
})
JourneyCard.displayName = 'JourneyCard'

export default JourneyCard

export const CARD_VARIANTS = [
  { id: 'genesis', name: 'Genesis Card', description: 'Your very first onchain activity.' },
  { id: 'timeline', name: 'Timeline Card', description: 'Every milestone, mapped by date.' },
  { id: 'achievement', name: 'Achievement Card', description: 'OG score and wallet personality.' },
  { id: 'complete', name: 'Complete Journey Card', description: 'The full journey in one card.' },
]
