// dataSource.js
// This is the single seam between the UI and blockchain data.
//
// Today it resolves to the deterministic mock provider. Later, each chain
// can be pointed at a real indexer (Etherscan family, Alchemy, Covalent,
// The Graph, etc.) without touching any component. Components only ever
// call `fetchWalletProfile(address)` from this file.

import { buildMockProfile, CHAINS } from './mockData.js'

// --- Provider interface ---------------------------------------------------
// A provider must resolve to the same shape produced by buildMockProfile:
// { address, walletAgeDays, firstActivity, milestones, personalities, era,
//   activeChains, stats }

const providers = {
  mock: {
    id: 'mock',
    label: 'Deterministic mock data',
    async fetchProfile(address) {
      // Simulated latency so the loading experience feels real even
      // though everything happens client-side.
      await wait(400)
      return buildMockProfile(address)
    },
  },

  // Placeholder for a future live provider. Each chain in CHAINS would
  // get its own client (etherscanClient, basescanClient, etc.) and the
  // results would be merged into the same profile shape the UI expects.
  live: {
    id: 'live',
    label: 'Live onchain data',
    async fetchProfile(address) {
      throw new Error(
        'Live provider is not configured yet. Set VITE_DATA_SOURCE=mock or implement chain clients in lib/dataSource.js.'
      )
    },
  },
}

function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

function isValidEvmAddress(address) {
  return typeof address === 'string' && /^0x[a-fA-F0-9]{40}$/.test(address.trim())
}

function activeProviderId() {
  const configured = import.meta.env?.VITE_DATA_SOURCE
  return configured && providers[configured] ? configured : 'mock'
}

export function getSupportedChains() {
  return CHAINS
}

export function validateAddress(address) {
  if (!address || !address.trim()) {
    return { valid: false, error: 'Enter a wallet address to continue.' }
  }
  if (!isValidEvmAddress(address.trim())) {
    return { valid: false, error: 'That does not look like a valid EVM address.' }
  }
  return { valid: true, error: null }
}

export async function fetchWalletProfile(address) {
  const validation = validateAddress(address)
  if (!validation.valid) {
    throw new Error(validation.error)
  }

  const provider = providers[activeProviderId()]
  return provider.fetchProfile(address.trim())
}

export function currentProviderLabel() {
  return providers[activeProviderId()].label
}
