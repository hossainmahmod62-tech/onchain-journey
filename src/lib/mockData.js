// mockData.js
// Deterministic mock blockchain data. Every value is derived from the wallet
// address itself, so the same address always produces the same journey.
// This file has no knowledge of any real chain API. When a real data source
// is wired in (see dataSource.js), this file can remain as the offline
// fallback / demo mode.

export const CHAINS = [
  { id: 'ethereum', name: 'Ethereum', symbol: 'ETH', color: '#7B92F0' },
  { id: 'bnb', name: 'BNB Chain', symbol: 'BNB', color: '#E8B95F' },
  { id: 'base', name: 'Base', symbol: 'ETH', color: '#4C6FFF' },
  { id: 'arbitrum', name: 'Arbitrum', symbol: 'ETH', color: '#5BC3E8' },
  { id: 'polygon', name: 'Polygon', symbol: 'MATIC', color: '#9B5BFF' },
]

export const PERSONALITIES = [
  {
    id: 'early-builder',
    name: 'Early Builder',
    description: 'Active on new protocols before most wallets ever noticed them.',
  },
  {
    id: 'diamond-holder',
    name: 'Diamond Holder',
    description: 'Holds through volatility instead of chasing every price swing.',
  },
  {
    id: 'airdrop-hunter',
    name: 'Airdrop Hunter',
    description: 'Consistently qualifies for new protocol distributions.',
  },
  {
    id: 'defi-explorer',
    name: 'DeFi Explorer',
    description: 'Regularly moves capital across lending, swaps, and yield protocols.',
  },
  {
    id: 'nft-collector',
    name: 'NFT Collector',
    description: 'Builds a curated collection across multiple marketplaces.',
  },
  {
    id: 'multi-chain-native',
    name: 'Multi Chain Native',
    description: 'Operates comfortably across five or more networks.',
  },
]

export const ERAS = [
  {
    id: 'defi-era',
    name: 'DeFi Era',
    range: '2020 to 2021',
    description: 'First onchain activity aligned with the rise of decentralized finance.',
  },
  {
    id: 'nft-era',
    name: 'NFT Era',
    range: '2021 to 2022',
    description: 'First onchain activity aligned with the NFT market expansion.',
  },
  {
    id: 'multi-chain-era',
    name: 'Multi Chain Era',
    range: '2022 to 2023',
    description: 'First onchain activity aligned with the growth of layer 2 networks.',
  },
  {
    id: 'restaking-era',
    name: 'Restaking Era',
    range: '2023 to 2024',
    description: 'First onchain activity aligned with the restaking and modular chain cycle.',
  },
  {
    id: 'onchain-ai-era',
    name: 'Onchain AI Era',
    range: '2024 to 2025',
    description: 'First onchain activity aligned with the intersection of AI and crypto.',
  },
]

const MILESTONE_THRESHOLDS = [2, 10, 100, 1000, 10000]

// --- Deterministic PRNG -----------------------------------------------
// A wallet address always seeds the same sequence of pseudo-random values,
// so results are stable across reloads and shares without needing a backend.

function hashString(str) {
  let h1 = 0xdeadbeef ^ str.length
  let h2 = 0x41c6ce57 ^ str.length
  for (let i = 0; i < str.length; i++) {
    const ch = str.charCodeAt(i)
    h1 = Math.imul(h1 ^ ch, 2654435761)
    h2 = Math.imul(h2 ^ ch, 1597334677)
  }
  h1 = Math.imul(h1 ^ (h1 >>> 16), 2246822507)
  h1 ^= Math.imul(h2 ^ (h2 >>> 13), 3266489909)
  h2 = Math.imul(h2 ^ (h2 >>> 16), 2246822507)
  h2 ^= Math.imul(h1 ^ (h1 >>> 13), 3266489909)
  return 4294967296 * (2097151 & h2) + (h1 >>> 0)
}

function mulberry32(seed) {
  let a = seed >>> 0
  return function () {
    a |= 0
    a = (a + 0x6d2b79f5) | 0
    let t = Math.imul(a ^ (a >>> 15), 1 | a)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

export function createRng(address) {
  const seed = hashString(address.toLowerCase()) % 2147483647
  return mulberry32(seed)
}

function pick(rng, arr) {
  return arr[Math.floor(rng() * arr.length)]
}

function randomInRange(rng, min, max) {
  return min + rng() * (max - min)
}

function randomTxHash(rng) {
  const chars = 'abcdef0123456789'
  let hash = '0x'
  for (let i = 0; i < 64; i++) {
    hash += chars[Math.floor(rng() * chars.length)]
  }
  return hash
}

function addDays(date, days) {
  const d = new Date(date)
  d.setDate(d.getDate() + days)
  return d
}

function formatDate(date) {
  return date.toISOString().slice(0, 10)
}

// --- Core deterministic wallet profile ----------------------------------

export function buildMockProfile(address) {
  const rng = createRng(address)

  const today = new Date()
  const walletAgeDays = Math.floor(randomInRange(rng, 220, 2100))
  const firstActivityDate = addDays(today, -walletAgeDays)

  const firstActivityChain = pick(rng, CHAINS)
  const firstActivityTypes = [
    'Received first transfer',
    'Bridged funds onto the network',
    'Swapped on a decentralized exchange',
    'Minted a genesis NFT',
    'Deployed a first contract interaction',
  ]

  const firstActivity = {
    label: pick(rng, firstActivityTypes),
    date: formatDate(firstActivityDate),
    chain: firstActivityChain.id,
    txHash: randomTxHash(rng),
  }

  // Milestones are spaced out after the first activity, each on a
  // plausibly later date and a randomly assigned supported chain.
  let cursor = firstActivityDate
  const milestones = MILESTONE_THRESHOLDS.map((threshold, index) => {
    const gap = Math.floor(randomInRange(rng, 3, 140)) + index * 5
    cursor = addDays(cursor, gap)
    if (cursor > today) cursor = addDays(today, -Math.floor(randomInRange(rng, 0, 20)))
    const chain = pick(rng, CHAINS)
    const overshoot = 1 + rng() * 0.4
    return {
      id: `milestone-${threshold}`,
      threshold,
      label: `First $${threshold.toLocaleString()} Received`,
      amountUsd: Math.round(threshold * overshoot * 100) / 100,
      date: formatDate(cursor),
      chain: chain.id,
      txHash: randomTxHash(rng),
    }
  })

  const personalityCount = 1 + Math.floor(rng() * 2)
  const shuffledPersonalities = [...PERSONALITIES].sort(() => rng() - 0.5)
  const personalities = shuffledPersonalities.slice(0, personalityCount)

  const era = pick(rng, ERAS)

  const activeChainCount = 1 + Math.floor(randomInRange(rng, 1, CHAINS.length))
  const activeChains = [...CHAINS].sort(() => rng() - 0.5).slice(0, activeChainCount)

  const totalTransactions = Math.floor(randomInRange(rng, 12, 4200))
  const uniqueProtocols = Math.floor(randomInRange(rng, 2, 68))
  const nftsHeld = Math.floor(randomInRange(rng, 0, 140))

  return {
    address,
    walletAgeDays,
    firstActivity,
    milestones,
    personalities,
    era,
    activeChains,
    stats: {
      totalTransactions,
      uniqueProtocols,
      nftsHeld,
      chainCount: activeChains.length,
    },
  }
}

export function getChainById(id) {
  return CHAINS.find((c) => c.id === id) || CHAINS[0]
}
