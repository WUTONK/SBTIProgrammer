export default function Home({ onStart }) {
  return (
    <div className="flex-1 flex flex-col items-center justify-center px-4 py-8">
      <div className="max-w-lg w-full text-center animate-fade-in flex flex-col gap-12">
        
        <div className="retro-card rounded-none p-6 md:p-8 text-left relative">
          <div className="flex border-b border-[var(--color-primary)] pb-2 mb-6">
            <span className="w-3 h-3 bg-[var(--color-primary)] mr-2"></span>
            <span className="w-3 h-3 bg-[var(--color-primary)] mr-2 opacity-50"></span>
            <span className="w-3 h-3 bg-[var(--color-primary)] opacity-20"></span>
            <span className="ml-auto text-xs glow-text">CMD64.EXE</span>
          </div>
          
          <div className="mb-8">
            <p className="text-[var(--color-primary)] text-sm mb-4">
              C:\{'>'} RUN PROGRAMMER_SBTI.EXE
            </p>
            <h1 className="text-4xl md:text-5xl font-bold text-[var(--color-primary)] mb-4 glow-text uppercase tracking-widest leading-tight">
              Programmer<br/>SBTI
            </h1>
            <p className="glow-text-cyan text-xl uppercase tracking-wider">
              [ 程序员性格测试 ]
            </p>
          </div>

          <div className="border-t border-[var(--color-primary)]/30 pt-6">
            <p className="text-[var(--color-primary)] text-base leading-relaxed">
              {'>'} INITIALIZING SYSTEM... <span className="text-[var(--color-accent-cyan)]">OK</span><br/>
              {'>'} LOADING PERSONALITY MODULES... <span className="text-[var(--color-accent-cyan)]">OK</span><br/>
              {'>'} READY TO ANALYZE PROGRAMMING HABITS.<br/>
              <br/>
              DISCOVER YOUR UNIQUE <span className="glow-text-cyan font-bold">DEVELOPER ARCHETYPE</span> IN 2 MINUTES.
            </p>
          </div>
        </div>

        <div className="flex flex-col items-center gap-8">
          <div className="flex flex-wrap justify-center gap-4 w-full">
            {['SYS.FAST', '16_TYPES', 'SHAREABLE'].map((tag) => (
              <span
                key={tag}
                className="text-[var(--color-primary)] text-sm px-3 py-1 border border-[var(--color-primary)] bg-[var(--color-bg-card)] shadow-[0_0_5px_rgba(255,153,0,0.5)]"
              >
                [{tag}]
              </span>
            ))}
          </div>

          <button
            onClick={onStart}
            className="retro-btn w-full max-w-xs font-bold py-5 px-8 text-xl uppercase tracking-widest cursor-pointer"
          >
            <span className="">{'>'} START_TEST</span>
            <span className="ml-2 animate-blink">_</span>
          </button>

          <p className="text-[var(--color-text-muted)] text-xs">
            V1.0.0 | PURE FRONTEND | NO TRACKING
          </p>
        </div>
      </div>
    </div>
  )
}
