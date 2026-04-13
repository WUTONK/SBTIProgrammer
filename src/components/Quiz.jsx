import { useState } from 'react'
import { questions } from '../data/questions.js'
import PunchedTape from './PunchedTape.jsx'

export default function Quiz({ onComplete, currentIndex, setCurrentIndex, answers, setAnswers }) {
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [isFinishing, setIsFinishing] = useState(false) 
  const [isFalling, setIsFalling] = useState(false) 

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
    setIsFinishing(true)
    setTimeout(() => {
      setIsFalling(true)
      setTimeout(() => {
        onComplete(finalAnswers || answers)
      }, 800)
    }, 400)
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
    <div className="flex-1 flex flex-col w-full h-full overflow-y-auto overflow-x-hidden">
      {/* 1. 顶部区域 */}
      <div className="flex-none pt-4 flex justify-center z-50">
        <PunchedTape 
          currentIndex={currentIndex}
          answers={answers}
          totalQuestions={questions.length}
          onJump={handleJump}
          isFalling={isFalling}
        />
      </div>

      {/* 2. 锚点间距 (Anchor Spacer) - 恢复原有高度，将答题卡推至下方 */}
      <div className="flex-none h-[20vh] md:h-[25vh]"></div>

      {/* 3. 核心答题区域 */}
      <div className={`flex-none flex flex-col items-center px-4 pb-20 transition-all duration-700 
        ${isFinishing ? 'opacity-0 translate-y-20 pointer-events-none' : 'opacity-100 translate-y-0'}`}>
        <div className="max-w-2xl w-full">
          {/* 进度条 */}
          <div className="mb-8 retro-card p-4">
            <div className="flex justify-between text-[var(--color-primary)] mb-2 uppercase text-sm">
              <span>{'>'} QUERY {currentIndex + 1}/{questions.length}</span>
              <span className="glow-text">{progressPercentage}%</span>
            </div>
            <div className="w-full bg-[var(--color-bg-dark)] border border-[var(--color-primary)] h-4 p-[2px]">
              <div className="bg-[var(--color-primary)] h-full transition-all duration-500" style={{ width: `${progressPercentage}%` }} />
            </div>
          </div>

          {/* 题目卡片 */}
          <div className={`retro-card p-6 md:p-8 mb-6 transition-opacity duration-300 ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}>
            <h2 className="text-xl md:text-3xl font-bold text-[var(--color-primary)] mb-8 uppercase glow-text leading-relaxed">
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
    </div>
  )
}
