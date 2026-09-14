// journeyGenerator.js
// Converts a raw wallet profile (from dataSource.js) into the structured
// view model the dashboard and cards render from: formatted dates, wallet
// age copy, and the OG score calculation.

import { getChainById } from './mockData.js'

function formatWalletAge(days) {
  const years = Math.floor(days / 365)
  const months = Math.floor((days % 365) / 30)

  if (years >= 1) {
    return months > 0 ? `${years} yr ${months} mo` : `${years} yr`
  }
  if (months >= 1) {
    return `${months} mo`
  }
  return `${days} days`
}

function formatDisplayDate(isoDate) {
  const d = new Date(isoDate)
  return d.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
}

function shortenAddress(address) {
  return `${address.slice(0, 6)}...${address.slice(-4)}`
}

function shortenTxHash(hash) {
  return `${hash.slice(0, 10)}...${hash.slice(-6)}`
}

// --- OG Score --------------------------------------------------------------
// A 0 to 100 composite score built from three weighted factors:
//   - Wallet age (40%): older wallets score higher, capped at four years.
//   - Activity history (35%): transaction count and protocol diversity.
//   - Milestones reached (25%): how many value milestones were hit and how
//     many chains were touched along the way.

function computeOgScore(profile) {
  const ageYears = profile.walletAgeDays / 365
  const ageScore = Math.min(ageYears / 4, 1) * 40

  const txScore = Math.min(profile.stats.totalTransactions / 2000, 1) * 20
  const protocolScore = Math.min(profile.stats.uniqueProtocols / 40, 1) * 15
  const activityScore = txScore + protocolScore

  const milestoneScore = (profile.milestones.length / 5) * 15
  const chainScore = Math.min(profile.activeChains.length / 5, 1) * 10
  const milestoneComposite = milestoneScore + chainScore

  const total = ageScore + activityScore + milestoneComposite
  return Math.round(Math.min(Math.max(total, 4), 99))
}

function ogScoreTier(score) {
  if (score >= 85) return { label: 'Legendary', description: 'Top tier wallet history across age, activity, and reach.' }
  if (score >= 65) return { label: 'Veteran', description: 'Well established wallet with a consistent onchain record.' }
  if (score >= 40) return { label: 'Established', description: 'A steady, developing onchain presence.' }
  return { label: 'Emerging', description: 'A newer wallet still building its onchain history.' }
}

export function generateJourney(profile) {
  const chain = getChainById(profile.firstActivity.chain)

  const firstActivity = {
    ...profile.firstActivity,
    dateDisplay: formatDisplayDate(profile.firstActivity.date),
    chainName: chain.name,
    chainColor: chain.color,
    txHashDisplay: shortenTxHash(profile.firstActivity.txHash),
  }

  const milestones = profile.milestones.map((m) => {
    const milestoneChain = getChainById(m.chain)
    return {
      ...m,
      dateDisplay: formatDisplayDate(m.date),
      chainName: milestoneChain.name,
      chainColor: milestoneChain.color,
      txHashDisplay: shortenTxHash(m.txHash),
      amountDisplay: `$${m.amountUsd.toLocaleString(undefined, { maximumFractionDigits: 2 })}`,
    }
  })

  const ogScore = computeOgScore(profile)
  const tier = ogScoreTier(ogScore)

  return {
    address: profile.address,
    addressDisplay: shortenAddress(profile.address),
    walletAgeDays: profile.walletAgeDays,
    walletAgeDisplay: formatWalletAge(profile.walletAgeDays),
    firstActivity,
    milestones,
    personalities: profile.personalities,
    era: profile.era,
    activeChains: profile.activeChains,
    stats: profile.stats,
    ogScore,
    ogTier: tier,
  }
}
