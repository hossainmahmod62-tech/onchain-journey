import { Share2 } from 'lucide-react'
import { buildShareUrl } from '../lib/cardGenerator.js'

export default function ShareButton({ journey, label = 'Share on X' }) {
  function handleShare() {
    const url = buildShareUrl(journey)
    window.open(url, '_blank', 'noopener,noreferrer')
  }

  return (
    <button onClick={handleShare} className="btn-primary">
      <Share2 size={15} />
      {label}
    </button>
  )
}
