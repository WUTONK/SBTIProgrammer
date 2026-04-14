import { useEffect, useState, useRef } from 'react'
import { calculateResult } from '../utils/calculateResult.js'

const SPINNER_CHARS = ['/', '-', '\\', '|']

export default function LoadingScreen({ answers, onComplete }) {
  const [progress, setProgress] = useState(0)
  const [currentStatus, setCurrentStatus] = useState('BOOTING ANALYZER...')
  const spinnerRef = useRef(null)

  const statusList = [
    'ANALYZING CODE SMELLS...',
    'COMPILING PERSONALITY TRAITS...',
    'PARSING GITHUB COMMITS...',
    'RESOLVING MERGE CONFLICTS...',
    'GENERATING DEVELOPER ARCHETYPE...'
  ]

  useEffect(() => {
    const totalTime = 5000
    const intervalTime = 100
    const steps = totalTime / intervalTime
    const increment = 100 / steps

    let currentProgress = 0
    const progressTimer = setInterval(() => {
      currentProgress += increment
      if (currentProgress >= 100) {
        currentProgress = 100
        clearInterval(progressTimer)
        setTimeout(() => {
          const result = calculateResult(answers)
          onComplete(result)
        }, 500)
      }
      setProgress(Math.floor(currentProgress))

      const statusIndex = Math.min(
        Math.floor((currentProgress / 100) * statusList.length),
        statusList.length - 1
      )
      setCurrentStatus(statusList[statusIndex])
    }, intervalTime)

    return () => clearInterval(progressTimer)
  }, [answers, onComplete])

  useEffect(() => {
    let idx = 0
    const timer = setInterval(() => {
      idx = (idx + 1) % 4
      if (spinnerRef.current) spinnerRef.current.textContent = SPINNER_CHARS[idx]
    }, 150)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="flex-1 flex flex-col w-full h-full overflow-hidden">
      <div className="fixed inset-0 flex items-center justify-center px-4 z-[100] pointer-events-none">
        <div className="max-w-md w-full text-center retro-card p-8 md:p-12 bg-[var(--color-bg-card)] shadow-[0_0_50px_rgba(255,153,0,0.3)] overflow-hidden pointer-events-auto">

          {/* 移除顶部密封线 */}

          <div className="mb-10">
            <div ref={spinnerRef} className="text-7xl text-[var(--color-primary)] mb-6 glow-text font-mono h-20 flex items-center justify-center">
              /
            </div>
            <h2 className="text-2xl font-bold text-[var(--color-primary)] mb-4 tracking-widest uppercase glow-text">
              CORE_ANALYZER_ACTIVE
            </h2>
            <div className="text-[var(--color-accent-cyan)] text-sm uppercase tracking-widest font-bold h-6 flex items-center justify-center">
              {'>'} {currentStatus} <span className="animate-blink">_</span>
            </div>
          </div>

          <div className="w-full bg-black border-2 border-[var(--color-primary)] h-8 p-1 relative">
            <div
              className="bg-[var(--color-primary)] h-full transition-all duration-300 shadow-[0_0_20px_var(--color-primary)]"
              style={{ width: `${progress}%` }}
            />
            <div className="absolute inset-0 flex items-center justify-center text-sm font-bold mix-blend-difference text-white font-mono">
              {progress.toString().padStart(3, '0')}%
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
