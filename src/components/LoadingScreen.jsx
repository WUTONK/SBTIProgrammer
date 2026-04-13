import { useEffect, useState } from 'react'
import { calculateResult } from '../utils/calculateResult.js'

export default function LoadingScreen({ answers, onComplete }) {
  const [progress, setProgress] = useState(0)
  const [currentStatus, setCurrentStatus] = useState('BOOTING ANALYZER...')

  const statusList = [
    'ANALYZING CODE SMELLS...',
    'COMPILING PERSONALITY TRAITS...',
    'PARSING GITHUB COMMITS...',
    'RESOLVING MERGE CONFLICTS...',
    'GENERATING DEVELOPER ARCHETYPE...'
  ]

  useEffect(() => {
    let currentProgress = 0
    const progressTimer = setInterval(() => {
      currentProgress += Math.floor(Math.random() * 8) + 2
      if (currentProgress >= 100) {
        currentProgress = 100
        clearInterval(progressTimer)
        setTimeout(() => {
          const result = calculateResult(answers)
          onComplete(result)
        }, 500)
      }
      setProgress(currentProgress)
      
      const statusIndex = Math.min(
        Math.floor((currentProgress / 100) * statusList.length),
        statusList.length - 1
      )
      setCurrentStatus(statusList[statusIndex])
    }, 200)

    return () => clearInterval(progressTimer)
  }, [answers, onComplete])

  return (
    <div className="flex-1 flex flex-col items-center justify-center px-4 py-8">
      {/* 恢复经典正方形卡片布局 */}
      <div className="max-w-md w-full text-center retro-card p-8 md:p-12 animate-fade-in shadow-[0_0_30px_rgba(255,153,0,0.2)]">
        <div className="mb-10">
          <div className="text-5xl md:text-7xl text-[var(--color-primary)] mb-6 glow-text font-mono flex justify-center gap-3">
             {['/', '-', '\\', '|'].map((char, i) => (
               <span key={i} className="animate-spin" style={{ animationDuration: '0.8s', animationDelay: `${i * 0.2}s` }}>{char}</span>
             ))}
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-[var(--color-primary)] mb-4 tracking-tighter uppercase glow-text">
            ANALYZER ACTIVE
          </h2>
          <div className="text-[var(--color-accent-cyan)] text-sm uppercase h-6 tracking-widest font-bold">
            {'>'} {currentStatus} <span className="animate-blink">_</span>
          </div>
        </div>

        {/* 进度条 */}
        <div className="w-full bg-black border-2 border-[var(--color-primary)] h-8 p-1 mb-6 relative">
          <div
            className="bg-[var(--color-primary)] h-full transition-all duration-300 shadow-[0_0_20px_var(--color-primary)]"
            style={{ width: `${progress}%` }}
          />
          <div className="absolute inset-0 flex items-center justify-center text-sm font-bold mix-blend-difference text-white font-mono">
            {progress}%
          </div>
        </div>
        
        <div className="text-[var(--color-text-muted)] text-[10px] uppercase tracking-[0.2em] opacity-50">
          Neural Processing in Progress
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
        .animate-fade-in {
          animation: fade-in 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
        }
      `}</style>
    </div>
  )
}
