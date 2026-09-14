import { useState } from 'react'
import { Download, Check, Loader2 } from 'lucide-react'
import { exportNodeToPng } from '../lib/cardGenerator.js'

export default function DownloadButton({ targetRef, filename, label = 'Download PNG' }) {
  const [status, setStatus] = useState('idle') // idle | working | done

  async function handleDownload() {
    if (status === 'working') return
    setStatus('working')
    try {
      await exportNodeToPng(targetRef.current, filename)
      setStatus('done')
      setTimeout(() => setStatus('idle'), 1800)
    } catch (err) {
      console.error(err)
      setStatus('idle')
    }
  }

  return (
    <button
      onClick={handleDownload}
      className="btn-secondary min-w-[176px]"
      disabled={status === 'working'}
    >
      {status === 'working' && <Loader2 size={15} className="animate-spin" />}
      {status === 'done' && <Check size={15} className="text-signal-mint" />}
      {status === 'idle' && <Download size={15} />}
      {status === 'done' ? 'Saved' : label}
    </button>
  )
}
