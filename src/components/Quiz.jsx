import { useState, useRef, useCallback, useEffect } from 'react'
import { questions } from '../data/questions.js'
import PunchedTape from './PunchedTape.jsx'

const SPINNER_CHARS = ['/', '-', '\\', '|']
const FALL_DURATION = 800

export default function Quiz({ onComplete, currentIndex, setCurrentIndex, answers, setAnswers }) {
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [isFinishing, setIsFinishing] = useState(false)
  const [showTerminal, setShowTerminal] = useState(false)
  // idle → shake → await → falling → sealed
  const [phase, setPhase] = useState('idle')

  const spinnerRef = useRef(null)
  const spinnerTimerRef = useRef(null)
  const tapeBodyRef = useRef(null)
  const terminalCardRef = useRef(null)
  const scanBeamRef = useRef(null)
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

  const startFallAnimation = useCallback(() => {
    const tapeEl = tapeBodyRef.current
    const cardEl = terminalCardRef.current
    const scanEl = scanBeamRef.current

    if (!tapeEl || !cardEl) {
      setPhase('sealed')
      setTimeout(() => {
        if (spinnerTimerRef.current) clearInterval(spinnerTimerRef.current)
        onComplete(finalAnswersRef.current)
      }, 600)
      return
    }

    const tapeRect = tapeEl.getBoundingClientRect()
    const cardRect = cardEl.getBoundingClientRect()
    const fallDistance = cardRect.bottom - tapeRect.top + 30

    tapeEl.style.pointerEvents = 'none'
    setPhase('falling')

    const fallAnim = tapeEl.animate([
      { transform: 'translateY(0)' },
      { transform: `translateY(${fallDistance}px)` }
    ], {
      duration: FALL_DURATION,
      easing: 'cubic-bezier(0.22, 0.1, 0.68, 1)',
      fill: 'forwards'
    })

    let scanActive = false

    const trackTape = () => {
      const curTape = tapeEl.getBoundingClientRect()
      const curCard = cardEl.getBoundingClientRect()

      if (!scanActive && curTape.bottom >= curCard.top) {
        scanActive = true
        if (scanEl) {
          scanEl.style.display = 'block'
          scanEl.style.opacity = '1'
        }
      }

      if (scanActive && scanEl) {
        const beamY = curTape.bottom - curCard.top
        scanEl.style.top = `${Math.max(0, beamY)}px`

        if (curTape.top > curCard.top + 5) {
          const finalY = parseFloat(scanEl.style.top) || beamY
          scanEl.animate([
            { top: `${finalY}px`, opacity: 1 },
            { top: `${curCard.height * 0.75}px`, opacity: 0 }
          ], {
            duration: 350,
            easing: 'ease-out',
            fill: 'forwards'
          })
          return
        }
      }

      rafRef.current = requestAnimationFrame(trackTape)
    }

    rafRef.current = requestAnimationFrame(trackTape)

    fallAnim.onfinish = () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
      tapeEl.style.opacity = '0'

      setTimeout(() => {
        setPhase('sealed')
        setTimeout(() => {
          if (spinnerTimerRef.current) clearInterval(spinnerTimerRef.current)
          onComplete(finalAnswersRef.current)
        }, 600)
      }, 200)
    }
  }, [onComplete])

  const triggerFinishSequence = useCallback((finalAnswers) => {
    finalAnswersRef.current = finalAnswers || answers

    let idx = 0
    spinnerTimerRef.current = setInterval(() => {
      idx = (idx + 1) % 4
      if (spinnerRef.current) spinnerRef.current.textContent = SPINNER_CHARS[idx]
    }, 150)

    setIsFinishing(true)
    setPhase('shake')

    setTimeout(() => {
      setShowTerminal(true)
      setPhase('await')

      setTimeout(() => {
        startFallAnimation()
      }, 500)
    }, 600)
  }, [answers, startFallAnimation])

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

  const isShaking = phase === 'shake'
  const isFalling = phase === 'falling' || phase === 'sealed'
  const isSealed = phase === 'sealed'

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
          </div>
        </div>
      </div>

      {/* 结束终端覆盖层 */}
      <div className={`fixed inset-0 flex items-center justify-center px-4 z-[100] pointer-events-none transition-opacity duration-500
        ${showTerminal ? 'opacity-100' : 'opacity-0'}`}>

        <div ref={terminalCardRef} className="max-w-md w-full text-center retro-card p-8 md:p-12 bg-[var(--color-bg-card)] shadow-[0_0_50px_rgba(255,153,0,0.3)] overflow-hidden">

          {/* 进纸口 */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[340px] h-10 -translate-y-[2px] overflow-hidden z-[70]">
            {!isSealed ? (
              <div className="w-full h-2 bg-black mt-2 shadow-[inset_0_0_10px_var(--color-primary)]"></div>
            ) : (
              <>
                <div className="absolute inset-0 bg-[var(--color-bg-card)] animate-slit-close"></div>
                <div className="w-full h-[1px] bg-[var(--color-primary)] absolute bottom-0 shadow-[0_0_8px_var(--color-primary)] opacity-40"></div>
              </>
            )}
          </div>

          {/* 扫描光束 — JS 驱动位置，初始隐藏 */}
          <div ref={scanBeamRef} className="absolute left-0 right-0 z-[65] pointer-events-none" style={{ display: 'none', top: 0 }}>
            <div className="w-full h-[2px] bg-[var(--color-primary)] shadow-[0_0_15px_var(--color-primary)]"></div>
            <div className="w-full h-16 bg-gradient-to-b from-[var(--color-primary)]/20 to-transparent"></div>
          </div>

          {/* 终端内容 */}
          <div className="mb-10">
            <div ref={spinnerRef} className="text-7xl text-[var(--color-primary)] mb-6 glow-text font-mono h-20 flex items-center justify-center">
              /
            </div>
            <h2 className="text-2xl font-bold text-[var(--color-primary)] mb-4 tracking-widest uppercase glow-text">
              ANALYZER_STANDBY
            </h2>
            <div className="text-[var(--color-accent-cyan)] text-sm uppercase tracking-widest font-bold h-6 flex items-center justify-center">
              {isSealed ? (
                <span className="text-[var(--color-primary)]">ANALYSIS_INITIATED</span>
              ) : (
                <span className="animate-blink">WAITING_FOR_DATA...</span>
              )}
            </div>
          </div>

          <div className="w-full bg-black border-2 border-[var(--color-primary)] h-8 p-1">
            <div className={`h-full bg-[var(--color-primary)] transition-all duration-1000 ${isSealed ? 'w-full opacity-20' : 'w-0'}`}></div>
          </div>
        </div>
      </div>
    </div>
  )
}
