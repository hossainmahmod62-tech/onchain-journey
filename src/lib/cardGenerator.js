// cardGenerator.js
// Handles turning a rendered card DOM node into a downloadable PNG, and
// builds the share text used for the X share intent.

import { toPng } from 'html-to-image'

export async function exportNodeToPng(node, filename = 'onchain-journey-card.png') {
  if (!node) throw new Error('No card element to export.')

  const dataUrl = await toPng(node, {
    cacheBust: true,
    pixelRatio: 2,
    backgroundColor: '#05070D',
  })

  const link = document.createElement('a')
  link.download = filename
  link.href = dataUrl
  link.click()

  return dataUrl
}

export function buildShareText(journey, siteUrl = window.location.origin) {
  return [
    'I discovered my onchain journey.',
    '',
    'Every wallet has a story.',
    '',
    `Discover yours:`,
    siteUrl,
  ].join('\n')
}

export function buildShareUrl(journey, siteUrl) {
  const text = buildShareText(journey, siteUrl)
  const params = new URLSearchParams({ text })
  return `https://twitter.com/intent/tweet?${params.toString()}`
}
