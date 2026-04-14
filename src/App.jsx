import { useState, useCallback } from 'react'
import Home from './components/Home.jsx'
import Quiz from './components/Quiz.jsx'
import LoadingScreen from './components/LoadingScreen.jsx'
import Result from './components/Result.jsx'
import DeveloperMode from './components/DeveloperMode.jsx'
import { archetypes } from './data/archetypes.js'

const SCREENS = {
  HOME: 'home',
  QUIZ: 'quiz',
  LOADING: 'loading',
  RESULT: 'result',
}

import { calculateResult } from './utils/calculateResult.js'

export default function App() {
  const [currentScreen, setCurrentScreen] = useState(SCREENS.HOME)
  const [userName, setUserName] = useState('')
  const [answers, setAnswers] = useState([])
  const [result, setResult] = useState(null)
  const [quizIndex, setQuizIndex] = useState(0)
  const [skipLoading, setSkipLoading] = useState(false)
  const [useCrtCurve, setUseCrtCurve] = useState(false)
  const [desktopLayoutMode, setDesktopLayoutMode] = useState('B')

  const handleStart = useCallback((name) => {
    setUserName(name || 'GUEST')
    setAnswers([])
    setResult(null)
    setQuizIndex(0)
    setCurrentScreen(SCREENS.QUIZ)
  }, [])

  const handleCompleteQuiz = useCallback((allAnswers) => {
    setAnswers(allAnswers)
    if (skipLoading) {
      const finalResult = calculateResult(allAnswers)
      setResult(finalResult)
      setCurrentScreen(SCREENS.RESULT)
    } else {
      setCurrentScreen(SCREENS.LOADING)
    }
  }, [skipLoading])

  const handleLoadingComplete = useCallback((finalResult) => {
    setResult(finalResult)
    setCurrentScreen(SCREENS.RESULT)
  }, [])

  const handleRestart = useCallback(() => {
    setAnswers([])
    setResult(null)
    setQuizIndex(0)
    setCurrentScreen(SCREENS.HOME)
  }, [])

  const handleJumpToQuestion = useCallback((index) => {
    setAnswers(answers.slice(0, index))
    setQuizIndex(index)
    setCurrentScreen(SCREENS.QUIZ)
  }, [answers])

  const handlePreviewResult = useCallback((resultType) => {
    setResult({
      typeCode: resultType,
      ...archetypes[resultType],
      subDimensions: {
        CO1: 'H', CO2: 'M', CO3: 'L',
        SI1: 'H', SI2: 'H', SI3: 'M',
        TP1: 'L', TP2: 'M', TP3: 'H',
        PR1: 'H', PR2: 'L', PR3: 'M'
      }
    })
    setCurrentScreen(SCREENS.RESULT)
  }, [])

  const renderScreen = () => {
    switch (currentScreen) {
      case SCREENS.HOME:
        return <Home onStart={handleStart} />
      case SCREENS.QUIZ:
        return (
          <Quiz
            onComplete={handleCompleteQuiz}
            currentIndex={quizIndex}
            setCurrentIndex={setQuizIndex}
            answers={answers}
            setAnswers={setAnswers}
          />
        )
      case SCREENS.LOADING:
        return <LoadingScreen answers={answers} onComplete={handleLoadingComplete} />
      case SCREENS.RESULT:
        return <Result result={result} onRestart={handleRestart} userName={userName} desktopLayoutMode={desktopLayoutMode} />
      default:
        return <Home onStart={handleStart} />
    }
  }

  return (
    <div className={`crt ${useCrtCurve ? 'crt-curve' : ''} h-[100dvh] w-full bg-[var(--color-bg-dark)] flex flex-col relative overflow-hidden`}>
      {/* Scanline overlay */}
      <div className="absolute inset-0 pointer-events-none z-50 mix-blend-overlay opacity-20 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPjxyZWN0IHdpZHRoPSI0IiBoZWlnaHQ9IjEiIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIi8+PC9zdmc+')]"></div>
      
      {/* Vignette effect - 弱化处理以提高可见度 */}
      <div className="absolute inset-0 pointer-events-none z-40 bg-[radial-gradient(circle_at_center,transparent_60%,rgba(0,0,0,0.7)_100%)]"></div>

      <div className="crt-content-wrapper relative flex-1 flex flex-col h-full overflow-y-auto">
        {renderScreen()}
      </div>

      <DeveloperMode 
        onJumpToQuestion={handleJumpToQuestion}
        onPreviewResult={handlePreviewResult}
        skipLoading={skipLoading}
        setSkipLoading={setSkipLoading}
        useCrtCurve={useCrtCurve}
        setUseCrtCurve={setUseCrtCurve}
        desktopLayoutMode={desktopLayoutMode}
        setDesktopLayoutMode={setDesktopLayoutMode}
      />
    </div>
  )
}
