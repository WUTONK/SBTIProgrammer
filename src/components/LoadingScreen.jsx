import { useEffect, useState } from 'react'
import { calculateResult } from '../utils/calculateResult.js'

export default function LoadingScreen({ answers, onComplete }) {
  const [progress, setProgress] = useState(0)
  const [currentStatus, setCurrentStatus] = useState('ANALYZING CODE SMELLS...')

  const statusList = [
    'ANALYZING CODE SMELLS...',
    'COMPILING PERSONALITY TRAITS...',
    'PARSING GITHUB COMMITS...',
    'RESOLVING MERGE CONFLICTS...',
    'GENERATING DEVELOPER ARCHETYPE...'
  ]

  useEffect(() => {
    // 模拟计算过程
    let currentProgress = 0
    const progressTimer = setInterval(() => {
      currentProgress += Math.floor(Math.random() * 15) + 5
      if (currentProgress >= 100) {
        currentProgress = 100
        clearInterval(progressTimer)
        
        // 计算真实结果
        setTimeout(() => {
          const result = calculateResult(answers)
          onComplete(result)
        }, 500)
      }
      setProgress(currentProgress)
      
      // 更新状态文本
      const statusIndex = Math.min(
        Math.floor((currentProgress / 100) * statusList.length),
        statusList.length - 1
      )
      setCurrentStatus(statusList[statusIndex])
    }, 300)

    return () => clearInterval(progressTimer)
  }, [answers, onComplete])

  return (
    <div className="flex-1 flex flex-col items-center justify-center px-4 py-8">
      <div className="max-w-md w-full text-center retro-card p-8">
        <div className="mb-8">
          <div className="text-4xl md:text-6xl text-[var(--color-primary)] mb-4 animate-pulse glow-text">
            {/* 终端加载动画 */}
            <span className="inline-block animate-spin">/</span>
            <span className="inline-block animate-spin delay-75">-</span>
            <span className="inline-block animate-spin delay-150">\</span>
            <span className="inline-block animate-spin delay-300">|</span>
          </div>
          <h2 className="text-2xl font-bold text-[var(--color-primary)] mb-2 uppercase tracking-widest glow-text">
            SYSTEM PROCESSING
          </h2>
          <p className="text-[var(--color-accent-cyan)] h-6 text-sm uppercase tracking-wider">
            {'>'} {currentStatus} <span className="animate-blink">_</span>
          </p>
        </div>

        {/* 进度条 */}
        <div className="w-full bg-[var(--color-bg-dark)] border-2 border-[var(--color-primary)] h-6 p-[2px] mb-4">
          <div
            className="bg-[var(--color-primary)] h-full transition-all duration-300 ease-out shadow-[0_0_10px_rgba(255,153,0,0.8)]"
            style={{ width: `${progress}%` }}
          />
        </div>
        
        {/* 进度数字 */}
        <div className="text-3xl font-bold text-[var(--color-primary)] glow-text">
          {progress}%
        </div>
      </div>
    </div>
  )
}
