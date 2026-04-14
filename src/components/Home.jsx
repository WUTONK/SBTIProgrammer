import { useState } from 'react';
import { archetypes } from '../data/archetypes.js';
import ResultCard from './ResultCard';

export default function Home({ onStart }) {
  const [showGallery, setShowGallery] = useState(false);
  const [userName, setUserName] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [previewType, setPreviewType] = useState(null);

  const handlePreview = (key) => {
    setPreviewType(key);
  };

  const closePreview = () => {
    setPreviewType(null);
  };

  // Mock subDimensions for preview
  const mockSubDimensions = {
    CO1: 'H', CO2: 'M', CO3: 'L',
    SI1: 'H', SI2: 'H', SI3: 'M',
    TP1: 'L', TP2: 'M', TP3: 'H',
    PR1: 'H', PR2: 'L', PR3: 'M'
  };

  return (
    <div className="flex-1 flex flex-col items-center justify-center px-4 py-8 relative">
      <div className="max-w-lg w-full text-center animate-fade-in flex flex-col gap-12">
        
        <div className="retro-card rounded-none p-6 md:p-8 text-left relative">
          <div className="flex border-b border-[var(--color-primary)] pb-2 mb-6">
            <span className="w-3 h-3 bg-[var(--color-primary)] mr-2"></span>
            <span className="w-3 h-3 bg-[var(--color-primary)] mr-2 opacity-50"></span>
            <span className="w-3 h-3 bg-[var(--color-primary)] opacity-20"></span>
            <span className="ml-auto text-xs glow-text">|LANG:ZH-CN</span>
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
            <div className="flex items-center w-full border border-[var(--color-primary)] bg-[var(--color-bg-card)] px-3 py-2 shadow-[inset_0_0_10px_rgba(255,153,0,0.1)] focus-within:shadow-[inset_0_0_15px_rgba(255,153,0,0.3)] transition-shadow relative">
              <span className="text-[var(--color-primary)] mr-2">{'>'}</span>
              <div className="relative flex-1">
                <input
                  type="text"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  onFocus={() => setIsFocused(true)}
                  onBlur={() => setIsFocused(false)}
                  className="bg-transparent border-none outline-none text-[var(--color-primary)] w-full uppercase font-bold"
                  placeholder=""
                  maxLength={16}
                  spellCheck="false"
                />
                {!userName && !isFocused && (
                  <div className="absolute left-0 top-0 pointer-events-none flex items-center h-full">
                    <span className="text-[var(--color-primary)] opacity-30 uppercase font-bold">GUEST</span>
                    <span className="animate-blink text-[var(--color-primary)] ml-1">_</span>
                  </div>
                )}
              </div>
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
            V1.0.0 | 纯前端—无上传 | WUTONK@2026
          </p>
        </div>
      </div>

      {/* Gallery Modal */}
      {showGallery && (
        <div className="fixed inset-0 z-50 flex justify-center bg-black/80 backdrop-blur-sm animate-fade-in">
          <div className="absolute top-4 left-4 right-4 bottom-0 md:top-[100px] md:left-[100px] md:right-[100px] flex flex-col bg-[var(--color-bg-dark)] border-l border-r border-t border-[var(--color-primary)] overflow-hidden shadow-[0_-20px_50px_rgba(255,153,0,0.15)] animate-slide-up">
            
            {/* Header */}
            <div className="flex justify-between items-center p-4 md:p-6 border-b border-[var(--color-primary)] bg-[var(--color-bg-dark)] relative z-10">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-[var(--color-primary)] animate-pulse"></div>
                <h2 className="text-xl md:text-2xl font-bold text-[var(--color-primary)] tracking-widest" style={{ textShadow: '0 0 10px #ff9900' }}>
                  [ 人格图鉴 GALLERY ]
                </h2>
              </div>
              <button
                onClick={() => setShowGallery(false)}
                className="text-[var(--color-primary)] hover:text-[var(--color-bg-dark)] hover:bg-[var(--color-accent-red)] border border-transparent hover:border-[var(--color-accent-red)] transition-colors px-3 py-1 text-sm md:text-base cursor-pointer font-bold flex items-center gap-2"
              >
                <span>[X]</span> <span className="hidden sm:inline">CLOSE_DB</span>
              </button>
            </div>
            
            {/* Content Area */}
            <div className="flex-1 overflow-y-auto p-4 md:p-8 custom-scrollbar bg-[linear-gradient(to_bottom,transparent_50%,rgba(255,153,0,0.03)_50%)] bg-[length:100%_4px]">
              <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6 pb-12">
                  {Object.entries(archetypes).map(([key, data]) => (
                    <div 
                      key={key} 
                      onClick={() => handlePreview(key)}
                      className="retro-card flex flex-col items-center justify-start p-5 text-center transition-all duration-300 cursor-pointer group hover:border-[var(--color-accent-cyan)] hover:bg-[var(--color-primary)]/5 hover:scale-105 hover:-translate-y-1 hover:shadow-[0_10px_20px_rgba(0,255,255,0.15)] relative overflow-hidden"
                      style={{ minHeight: '220px' }}
                    >
                      {/* Decorative corner accents */}
                      <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-[var(--color-primary)] opacity-50 group-hover:border-[var(--color-accent-cyan)] group-hover:opacity-100 transition-colors"></div>
                      <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-[var(--color-primary)] opacity-50 group-hover:border-[var(--color-accent-cyan)] group-hover:opacity-100 transition-colors"></div>

                      <div className="text-4xl font-black text-[var(--color-primary)] mb-3 group-hover:text-[var(--color-accent-cyan)] transition-colors tracking-tighter" style={{ textShadow: '0 0 8px rgba(255,153,0,0.5)' }}>
                        {key}
                      </div>
                      <div className="text-[var(--color-bg-dark)] bg-[var(--color-accent-cyan)] font-bold mb-3 text-xs md:text-sm px-2 py-0.5 shadow-[0_0_8px_rgba(0,255,255,0.6)]">
                        {data.name}
                      </div>
                      <div className="text-[var(--color-text-muted)] text-xs leading-relaxed line-clamp-3 flex-1 flex items-center">
                        {data.role}
                      </div>
                      
                      <div className="w-full mt-4 pt-3 border-t border-dashed border-[var(--color-primary)]/30 text-[10px] text-[var(--color-primary)] opacity-50 group-hover:opacity-100 group-hover:text-[var(--color-accent-cyan)] transition-all tracking-widest flex justify-between items-center">
                        <span>SYS.ID: {key}</span>
                        <span className="animate-pulse">&gt; VIEW</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Preview Modal */}
      {previewType && (
        <div className="fixed inset-0 z-[60] bg-black/95 backdrop-blur-md flex flex-col items-center justify-start p-4 overflow-y-auto custom-scrollbar animate-fade-in">
          <div className="w-full max-w-5xl mt-4 md:mt-8 mb-20 animate-scale-in">
            {/* Preview Toolbar */}
            <div className="flex justify-between items-center mb-6 sticky top-0 z-[70] bg-[var(--color-bg-dark)]/90 border border-[var(--color-primary)] p-3 backdrop-blur-md shadow-[0_5px_15px_rgba(0,0,0,0.5)]">
              <div className="flex items-center gap-3">
                <span className="w-2 h-4 bg-[var(--color-accent-cyan)] animate-pulse"></span>
                <div className="text-[var(--color-accent-cyan)] font-bold tracking-widest text-xs md:text-sm">
                  [ PREVIEW_MODE: <span className="text-[var(--color-primary)]">{previewType}</span> ]
                </div>
              </div>
              <button
                onClick={closePreview}
                className="text-[var(--color-bg-dark)] bg-[var(--color-primary)] hover:bg-[var(--color-accent-cyan)] hover:shadow-[0_0_15px_rgba(0,255,255,0.6)] transition-all font-bold text-xs md:text-sm cursor-pointer px-4 py-2 uppercase tracking-widest"
              >
                &lt; RETURN_TO_DB
              </button>
            </div>
            
            {/* Render Result Card */}
            <div className="flex justify-center drop-shadow-2xl">
              <ResultCard 
                code={previewType} 
                title={archetypes[previewType].name} 
                description={archetypes[previewType].description} 
                tags={archetypes[previewType].tags}
                subDimensions={mockSubDimensions}
                userName="SYS_ADMIN"
                role={archetypes[previewType].role}
                avatarId={archetypes[previewType].avatarId}
                layoutMode="B"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
