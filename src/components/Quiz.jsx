import { useState, useRef, useCallback, useEffect } from 'react'
import { questions } from '../data/questions.js'
import PunchedTape from './PunchedTape.jsx'

const SPINNER_CHARS = ['·', '··', '···', '····']

export default function Quiz({ onComplete, currentIndex, setCurrentIndex, answers, setAnswers }) {
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [isFinishing, setIsFinishing] = useState(false)
  const [showTerminal, setShowTerminal] = useState(false)
  // idle → shake → falling → scanning
  const [phase, setPhase] = useState('idle')
  const [analysisProgress, setAnalysisProgress] = useState(0)

  const spinnerRef = useRef(null)
  const spinnerTimerRef = useRef(null)
  const tapeBodyRef = useRef(null)
  const terminalCardRef = useRef(null)
  const rafRef = useRef(null)
  const finalAnswersRef = useRef(null)

  useEffect(() => {
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
      if (spinnerTimerRef.current) clearInterval(spinnerTimerRef.current)
    }
  }, [])

  const currentQuestion = questions[currentIndex]
  const progressPercentage = Math.round((currentIndex / questions.length) * 100)

  const handleJump = (index) => {
    if (isTransitioning || isFinishing) return
    setIsTransitioning(true)
    setTimeout(() => {
      setCurrentIndex(index)
      setIsTransitioning(false)
    }, 300)
  }

  const handlePrev = () => {
    if (currentIndex > 0 && !isTransitioning && !isFinishing) {
      setIsTransitioning(true)
      setTimeout(() => {
        setCurrentIndex(currentIndex - 1)
        setIsTransitioning(false)
      }, 300)
    }
  }

  const handleNext = () => {
    if (isTransitioning || isFinishing) return
    if (currentIndex + 1 < questions.length) {
      setIsTransitioning(true)
      setTimeout(() => {
        setCurrentIndex(currentIndex + 1)
        setIsTransitioning(false)
      }, 300)
    } else {
      triggerFinishSequence()
    }
  }

  const handleSelect = (option) => {
    if (isTransitioning || isFinishing) return
    const newAnswers = [...answers]
    newAnswers[currentIndex] = option
    setAnswers(newAnswers)

    setIsTransitioning(true)
    setTimeout(() => {
      if (currentIndex + 1 < questions.length) {
        setCurrentIndex(currentIndex + 1)
        setIsTransitioning(false)
      } else {
        triggerFinishSequence(newAnswers)
      }
    }, 300)
  }

  const startAnalysis = useCallback(() => {
    setPhase('scanning')
    let start = null
    const duration = 1500

    const animate = (timestamp) => {
      if (!start) start = timestamp
      const progress = timestamp - start
      const percentage = Math.min((progress / duration) * 100, 100)
      setAnalysisProgress(percentage)

      if (percentage < 100) {
        rafRef.current = requestAnimationFrame(animate)
      } else {
        setTimeout(() => onComplete(finalAnswersRef.current), 500)
      }
    }
    rafRef.current = requestAnimationFrame(animate)
  }, [onComplete])

  const startFallAnimation = useCallback(() => {
    const tapeEl = tapeBodyRef.current
    const cardEl = terminalCardRef.current

    if (!tapeEl || !cardEl) {
      onComplete(finalAnswersRef.current)
      return
    }

    const tapeRect = tapeEl.getBoundingClientRect()
    const cardRect = cardEl.getBoundingClientRect()
    // 纸带掉落到卡片中心位置并消失
    const fallDistance = cardRect.top - tapeRect.top + 100

    setPhase('falling')

    const fallAnim = tapeEl.animate([
      { transform: 'translateY(0)', opacity: 1 },
      { transform: `translateY(${fallDistance}px)`, opacity: 0 }
    ], {
      duration: 1000,
      easing: 'cubic-bezier(0.5, 0, 0.7, 1)',
      fill: 'forwards'
    })

    fallAnim.onfinish = () => {
      startAnalysis()
    }
  }, [onComplete, startAnalysis])

  const triggerFinishSequence = useCallback((finalAnswers) => {
    finalAnswersRef.current = finalAnswers || answers

    let idx = 0
    spinnerTimerRef.current = setInterval(() => {
      idx = (idx + 1) % 4
      if (spinnerRef.current) spinnerRef.current.textContent = SPINNER_CHARS[idx]
    }, 120)

    setPhase('shake')
    setIsFinishing(true)

    setTimeout(() => {
      setShowTerminal(true)
      setTimeout(startFallAnimation, 800)
    }, 600)
  }, [answers, startFallAnimation])

  const isShaking = phase === 'shake'
  const isFalling = phase === 'falling' || phase === 'scanning'

  return (
    <div className="flex-1 flex flex-col w-full h-full overflow-hidden relative">
      {/* 顶部纸带区域 */}
      <div className={`flex-none pt-4 flex justify-center z-[60] ${isFalling ? 'pointer-events-none' : ''}`}>
        <PunchedTape
          currentIndex={currentIndex}
          answers={answers}
          totalQuestions={questions.length}
          onJump={handleJump}
          tapeBodyRef={tapeBodyRef}
          isShaking={isShaking}
          isFalling={isFalling}
        />
      </div>

      {/* 题目区域 */}
      <div className="flex-1 flex flex-col items-center relative">
        <div className={`flex-none h-[20vh] md:h-[25vh] transition-opacity duration-500 ${isFinishing ? 'opacity-0' : 'opacity-100'}`}></div>
        <div className={`w-full max-w-2xl px-4 transition-all duration-700 
          ${isFinishing ? 'opacity-0 translate-y-10 pointer-events-none' : 'opacity-100 translate-y-0'}`}>
          <div className="mb-8 retro-card p-4">
            <div className="flex justify-between text-[var(--color-primary)] mb-2 uppercase text-sm">
              <span>{'>'} QUERY {currentIndex + 1}/{questions.length}</span>
              <span className="glow-text">{progressPercentage}%</span>
            </div>
            <div className="w-full bg-[var(--color-bg-dark)] border border-[var(--color-primary)] h-4 p-[2px]">
              <div className="bg-[var(--color-primary)] h-full transition-all duration-500" style={{ width: `${progressPercentage}%` }} />
            </div>
          </div>

          <div className={`retro-card p-6 md:p-8 mb-6 transition-opacity duration-300 ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}>
            <h2 className="text-xl md:text-3xl font-bold text-[var(--color-primary)] mb-8 uppercase glow-text">
              {currentQuestion.text}
            </h2>
            <div className="space-y-4">
              {currentQuestion.options.map((option, index) => (
                <button key={index} onClick={() => handleSelect(option)} disabled={isTransitioning || isFinishing}
                  className={`w-full text-left retro-btn p-4 uppercase transition-all ${answers[currentIndex]?.text === option.text ? 'bg-[var(--color-primary)] text-[var(--color-bg-dark)]' : ''}`}>
                  <span className="mr-3 font-bold">[{String.fromCharCode(65 + index)}]</span>
                  {option.text}
                </button>
              ))}
            </div>

            {/* 底部导航按钮组 - 增加 mt-5 (20px) 边距 */}
            <div className="mt-8 flex gap-4 w-full">
              <button
                onClick={handlePrev}
                disabled={currentIndex === 0 || isTransitioning || isFinishing}
                className={`flex-1 retro-btn py-3 text-sm font-bold tracking-widest ${currentIndex === 0 ? 'opacity-30 cursor-not-allowed' : ''}`}
              >
                {'<'} PREV_QUERY
              </button>
              <button
                onClick={handleNext}
                disabled={isTransitioning || isFinishing}
                className="flex-1 retro-btn py-3 text-sm font-bold tracking-widest"
              >
                {currentIndex === questions.length - 1 ? 'FINISH_TAPE >' : 'NEXT_QUERY >'}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 结束终端覆盖层 */}
      <div className={`fixed inset-0 flex items-center justify-center px-4 z-[100] pointer-events-none transition-opacity duration-500
        ${showTerminal ? 'opacity-100' : 'opacity-0'}`}>

        <div ref={terminalCardRef} className="max-w-md w-full text-center retro-card p-8 md:p-12 bg-[var(--color-bg-card)] shadow-[0_0_50px_rgba(255,153,0,0.3)]">

          {/* 终端内容 */}
          <div className="mb-10 relative z-10">
            <div ref={spinnerRef} className="text-7xl text-[var(--color-primary)] mb-6 glow-text font-mono h-20 flex items-center justify-center">
              /
            </div>
            <h2 className="text-2xl font-bold text-[var(--color-primary)] mb-4 tracking-widest uppercase glow-text">
              {phase === 'scanning' ? 'ANALYZING_DATA' : 'ANALYZER_STANDBY'}
            </h2>
            <div className="text-[var(--color-accent-cyan)] text-sm uppercase tracking-widest font-bold h-6 flex items-center justify-center">
              {phase === 'scanning' ? (
                <span className="text-[var(--color-primary)]">PROCESSING: {Math.floor(analysisProgress)}%</span>
              ) : (
                <span className="animate-blink">AWAITING_INPUT...</span>
              )}
            </div>
          </div>

          {/* 进度条 */}
          <div className="w-full bg-black border-2 border-[var(--color-primary)] h-8 p-1 relative z-10">
            <div 
              className="h-full bg-[var(--color-primary)] shadow-[0_0_10px_var(--color-primary)] transition-all duration-100 ease-out" 
              style={{ width: `${analysisProgress}%` }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  )
}
