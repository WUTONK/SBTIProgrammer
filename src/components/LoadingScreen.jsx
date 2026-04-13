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
    const totalTime = 5000 // 5 seconds
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

  // 优化后的 Spinner：单个字符循环
  const [spinnerIndex, setSpinnerIndex] = useState(0)
  useEffect(() => {
    const timer = setInterval(() => {
      setSpinnerIndex(prev => (prev + 1) % 4)
    }, 150)
    return () => clearInterval(timer)
  }, [])

  const spinnerChars = ['/', '-', '\\', '|']

  return (
    <div className="flex-1 flex flex-col items-center justify-center px-4 relative overflow-hidden">
      {/* 核心终端卡片：与 Quiz 中的 Mock 终端完全一致 */}
      <div className="max-w-md w-full text-center retro-card p-8 md:p-12 bg-[var(--color-bg-card)] shadow-[0_0_50px_rgba(255,153,0,0.3)] relative z-10">
        {/* 已经关闭的缝隙 (与 Quiz 中的状态衔接) - 宽度调整为 340px */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[340px] h-10 overflow-hidden -translate-y-[2px]">
          {/* 快门已经完全落下 */}
          <div className="absolute inset-0 bg-gradient-to-b from-[var(--color-primary)] to-transparent opacity-40"></div>
          {/* 密封线 */}
          <div className="w-full h-1 bg-[var(--color-primary)] absolute bottom-0 shadow-[0_0_15px_var(--color-primary)]"></div>
        </div>
        <div className="mb-10">
          <div className="text-7xl text-[var(--color-primary)] mb-6 glow-text font-mono h-20 flex items-center justify-center">
             {spinnerChars[spinnerIndex]}
          </div>
          <h2 className="text-2xl font-bold text-[var(--color-primary)] mb-4 tracking-widest uppercase glow-text">
            CORE_ANALYZER_ACTIVE
          </h2>
          <div className="text-[var(--color-accent-cyan)] text-sm uppercase h-6 tracking-widest font-bold">
            {'>'} {currentStatus} <span className="animate-blink">_</span>
          </div>
        </div>


        {/* 进度条 */}
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
  )
}
