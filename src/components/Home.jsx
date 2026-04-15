import { useState } from 'react';
import { archetypes } from '../data/archetypes.js';
import ResultCard from './ResultCard';

export default function Home({ onStart, galleryLayoutMode = 'A' }) {
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
          <div className="flex flex-wrap justify-center items-center gap-4 w-full">
            <a
              href="https://github.com/WUTONK/SBTIProgrammer"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--color-primary)] text-sm px-3 py-1 border border-[var(--color-primary)] bg-[var(--color-bg-card)] shadow-[0_0_5px_rgba(255,153,0,0.5)] hover:bg-[var(--color-primary)] hover:text-[var(--color-bg-dark)] transition-colors flex items-center gap-1.5"
              style={{ textDecoration: 'none' }}
            >
              <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-current" xmlns="http://www.w3.org/2000/svg" style={{ shapeRendering: 'crispEdges' }}>
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
              [GITHUB]
            </a>
            {['16_TYPES', '可导出结果'].map((tag) => (
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
            V1.0.0 | 结果不上传 | WUTONK@2026
          </p>
        </div>
      </div>

      {/* Gallery Modal */}
      {showGallery && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm animate-fade-in p-4">
          {/* 关键修复 1：将 max-h-[90vh] 改为固定的 h-[85vh]，并去掉了可能干扰的 overflow-hidden */}
          <div className="w-[95%] md:w-[85%] lg:w-[75%] max-w-6xl h-[85vh] flex flex-col bg-[var(--color-bg-dark)] border-2 border-[var(--color-primary)] shadow-[0_0_50px_rgba(255,153,0,0.2)] animate-mac-zoom relative">
            
            {/* Terminal Header (保持不变) */}
            <div className="flex justify-between items-center p-2 md:p-3 border-b-2 border-[var(--color-primary)] bg-[var(--color-primary)]/10 relative z-10 shrink-0">
              <div className="flex items-center gap-3">
                <div className="flex gap-1.5 ml-1 mr-2 md:ml-2 md:mr-4">
                   <span className="w-3 h-3 border border-[var(--color-primary)] opacity-50"></span>
                   <span className="w-3 h-3 border border-[var(--color-primary)] opacity-80"></span>
                   <span className="w-3 h-3 bg-[var(--color-primary)] animate-pulse"></span>
                </div>
                <span className="text-[var(--color-primary)] font-bold text-xs md:text-sm tracking-widest uppercase">
                  C:\SYS\DB\GALLERY.EXE
                </span>
              </div>
              <button
                onClick={() => setShowGallery(false)}
                className="text-[var(--color-primary)] hover:text-[var(--color-bg-dark)] hover:bg-[var(--color-primary)] transition-colors px-3 py-1 text-xs md:text-sm font-bold flex items-center gap-2 border border-transparent"
              >
                [X] CLOSE
              </button>
            </div>
            
            {/* Content Area - 关键修复 2：加了 h-0 min-h-0 强制接管高度产生滚动条 */}
            <div className="flex-1 h-0 min-h-0 overflow-y-auto p-4 md:p-8 custom-scrollbar bg-[linear-gradient(to_bottom,transparent_50%,rgba(255,153,0,0.03)_50%)] bg-[length:100%_4px]">
              <div className="mx-auto">
                <div className="flex items-center gap-3 mb-8">
                  <h2 className="text-xl md:text-2xl font-bold text-[var(--color-primary)] tracking-widest glow-text uppercase" style={{ textShadow: '0 0 10px #ff9900' }}>
                    &gt; 人格图鉴_GALLERY
                  </h2>
                  <span className="animate-blink text-[var(--color-primary)] text-xl font-bold">_</span>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 pb-12">
                  {Object.entries(archetypes).map(([key, data]) => (
                      <div 
                        key={key} 
                        onClick={() => handlePreview(key)}
                        className="retro-card flex flex-col items-center justify-start p-5 text-center transition-all duration-300 cursor-pointer group hover:border-[var(--color-accent-cyan)] hover:bg-[var(--color-primary)]/5 hover:scale-105 hover:-translate-y-1 hover:shadow-[0_10px_20px_rgba(0,255,255,0.15)] relative overflow-hidden"
                        style={{ minHeight: '260px' }}
                      >
                        {/* Decorative corner accents */}
                        <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-[var(--color-primary)] opacity-50 group-hover:border-[var(--color-accent-cyan)] group-hover:opacity-100 transition-colors"></div>
                        <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-[var(--color-primary)] opacity-50 group-hover:border-[var(--color-accent-cyan)] group-hover:opacity-100 transition-colors"></div>

                        {/* Layout Mode Content */}
                        {galleryLayoutMode === 'A' ? (
                          <>
                            {/* Mode A: Type -> Avatar -> Name */}
                            <div className="text-4xl font-black text-[var(--color-primary)] mb-1 group-hover:text-[var(--color-accent-cyan)] transition-colors tracking-tighter" style={{ textShadow: '0 0 8px rgba(255,153,0,0.5)' }}>
                              {key}
                            </div>
                            <div className="w-20 h-20 mb-3 shrink-0" style={{ marginTop: '4px' }}>
                              <img 
                                src={`/avatar/${data.avatarId}.webp`} 
                                alt={data.name}
                                className="w-full h-full object-cover border border-[var(--color-primary)]/50 bg-[var(--color-bg-dark)]"
                              />
                            </div>
                            <div className="text-[var(--color-bg-dark)] bg-[var(--color-accent-cyan)] font-bold mb-3 text-xs md:text-sm px-2 py-0.5 shadow-[0_0_8px_rgba(0,255,255,0.6)]">
                              {data.name}
                            </div>
                          </>
                        ) : (
                          <>
                            {/* Mode B: Type -> Name -> Avatar */}
                            <div className="text-4xl font-black text-[var(--color-primary)] mb-1 group-hover:text-[var(--color-accent-cyan)] transition-colors tracking-tighter" style={{ textShadow: '0 0 8px rgba(255,153,0,0.5)' }}>
                              {key}
                            </div>
                            <div className="text-[var(--color-bg-dark)] bg-[var(--color-accent-cyan)] font-bold text-xs md:text-sm px-2 py-0.5 shadow-[0_0_8px_rgba(0,255,255,0.6)]">
                              {data.name}
                            </div>
                            <div className="w-20 h-20 mb-3 shrink-0" style={{ marginTop: '12px' }}>
                              <img 
                                src={`/avatar/${data.avatarId}.webp`} 
                                alt={data.name}
                                className="w-full h-full object-cover border border-[var(--color-primary)]/50 bg-[var(--color-bg-dark)]"
                              />
                            </div>
                          </>
                        )}

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
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/95 backdrop-blur-md animate-fade-in">
          <div className="w-[95%] md:w-[85%] lg:w-[75%] max-w-5xl h-[85vh] max-h-[850px] flex flex-col animate-mac-zoom">
            {/* Preview Toolbar */}
            <div className="shrink-0 flex justify-between items-center mb-6 z-[70] bg-[var(--color-bg-dark)]/90 border border-[var(--color-primary)] p-3 shadow-[0_5px_15px_rgba(0,0,0,0.5)]">
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
            <div className="flex-1 min-h-0 overflow-y-auto custom-scrollbar drop-shadow-2xl pb-8 flex flex-col">
              <div className="flex-1 min-h-0"></div>
              <div className="flex justify-center shrink-0 w-full">
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
              <div className="flex-1 min-h-0"></div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
