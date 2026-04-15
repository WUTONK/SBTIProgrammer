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
  const tapeWrapperRef = useRef(null)
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

  const handleSkip = () => {
    if (isTransitioning || isFinishing) return
    const newAnswers = [...answers]
    newAnswers[currentIndex] = null
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
    const wrapperEl = tapeWrapperRef.current

    if (!tapeEl || !cardEl || !wrapperEl) {
      onComplete(finalAnswersRef.current)
      return
    }

    // 获取元素相对于 .crt-content-wrapper 的本地 Y 坐标
    const getLocalY = (el) => {
      let y = 0;
      while (el && !el.classList?.contains('crt-content-wrapper')) {
        y += el.offsetTop || 0;
        el = el.offsetParent;
      }
      return y;
    };

    const crtWrapper = document.querySelector('.crt-content-wrapper');
    const scrollTop = crtWrapper ? crtWrapper.scrollTop : 0;

    const cardY = getLocalY(cardEl);
    const wrapperY = getLocalY(wrapperEl);
    
    // 动态设置包裹层的 clip-path，使其底部精确对齐到终端卡片的顶部
    // 使用本地 CSS 坐标计算，完全避免 3D transform (rotateX) 带来的投影误差
    // +2px 是为了刚好盖住边框
    const clipHeight = cardY - wrapperY + scrollTop + 2;
    wrapperEl.style.clipPath = `polygon(-1000% -1000%, 2000% -1000%, 2000% ${clipHeight}px, -1000% ${clipHeight}px)`

    // 纸带掉落到卡片中心位置并消失
    const fallDistance = clipHeight + 100;

    // 先启动动画，再设置 phase 以减少渲染抖动对动画初始化的影响
    const fallAnim = tapeEl.animate([
      { transform: 'translateY(0)', opacity: 1 },
      { transform: `translateY(${fallDistance}px)`, opacity: 1 }
    ], {
      duration: 800,
      easing: 'cubic-bezier(0.5, 0, 0.7, 1)',
      fill: 'forwards'
    })

    setPhase('falling')

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
    <div className="flex-1 flex flex-col w-full h-full relative">
      {/* 顶部纸带区域 */}
      <div className={`flex-none pt-4 flex justify-center z-[60] ${isFalling ? 'pointer-events-none' : ''}`}>
        <div ref={tapeWrapperRef} className="w-full flex justify-center">
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
      </div>

      {/* 题目区域 */}
      <div className="flex-1 flex flex-col relative w-full">
        <div className={`flex-none transition-opacity duration-500 ${isFinishing ? 'opacity-0' : 'opacity-100'}`} style={{ height: 'max(4vh, calc(50dvh - 340px))' }}></div>
        <div className="w-full flex justify-center">
          <div className={`w-full max-w-2xl px-6 md:px-8 flex flex-col transition-all duration-700 
            ${isFinishing ? 'opacity-0 translate-y-10 pointer-events-none' : 'opacity-100 translate-y-0'}`}
            style={{ gap: '5px' }}>
            
            {/* 共同父DIV，包裹进度条和答题题目 */}
            <div className="flex flex-col w-full">
            <div className="mb-0 retro-card p-4" style={{ borderBottom: 'none' }}>
              <div className="flex justify-between text-[var(--color-primary)] mb-2 uppercase text-sm">
                <span>{'>'} QUERY {currentIndex + 1}/{questions.length}</span>
                <span className="glow-text">{progressPercentage}%</span>
              </div>
              <div className="w-full bg-[var(--color-bg-dark)] border border-[var(--color-primary)] h-4 p-[2px]">
                <div className="bg-[var(--color-primary)] h-full transition-all duration-500" style={{ width: `${progressPercentage}%` }} />
              </div>
            </div>

            <div className={`retro-card py-8 md:py-10 mb-0 transition-opacity duration-300 ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}>
              <div className="px-6 md:px-12">
                {/* 
                  [排版对齐 Hack 说明]
                  问题：需要让标题和选项整体向右缩进，且缩进距离必须和之前存在的红色 '>' 箭头完全一致。单纯使用 padding (pl-*) 很难做到多端像素级对齐。
                  解决方案：保留原有的 '>' 箭头元素，但将其设置为全透明（opacity-0 select-none）来物理撑开空间。
                  同时在下方的选项按钮内也放入一个同样大小的透明 '>'，从而保证标题文字和 [A][B][C] 选项在垂直方向上 100% 完美对齐。虽然不够优雅，但绝对精准。
                */}
                <div className="flex items-start mb-10">
                  <span className="opacity-0 select-none font-bold text-xl md:text-3xl mr-4 md:mr-6 shrink-0">{'>'}</span>
                  <h2 className="text-xl md:text-1xl font-bold text-[var(--color-primary)] uppercase glow-text leading-relaxed">
                    {currentQuestion.text}
                  </h2>
                </div>
                <div className="space-y-5">
                  {currentQuestion.options.map((option, index) => (
                    <button key={index} onClick={() => handleSelect(option)} disabled={isTransitioning || isFinishing}
                      className={`w-full flex items-center retro-btn justify-center px-6 py-5 md:px-8 md:py-6 uppercase transition-all ${answers[currentIndex]?.text === option.text ? 'bg-[var(--color-primary)] text-[var(--color-bg-dark)]' : ''}`}>
                      
                      <div className="flex items-center justify-center">
                        <span className="text-center font-bold text-lg md:text-xl leading-relaxed">
                          {option.text}
                        </span>
                      </div>
                    </button>
                  ))}
                  
                  {/* 跳过此题目按钮 */}
                  <button onClick={handleSkip} disabled={isTransitioning || isFinishing}
                    className={`w-full flex items-center retro-btn justify-center px-6 py-5 md:px-8 md:py-6 uppercase transition-all ${answers[currentIndex] === null ? 'bg-[var(--color-primary)] text-[var(--color-bg-dark)]' : ''}`}>
                    
                    <div className="flex items-center justify-center">
                      <span className="text-center font-bold text-lg md:text-xl leading-relaxed">
                        跳过此题目
                      </span>
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* 上下页选项在共同父DIV之外，但共享最外层的 DIV */}
          <div className={`flex gap-4 w-full transition-opacity duration-300 ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}>
            <button
              onClick={handlePrev}
              disabled={currentIndex === 0 || isTransitioning || isFinishing}
              className={`flex-1 retro-btn py-3 text-sm font-bold tracking-widest ${currentIndex === 0 ? 'opacity-30 cursor-not-allowed' : ''}`}
            >
              {'<'} 上一页
            </button>
            <button
              onClick={handleNext}
              disabled={isTransitioning || isFinishing}
              className="flex-1 retro-btn py-3 text-sm font-bold tracking-widest"
            >
              {currentIndex === questions.length - 1 ? '完成测试 >' : '下一页 >'}
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
              className="h-full bg-[var(--color-primary)] shadow-[0_0_10px_var(--color-primary)]" 
              style={{ width: `${analysisProgress}%` }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  )
}
