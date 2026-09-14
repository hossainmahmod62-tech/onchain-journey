import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, ClipboardPaste, AlertCircle } from 'lucide-react'
import { validateAddress } from '../lib/dataSource.js'

export default function WalletInput({ onSubmit, isBusy }) {
  const [value, setValue] = useState('')
  const [error, setError] = useState(null)

  async function handlePaste() {
    try {
      const text = await navigator.clipboard.readText()
      setValue(text.trim())
      setError(null)
    } catch {
      // Clipboard access can be blocked by the browser; the user can
      // still paste manually, so we simply do nothing here.
    }
  }

  function handleSubmit(e) {
    e.preventDefault()
    const result = validateAddress(value)
    if (!result.valid) {
      setError(result.error)
      return
    }
    setError(null)
    onSubmit(value.trim())
  }

  return (
    <div className="w-full">
      <form onSubmit={handleSubmit} className="glass-panel flex w-full flex-col gap-3 rounded-2xl p-2.5 sm:flex-row sm:items-center sm:gap-2">
        <div className="flex flex-1 items-center gap-3 px-3 py-2.5 sm:py-2">
          <input
            type="text"
            inputMode="text"
            autoComplete="off"
            spellCheck="false"
            value={value}
            onChange={(e) => {
              setValue(e.target.value)
              if (error) setError(null)
            }}
            placeholder="Paste your wallet address"
            className="w-full bg-transparent font-mono text-sm text-mist-100 placeholder:font-body placeholder:text-mist-500 focus:outline-none sm:text-[15px]"
          />
          <button
            type="button"
            onClick={handlePaste}
            className="shrink-0 rounded-full p-2 text-mist-500 transition-colors hover:bg-white/[0.06] hover:text-mist-100"
            aria-label="Paste from clipboard"
          >
            <ClipboardPaste size={16} />
          </button>
        </div>

        <button type="submit" disabled={isBusy} className="btn-primary w-full shrink-0 sm:w-auto">
          Analyze My Journey
          <ArrowRight size={16} strokeWidth={2.3} />
        </button>
      </form>

      {error && (
        <motion.p
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-3 flex items-center gap-1.5 pl-2 text-sm text-rose-300"
        >
          <AlertCircle size={14} />
          {error}
        </motion.p>
      )}
    </div>
  )
}
