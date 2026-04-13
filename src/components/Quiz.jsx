import { useState } from 'react'
import { questions } from '../data/questions.js'
import PunchedTape from './PunchedTape.jsx'

export default function Quiz({ onComplete, currentIndex, setCurrentIndex, answers, setAnswers }) {
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [isFinishing, setIsFinishing] = useState(false) 
  const [isShaking, setIsShaking] = useState(false) 
  const [showTerminal, setShowTerminal] = useState(false) 
  const [isFalling, setIsFalling] = useState(false) 
  const [isSlitClosed, setIsSlitClosed] = useState(false) // 进纸口关闭状态
  const [spinnerIndex, setSpinnerIndex] = useState(0)
  const spinnerChars = ['/', '-', '\\', '|']

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

  const triggerFinishSequence = (finalAnswers) => {
    // 启动 Spinner 定时器
    const spinnerTimer = setInterval(() => {
      setSpinnerIndex(prev => (prev + 1) % 4)
    }, 150)

    // 1. 答题卡淡出 + 纸带开始抖动
    setIsFinishing(true)
    setIsShaking(true)
    
    // 2. 0.5秒后，终端显现
    setTimeout(() => {
      setShowTerminal(true)
      
      // 3. 0.4秒后，纸带落下
      setTimeout(() => {
        setIsFalling(true)
        setIsShaking(false)
        
        // 4. 纸带落入后 (0.6秒)，关闭缝隙
        setTimeout(() => {
          setIsSlitClosed(true)
          
          // 5. 缝隙关闭动画完成后，正式切换
          setTimeout(() => {
            clearInterval(spinnerTimer)
            onComplete(finalAnswers || answers)
          }, 600)
        }, 600)
      }, 400)
    }, 500)
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

  return (
    <div className="flex-1 flex flex-col w-full h-full overflow-hidden relative">
      {/* 1. 顶部区域：打孔机 */}
      <div className="flex-none pt-4 flex justify-center z-[60]">
        <PunchedTape 
          currentIndex={currentIndex}
          answers={answers}
          totalQuestions={questions.length}
          onJump={handleJump}
          isFalling={isFalling}
          isShaking={isShaking}
        />
      </div>

      {/* 2. 动态内容区 */}
      <div className="flex-1 flex flex-col items-center relative">
        
        {/* 锚点间距 */}
        <div className={`flex-none h-[20vh] md:h-[25vh] transition-opacity duration-500 ${isFinishing ? 'opacity-0' : 'opacity-100'}`}></div>

        {/* 答题卡 */}
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
            <div className="flex justify-between mt-8 pt-6 border-t border-[var(--color-primary)]/30">
              <button onClick={() => currentIndex > 0 && setCurrentIndex(currentIndex - 1)} disabled={isTransitioning || isFinishing || currentIndex === 0} className="retro-btn px-4 py-2 uppercase">{'<'} PREV</button>
              <button onClick={handleNext} disabled={isTransitioning || isFinishing} className="retro-btn px-4 py-2 uppercase">
                {currentIndex + 1 === questions.length ? 'FINISH' : 'NEXT'} {'>'}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 核心转场终端：现在相对于最外层 relative 容器居中 */}
      <div className={`absolute inset-0 flex items-center justify-center px-4 transition-all duration-700 z-[100]
        ${showTerminal ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'}`}>
        <div className="max-w-md w-full text-center retro-card p-8 md:p-12 bg-[var(--color-bg-card)] shadow-[0_0_50px_rgba(255,153,0,0.3)]">
          {/* 顶部的进纸口缝隙 - 宽度调整为 340px */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[340px] h-10 -translate-y-[2px] overflow-hidden">
             {/* 缝隙背景：在关闭时变为透明 */}
             <div className={`w-full h-2 bg-black mt-2 shadow-[inset_0_0_10px_var(--color-primary)] transition-opacity duration-300 ${isSlitClosed ? 'opacity-0' : 'opacity-100'}`}></div>
             
             {/* 缝隙快门 (Shutter)：关闭时的渐变效果 */}
             <div className={`absolute inset-0 bg-gradient-to-b from-[var(--color-primary)] to-transparent transition-all duration-500 ease-in-out
               ${isSlitClosed ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'}`}>
               <div className="w-full h-full bg-[var(--color-primary)] opacity-40 animate-pulse"></div>
               {/* 闭合后的密封线 */}
               <div className={`w-full h-1 bg-[var(--color-primary)] absolute bottom-0 shadow-[0_0_15px_var(--color-primary)] transition-opacity duration-500 ${isSlitClosed ? 'opacity-100' : 'opacity-0'}`}></div>
             </div>
          </div>

          <div className="mb-10">
            <div className="text-7xl text-[var(--color-primary)] mb-6 glow-text font-mono h-20 flex items-center justify-center">
               {spinnerChars[spinnerIndex]}
            </div>
            <h2 className="text-2xl font-bold text-[var(--color-primary)] mb-4 tracking-widest uppercase glow-text">
              ANALYZER_STANDBY
            </h2>
            <div className="text-[var(--color-accent-cyan)] text-sm uppercase tracking-widest font-bold">
              {isSlitClosed ? (
                <span className="text-[var(--color-primary)] animate-pulse">INITIATING ANALYSIS...</span>
              ) : (
                <span className="animate-blink">WAITING_FOR_DATA...</span>
              )}
            </div>
          </div>
          
          <div className="w-full bg-black border-2 border-[var(--color-primary)] h-8 p-1">
            <div className={`h-full bg-[var(--color-primary)] transition-all duration-1000 ${isSlitClosed ? 'w-full opacity-20' : 'w-0'}`}></div>
          </div>
        </div>
      </div>
    </div>
  )
}
