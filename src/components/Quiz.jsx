import { useState } from 'react'
import { questions } from '../data/questions.js'

export default function Quiz({ onComplete }) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [answers, setAnswers] = useState([])
  const [isTransitioning, setIsTransitioning] = useState(false)

  const currentQuestion = questions[currentIndex]
  const progressPercentage = Math.round((currentIndex / questions.length) * 100)

  const handleSelect = (option) => {
    if (isTransitioning) return

    setIsTransitioning(true)
    const newAnswers = [...answers, option]

    setTimeout(() => {
      if (currentIndex + 1 < questions.length) {
        setAnswers(newAnswers)
        setCurrentIndex(currentIndex + 1)
      } else {
        onComplete(newAnswers)
      }
      setIsTransitioning(false)
    }, 300)
  }

  return (
    <div className="flex-1 flex flex-col items-center justify-center px-4 py-8">
      <div className="max-w-2xl w-full">
        {/* 进度条 */}
        <div className="mb-8 retro-card p-4">
          <div className="flex justify-between text-[var(--color-primary)] mb-2 uppercase tracking-widest text-sm">
            <span>{'>'} QUERY {currentIndex + 1}/{questions.length}</span>
            <span className="glow-text">{progressPercentage}%</span>
          </div>
          <div className="w-full bg-[var(--color-bg-dark)] border border-[var(--color-primary)] h-4 p-[2px]">
            <div
              className="bg-[var(--color-primary)] h-full transition-all duration-500 ease-out shadow-[0_0_10px_rgba(255,153,0,0.8)]"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
        </div>

        {/* 题目卡片 */}
        <div
          className={`retro-card p-6 md:p-8 mb-6 transition-opacity duration-300 ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}
        >
          {/* 维度标签 */}
          <div className="flex items-center mb-6 border-b border-[var(--color-primary)] pb-2">
            <span className="inline-block text-sm text-[var(--color-bg-dark)] bg-[var(--color-primary)] px-2 py-1 uppercase font-bold tracking-widest shadow-[0_0_10px_rgba(255,153,0,0.5)]">
              DIMENSION: {currentQuestion.dimension}
            </span>
            <span className="ml-auto animate-blink text-[var(--color-primary)] text-xl">_</span>
          </div>

          <h2 className="text-xl md:text-3xl font-bold text-[var(--color-primary)] mb-8 leading-relaxed glow-text uppercase">
            {currentQuestion.text}
          </h2>

          {/* 选项 */}
          <div className="space-y-4">
            {currentQuestion.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleSelect(option)}
                disabled={isTransitioning}
                className="w-full text-left retro-btn p-4 text-[var(--color-primary)] transition-all duration-200 cursor-pointer disabled:cursor-not-allowed group uppercase tracking-wider text-base md:text-lg"
              >
                <span className="text-[var(--color-accent-cyan)] group-hover:text-[var(--color-bg-dark)] mr-3 font-bold">
                  [{String.fromCharCode(65 + index)}]
                </span>
                {option.text}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
