import { forwardRef } from 'react'

const ResultCard = forwardRef(({ code, title, description }, ref) => {
  return (
    <div
      ref={ref}
      className="w-full max-w-[400px] bg-[var(--color-bg-dark)] border-4 border-[var(--color-primary)] p-6 relative overflow-hidden shadow-[0_0_30px_rgba(255,153,0,0.3)]"
      style={{
        fontFamily: "'VT323', 'Share Tech Mono', 'Courier New', monospace",
        color: '#ff9900',
        textTransform: 'uppercase',
        letterSpacing: '1px'
      }}
    >
      {/* 装饰性边框元素 */}
      <div className="absolute top-0 left-0 w-4 h-4 border-t-4 border-l-4 border-[var(--color-accent-cyan)]"></div>
      <div className="absolute top-0 right-0 w-4 h-4 border-t-4 border-r-4 border-[var(--color-accent-cyan)]"></div>
      <div className="absolute bottom-0 left-0 w-4 h-4 border-b-4 border-l-4 border-[var(--color-accent-cyan)]"></div>
      <div className="absolute bottom-0 right-0 w-4 h-4 border-b-4 border-r-4 border-[var(--color-accent-cyan)]"></div>

      {/* 头部信息 */}
      <div className="flex justify-between items-center border-b-2 border-[var(--color-primary)] pb-4 mb-6">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-[var(--color-primary)] animate-pulse"></div>
          <span className="text-sm font-bold tracking-widest" style={{ textShadow: '0 0 5px #ff9900' }}>SYS.ID: {code}</span>
        </div>
        <div className="text-xs text-[var(--color-accent-cyan)]" style={{ textShadow: '0 0 5px #00ffff' }}>
          VERIFIED
        </div>
      </div>

      {/* 核心结果 */}
      <div className="text-center mb-8 relative">
        <div className="absolute inset-0 bg-[var(--color-primary)] opacity-10 blur-xl"></div>
        <h1 className="text-6xl font-bold mb-2 tracking-tighter" style={{ textShadow: '0 0 15px #ff9900' }}>
          {code}
        </h1>
        <h2 className="text-2xl font-bold text-[var(--color-bg-dark)] bg-[var(--color-primary)] inline-block px-4 py-1 shadow-[0_0_15px_rgba(255,153,0,0.8)]">
          {title}
        </h2>
      </div>

      {/* 描述区域 */}
      <div className="bg-[var(--color-bg-card)] border border-[var(--color-primary)] p-4 mb-6 relative">
        <div className="absolute -top-3 left-4 bg-[var(--color-bg-dark)] px-2 text-xs text-[var(--color-accent-cyan)]">
          {'>'} PROFILE_DATA
        </div>
        <p className="text-sm leading-relaxed" style={{ textShadow: '0 0 2px #ff9900' }}>
          {description}
        </p>
      </div>

      {/* 底部条码样式 */}
      <div className="flex flex-col items-center border-t-2 border-[var(--color-primary)] pt-4">
        <div className="flex gap-1 h-8 mb-2 w-full justify-center opacity-80">
          {/* 生成随机条形码 */}
          {Array.from({ length: 30 }).map((_, i) => (
            <div
              key={i}
              className="bg-[var(--color-primary)]"
              style={{
                width: `${Math.random() * 4 + 1}px`,
                height: '100%'
              }}
            ></div>
          ))}
        </div>
        <div className="text-xs tracking-[0.3em] opacity-80">
          PROGRAMMER-SBTI-V1
        </div>
      </div>
      
      {/* 扫描线效果 */}
      <div className="absolute inset-0 pointer-events-none opacity-20" style={{
        background: 'linear-gradient(to bottom, transparent 50%, rgba(0, 0, 0, 0.5) 50%)',
        backgroundSize: '100% 4px'
      }}></div>
    </div>
  )
})

ResultCard.displayName = 'ResultCard'

export default ResultCard
