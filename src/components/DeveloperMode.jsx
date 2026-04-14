import { useState, useEffect } from 'react'
import { questions } from '../data/questions.js'
import { archetypes } from '../data/archetypes.js'

export default function DeveloperMode({ onJumpToQuestion, onPreviewResult, skipLoading, setSkipLoading, useCrtCurve, setUseCrtCurve, desktopLayoutMode, setDesktopLayoutMode }) {
  const [isVisible, setIsVisible] = useState(false)

  const cycleLayout = () => {
    const modes = ['A', 'B', 'C']
    const nextIndex = (modes.indexOf(desktopLayoutMode) + 1) % modes.length
    setDesktopLayoutMode(modes[nextIndex])
  }

  useEffect(() => {
    const handleKeyDown = (e) => {
      // Toggle with 'd' key, but ignore if typing in input
      if (e.key === 'd' && e.target.tagName !== 'INPUT' && e.target.tagName !== 'TEXTAREA') {
        setIsVisible((prev) => !prev)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  if (!isVisible) return null

  return (
    <div className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="retro-card bg-[var(--color-bg-dark)] p-6 max-w-4xl w-full max-h-[90vh] overflow-y-auto border-2 border-[var(--color-accent-pink)] shadow-[0_0_20px_rgba(255,0,255,0.5)]">
        <div className="flex justify-between items-center mb-6 border-b border-[var(--color-accent-pink)] pb-2">
          <h2 className="text-2xl font-bold text-[var(--color-accent-pink)] uppercase tracking-widest glow-text">
            [ Developer Mode ]
          </h2>
          <button 
            onClick={() => setIsVisible(false)}
            className="text-[var(--color-primary)] hover:text-[var(--color-accent-pink)] text-xl font-bold"
          >
            X
          </button>
        </div>

        <div className="space-y-8">
          {/* Settings */}
          <section>
            <h3 className="text-xl text-[var(--color-primary)] mb-4 uppercase border-l-4 border-[var(--color-primary)] pl-2">
              Settings
            </h3>
            <div className="flex items-center space-x-6">
              <label className="flex items-center cursor-pointer text-[var(--color-primary)] hover:text-[var(--color-accent-cyan)] transition-colors">
                <input
                  type="checkbox"
                  checked={skipLoading}
                  onChange={(e) => setSkipLoading(e.target.checked)}
                  className="mr-3 w-5 h-5 accent-[var(--color-primary)] bg-[var(--color-bg-dark)] border-2 border-[var(--color-primary)]"
                />
                <span className="uppercase tracking-widest text-sm">Skip Loading Animation</span>
              </label>

              <label className="flex items-center cursor-pointer text-[var(--color-primary)] hover:text-[var(--color-accent-cyan)] transition-colors">
                <input
                  type="checkbox"
                  checked={useCrtCurve}
                  onChange={(e) => setUseCrtCurve(e.target.checked)}
                  className="mr-3 w-5 h-5 accent-[var(--color-primary)] bg-[var(--color-bg-dark)] border-2 border-[var(--color-primary)]"
                />
                <span className="uppercase tracking-widest text-sm">CRT Curve Effect</span>
              </label>

              <div className="flex flex-col gap-2">
                <span className="uppercase tracking-widest text-[10px] text-[var(--color-primary)] opacity-60 pl-1">Desktop Layout Mode</span>
                <button 
                  onClick={cycleLayout}
                  className="retro-btn px-4 py-2 text-sm text-[var(--color-primary)] hover:bg-[var(--color-primary)] hover:text-[var(--color-bg-dark)] transition-colors"
                >
                  MODE: {desktopLayoutMode}
                </button>
              </div>
            </div>
          </section>

          {/* Jump to Question */}
          <section>
            <h3 className="text-xl text-[var(--color-primary)] mb-4 uppercase border-l-4 border-[var(--color-primary)] pl-2">
              Jump to Question
            </h3>
            <div className="grid grid-cols-4 sm:grid-cols-8 gap-2">
              {questions.map((q, index) => (
                <button
                  key={q.id}
                  onClick={() => {
                    onJumpToQuestion(index)
                    setIsVisible(false)
                  }}
                  className="retro-btn py-2 text-sm text-[var(--color-primary)] hover:bg-[var(--color-primary)] hover:text-[var(--color-bg-dark)] transition-colors"
                >
                  Q{index + 1}
                </button>
              ))}
            </div>
          </section>

          {/* Preview Result */}
          <section>
            <h3 className="text-xl text-[var(--color-primary)] mb-4 uppercase border-l-4 border-[var(--color-primary)] pl-2">
              Preview Result Type
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {Object.keys(archetypes).map((type) => (
                <button
                  key={type}
                  onClick={() => {
                    onPreviewResult(type)
                    setIsVisible(false)
                  }}
                  className="retro-btn py-2 px-3 text-sm text-[var(--color-accent-cyan)] hover:bg-[var(--color-accent-cyan)] hover:text-[var(--color-bg-dark)] transition-colors flex flex-col items-center"
                >
                  <span className="font-bold mb-1">{type}</span>
                  <span className="text-xs opacity-80 truncate w-full text-center">
                    {archetypes[type].name}
                  </span>
                </button>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}
