import { useRef, useState } from 'react'
import * as htmlToImage from 'html-to-image'
import ResultCard from './ResultCard'
import { archetypes } from '../data/archetypes.js'

export default function Result({ result, onRestart, userName, desktopLayoutMode }) {
  const cardRef = useRef(null)
  const [isGenerating, setIsGenerating] = useState(false)

  // 当前显示的测试结果
  const displayResult = result

  const handleDownload = async () => {
    if (!cardRef.current) return
    
    try {
      setIsGenerating(true)
      
      const dataUrl = await htmlToImage.toPng(cardRef.current, {
        quality: 1,
        pixelRatio: 2,
        backgroundColor: '#000000',
        style: {
          transform: 'scale(1)',
          transformOrigin: 'top left',
        }
      });

      const link = document.createElement('a')
      link.download = `developer-profile-${displayResult.typeCode.toLowerCase()}.png`
      link.href = dataUrl
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    } catch (error) {
      console.error('Failed to generate image:', error)
      alert('SYS.ERROR: 无法生成档案，请重试。')
    } finally {
      setIsGenerating(false)
    }
  }

  if (!displayResult) return null

  return (
    <div className="flex-1 flex flex-col items-center justify-start p-4 py-8 space-y-6 relative w-full min-h-full overflow-y-auto animate-mac-zoom-vertical-container">
      <div className="w-full flex flex-col items-center space-y-6 animate-mac-zoom-vertical-content my-auto">
        {/* The Result Card to be captured */}
        <div className="flex justify-center w-full animate-slide-up flex-shrink-0">
          <ResultCard 
            ref={cardRef} 
            code={displayResult.typeCode} 
            title={displayResult.name || displayResult.typeName} 
            description={displayResult.description} 
            tags={displayResult.tags}
            subDimensions={displayResult.subDimensions}
            userName={userName}
            role={displayResult.role}
            avatarId={displayResult.avatarId}
            layoutMode={desktopLayoutMode}
          />
        </div>

        {/* 占位边距 */}
        <div className="h-5"></div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 w-full max-w-[400px]">
          <button
            onClick={handleDownload}
            disabled={isGenerating}
            className={`flex-1 retro-btn py-4 px-6 font-bold uppercase tracking-widest text-sm sm:text-base ${
              isGenerating ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {isGenerating ? '> EXPORTING...' : '> EXPORT_PROFILE'}
          </button>
          
          <button
            onClick={onRestart}
            className="flex-1 border-2 border-[var(--color-accent-cyan)] text-[var(--color-accent-cyan)] bg-transparent hover:bg-[var(--color-accent-cyan)] hover:text-[var(--color-bg-dark)] shadow-[inset_0_0_10px_rgba(255,51,0,0.2),0_0_10px_rgba(255,51,0,0.2)] hover:shadow-[0_0_20px_rgba(255,51,0,0.8)] transition-all duration-200 py-4 px-6 font-bold uppercase tracking-widest text-sm sm:text-base"
          >
            {'>'} REBOOT_SYS
          </button>
        </div>
        
        {/* 底部提示 */}
        <p className="text-[var(--color-text-muted)] text-xs uppercase tracking-widest">
          {'>'} ANALYSIS COMPLETE. PRESS ANY KEY TO CONTINUE... <span className="animate-blink">_</span>
        </p>
      </div>
    </div>
  )
}
