import { useRef, useState } from 'react'
import * as htmlToImage from 'html-to-image'
import ResultCard from './ResultCard'

export default function Result({ result, onRestart, userName }) {
  const cardRef = useRef(null)
  const [isGenerating, setIsGenerating] = useState(false)

  // 当前显示的测试结果
  const displayResult = result

  const handleDownload = async () => {
    if (!cardRef.current) return
    
    try {
      setIsGenerating(true)
      
      // 临时移除 CRT 效果以确保字体渲染正确，并还原关闭 CRT 时的内容
      const crtContainer = document.querySelector('.crt');
      let hadCrtCurve = false;
      
      if (crtContainer && crtContainer.classList.contains('crt-curve')) {
        hadCrtCurve = true;
        crtContainer.classList.remove('crt-curve');
      }
      
      // 禁用动画以防止截图时出现重叠或错位
      const style = document.createElement('style');
      style.innerHTML = `
        * {
          animation: none !important;
          transition: none !important;
        }
      `;
      document.head.appendChild(style);

      // 强制重绘并等待 DOM 更新
      if (crtContainer) void crtContainer.offsetWidth;
      await new Promise(resolve => setTimeout(resolve, 150));

      const dataUrl = await htmlToImage.toPng(cardRef.current, {
        quality: 1,
        pixelRatio: 2,
        backgroundColor: '#050300',
        style: {
          transform: 'scale(1)',
          transformOrigin: 'top left',
        },
      });

      // 恢复 CRT 效果和动画
      document.head.removeChild(style);
      if (hadCrtCurve && crtContainer) {
        crtContainer.classList.add('crt-curve');
      }

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
    <div className="flex-1 flex flex-col items-center p-4 py-8 space-y-6 relative w-full min-h-full overflow-y-auto animate-mac-zoom-vertical-container">
      <div className="flex-1 min-h-0"></div>
      <div className="w-full flex flex-col items-center space-y-6 animate-mac-zoom-vertical-content shrink-0">
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
      <div className="flex-1 min-h-0"></div>
    </div>
  )
}
