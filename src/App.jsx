import { useState, useCallback } from 'react'
import Home from './components/Home.jsx'
import Quiz from './components/Quiz.jsx'
import LoadingScreen from './components/LoadingScreen.jsx'
import Result from './components/Result.jsx'

const SCREENS = {
  HOME: 'home',
  QUIZ: 'quiz',
  LOADING: 'loading',
  RESULT: 'result',
}

export default function App() {
  const [currentScreen, setCurrentScreen] = useState(SCREENS.HOME)
  const [answers, setAnswers] = useState([])
  const [result, setResult] = useState(null)

  const handleStart = useCallback(() => {
    setAnswers([])
    setResult(null)
    setCurrentScreen(SCREENS.QUIZ)
  }, [])

  const handleCompleteQuiz = useCallback((allAnswers) => {
    setAnswers(allAnswers)
    setCurrentScreen(SCREENS.LOADING)
  }, [])

  const handleLoadingComplete = useCallback((finalResult) => {
    setResult(finalResult)
    setCurrentScreen(SCREENS.RESULT)
  }, [])

  const handleRestart = useCallback(() => {
    setAnswers([])
    setResult(null)
    setCurrentScreen(SCREENS.HOME)
  }, [])

  const renderScreen = () => {
    switch (currentScreen) {
      case SCREENS.HOME:
        return <Home onStart={handleStart} />
      case SCREENS.QUIZ:
        return <Quiz onComplete={handleCompleteQuiz} />
      case SCREENS.LOADING:
        return <LoadingScreen answers={answers} onComplete={handleLoadingComplete} />
      case SCREENS.RESULT:
        return <Result result={result} onRestart={handleRestart} />
      default:
        return <Home onStart={handleStart} />
    }
  }

  return (
    <div className="crt min-h-screen bg-[var(--color-bg-dark)] flex flex-col relative overflow-hidden">
      {/* Scanline overlay */}
      <div className="absolute inset-0 pointer-events-none z-50 mix-blend-overlay opacity-20 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPjxyZWN0IHdpZHRoPSI0IiBoZWlnaHQ9IjEiIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIi8+PC9zdmc+')]"></div>
      
      {/* Vignette effect */}
      <div className="absolute inset-0 pointer-events-none z-40 bg-[radial-gradient(circle_at_center,transparent_40%,rgba(0,0,0,0.95)_100%)]"></div>

      <div className="relative z-10 flex-1 flex flex-col">
        {renderScreen()}
      </div>
    </div>
  )
}
