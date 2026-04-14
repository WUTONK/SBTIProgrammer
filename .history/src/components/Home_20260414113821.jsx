import { useState } from 'react';
import { archetypes } from '../data/archetypes.js';

export default function Home({ onStart }) {
  const [showGallery, setShowGallery] = useState(false);
  const [userName, setUserName] = useState('');

  return (
    <div className="flex-1 flex flex-col items-center justify-center px-4 py-8 relative">
      <div className="max-w-lg w-full text-center animate-fade-in flex flex-col gap-12">
        
        <div className="retro-card rounded-none p-6 md:p-8 text-left relative">
          <div className="flex border-b border-[var(--color-primary)] pb-2 mb-6">
            <span className="w-3 h-3 bg-[var(--color-primary)] mr-2"></span>
            <span className="w-3 h-3 bg-[var(--color-primary)] mr-2 opacity-50"></span>
            <span className="w-3 h-3 bg-[var(--color-primary)] opacity-20"></span>
            <span className="ml-auto text-xs glow-text">C MD64</span>
          </div>
          
          <div className="mb-8" style={{ paddingLeft: '1ch', paddingRight: '1ch' }}>
            <p className="text-[var(--color-primary)] text-sm mb-4">
              A:\&gt; RUN PROGRAMMER_SBTI.C
            </p>
            <h1 className="text-4xl md:text-5xl font-bold text-[var(--color-primary)] mb-4 glow-text uppercase tracking-widest leading-tight">
              Programmer<br/>SBTI
            </h1>
            <p className="glow-text-cyan text-xl uppercase tracking-wider">
              [ 程序员性格测试 ]
            </p>
          </div>

          <div className="border-t border-[var(--color-primary)]/30 pt-6">
            <div style={{ paddingLeft: '1ch', paddingRight: '1ch' }}>
              <p className="text-[var(--color-primary)] text-base leading-relaxed">
                &gt; INITIALIZING SYSTEM... <span className="text-[var(--color-accent-cyan)]">OK</span><br/>
                &gt; LOADING PERSONALITY MODULES... <span className="text-[var(--color-accent-cyan)]">OK</span><br/>
                &gt; READY TO ANALYZE PROGRAMMING HABITS.<br/>
                <br/>
                DISCOVER YOUR UNIQUE <span className="glow-text-cyan font-bold">DEVELOPER ARCHETYPE</span> IN 2 MINUTES.
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center gap-6 w-full">
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

          <div className="w-full max-w-xs flex flex-col items-start gap-2 mt-2">
            <label className="text-[var(--color-primary)] text-sm uppercase">
              {'>'} ENTER_NAME (OPTIONAL):
            </label>
            <div className="flex items-center w-full border border-[var(--color-primary)] bg-[var(--color-bg-card)] px-3 py-2 shadow-[inset_0_0_10px_rgba(255,153,0,0.1)] focus-within:shadow-[inset_0_0_15px_rgba(255,153,0,0.3)] transition-shadow">
              <span className="text-[var(--color-primary)] mr-2">{'>'}</span>
              <input
                type="text"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                className="bg-transparent border-none outline-none text-[var(--color-primary)] w-full uppercase font-bold placeholder-[var(--color-primary)] placeholder-opacity-30"
                placeholder="GUEST"
                maxLength={16}
                spellCheck="false"
              />
              <span className="animate-blink text-[var(--color-primary)] ml-1">_</span>
            </div>
          </div>

          <button
            onClick={() => onStart(userName)}
            className="retro-btn w-full max-w-xs font-bold py-5 px-8 text-xl uppercase tracking-widest cursor-pointer"
          >
            <span className="">&gt; START_TEST</span>
            <span className="ml-2 animate-blink">_</span>
          </button>

          <button
            onClick={() => setShowGallery(true)}
            className="text-[var(--color-primary)] border border-[var(--color-primary)]/50 hover:bg-[var(--color-primary)]/10 hover:border-[var(--color-primary)] transition-all w-full max-w-xs py-3 px-8 text-sm uppercase tracking-widest cursor-pointer"
          >
            [ 人格图鉴 GALLERY ]
          </button>

          <p className="text-[var(--color-text-muted)] text-xs mt-2">
            V1.0.0 | PURE FRONTEND | NO TRACKING
          </p>
        </div>
      </div>

      {/* Gallery Modal */}
      {showGallery && (
        <div className="fixed inset-0 z-50 bg-[var(--color-bg-dark)]/95 backdrop-blur-sm flex flex-col p-4 md:p-8 overflow-hidden">
          <div className="flex justify-between items-center mb-6 border-b border-[var(--color-primary)] pb-4 max-w-6xl mx-auto w-full">
            <h2 className="text-2xl font-bold text-[var(--color-primary)] glow-text">
              [ 人格图鉴 GALLERY ]
            </h2>
            <button
              onClick={() => setShowGallery(false)}
              className="text-[var(--color-primary)] hover:text-[var(--color-accent-red)] text-xl cursor-pointer font-bold"
            >
              [X] CLOSE
            </button>
          </div>
          
          <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar max-w-6xl mx-auto w-full">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 pb-8">
              {Object.entries(archetypes).map(([key, data]) => (
                <div 
                  key={key} 
                  className="retro-card aspect-square flex flex-col items-center justify-center p-4 text-center hover:scale-105 transition-transform cursor-default group"
                >
                  <div className="text-3xl font-bold text-[var(--color-primary)] mb-2 group-hover:glow-text">
                    {key}
                  </div>
                  <div className="text-[var(--color-accent-cyan)] font-bold mb-1 text-sm md:text-base">
                    {data.name}
                  </div>
                  <div className="text-[var(--color-text-muted)] text-xs md:text-sm line-clamp-2">
                    {data.role}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
