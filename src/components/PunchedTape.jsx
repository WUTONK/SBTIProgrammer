import { useState, useEffect, useRef } from 'react';

export default function PunchedTape({ currentIndex, answers, totalQuestions, onJump, isFalling, isShaking }) {
  const [lastAction, setLastAction] = useState({ type: null, timestamp: 0 });
  const prevAnswersRef = useRef([]);

  useEffect(() => {
    const prevAnswers = prevAnswersRef.current;
    const now = Date.now();
    if (answers.length > prevAnswers.length) {
      setLastAction({ type: 'punch', timestamp: now });
    } else if (answers.length === prevAnswers.length && answers.length > 0) {
      const hasChanged = answers.some((ans, i) => ans?.text !== prevAnswers[i]?.text);
      if (hasChanged) {
        setLastAction({ type: 'correct', timestamp: now });
      }
    }
    prevAnswersRef.current = JSON.parse(JSON.stringify(answers));
  }, [answers]);

  const rows = [0, 1, 2];
  const getHexPreview = (rowIdx) => {
    let result = "";
    for (let i = 0; i < 10; i++) {
      const idx = rowIdx * 10 + i;
      result += answers[idx] ? answers[idx].text.charAt(0) : "-";
    }
    return result;
  };

  const isPunching = lastAction.type === 'punch' && (Date.now() - lastAction.timestamp < 200);
  const isCorrecting = lastAction.type === 'correct' && (Date.now() - lastAction.timestamp < 800);

  return (
    <div className="flex flex-col items-center w-full relative">
      {/* 1. 固定打孔机 */}
      <div className="relative mb-4 z-30">
        <div className={`w-16 h-12 bg-[#2a2a2a] border-4 border-[#555] relative flex items-end justify-center pb-1 transition-transform ${isPunching ? 'translate-y-1' : ''}`}
             style={{ clipPath: 'polygon(0 0, 100% 0, 100% 70%, 80% 100%, 20% 100%, 0 70%)' }}>
          <div className="w-8 h-2 bg-black border-2 border-[#444] mb-1"></div>
          {isPunching && <div className="absolute -bottom-2 w-10 h-1 bg-[var(--color-primary)] animate-pulse"></div>}
        </div>
      </div>

      {/* 2. 纸带本体 - 增加抖动和受控下坠 */}
      <div className={`relative transition-all 
        ${isShaking ? 'animate-shake' : ''}
        ${isFalling ? 'translate-y-[60vh] opacity-0 scale-y-110 blur-[1px] duration-[800ms] ease-in' : 'translate-y-0 opacity-100 duration-[1000ms] ease-in-out'}`}>
        
        <div className="relative bg-[#d1c4a9] text-black p-2 font-mono text-[10px] md:text-xs shadow-[4px_4px_0_rgba(0,0,0,0.5)] border-2 border-[#b3a68c]">
          <div className="absolute -left-1 top-0 bottom-0 w-1 flex flex-col justify-around">
            {[...Array(20)].map((_, i) => <div key={i} className="w-1 h-1 bg-black/10"></div>)}
          </div>

          {rows.map(rowIdx => (
            <div key={rowIdx} className="flex items-center gap-3 py-1 border-b border-black/10 last:border-0">
              <div className="flex gap-1.5">
                {[...Array(10)].map((_, colIdx) => {
                  const qIdx = rowIdx * 10 + colIdx;
                  const answered = !!answers[qIdx];
                  const current = currentIndex === qIdx;
                  return (
                    <div 
                      key={colIdx}
                      onClick={() => !isFalling && !isShaking && onJump(qIdx)}
                      className={`w-3 h-3 border-2 transition-colors flex items-center justify-center
                        ${answered ? 'bg-black border-black' : 'bg-transparent border-black/30'}
                        ${current ? 'ring-2 ring-red-500 animate-pulse' : ''}`}
                    >
                      {answered && <div className="w-1 h-1 bg-white/20"></div>}
                    </div>
                  );
                })}
              </div>
              <div className="w-px h-4 bg-black/40"></div>
              <div className="w-10 opacity-60 font-bold">{String(rowIdx * 10 + 1).padStart(2, '0')}</div>
              <div className="w-px h-4 bg-black/40"></div>
              <div className="tracking-widest font-bold flex gap-0.5">
                {getHexPreview(rowIdx).split('').map((char, i) => (
                  <span key={i} className={char !== '-' ? 'bg-black/10 px-0.5' : ''}>{char}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 修正带效果 */}
      {isCorrecting && !isFalling && (
        <div className="absolute top-24 left-1/2 -translate-x-1/2 w-screen h-8 bg-white/40 backdrop-blur-sm z-50 pointer-events-none flex items-center justify-center border-y-2 border-white animate-correct-slide">
          <span className="text-[10px] text-white font-bold tracking-widest">REPAIRING_TAPE...</span>
        </div>
      )}

      <style jsx>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-2px) rotate(-0.5deg); }
          75% { transform: translateX(2px) rotate(0.5deg); }
        }
        .animate-shake {
          animation: shake 0.1s infinite;
        }
        @keyframes correct-slide {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        .animate-correct-slide {
          animation: correct-slide 0.6s steps(20) forwards;
        }
      `}</style>
    </div>
  );
}
