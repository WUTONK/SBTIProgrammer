import { useState, useEffect, useRef } from 'react';

export default function PunchedTape({ currentIndex, answers, totalQuestions, onJump }) {
  const [lastAction, setLastAction] = useState({ type: null, timestamp: 0 });
  const [tapeStage, setTapeStage] = useState('entering'); // 'entering', 'active'
  const prevAnswersRef = useRef([]);

  // 监听状态变化触发动画
  useEffect(() => {
    const prevAnswers = prevAnswersRef.current;
    const now = Date.now();

    if (answers.length > prevAnswers.length) {
      setLastAction({ type: 'punch', timestamp: now });
    } else if (answers.length === prevAnswers.length && answers.length > 0) {
      // 检查内容是否改变
      const hasChanged = answers.some((ans, i) => ans?.text !== prevAnswers[i]?.text);
      if (hasChanged) {
        setLastAction({ type: 'correct', timestamp: now });
      }
    }
    prevAnswersRef.current = JSON.parse(JSON.stringify(answers));
    setTapeStage('active');
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
    <div className={`flex flex-col items-center w-full transition-all duration-1000 ${tapeStage === 'entering' ? '-translate-y-full opacity-0' : 'translate-y-0 opacity-100'}`}>
      
      {/* 像素打孔机 */}
      <div className="relative mb-2">
        <div className={`w-16 h-12 bg-[var(--color-primary-dark)] border-4 border-[var(--color-primary)] relative flex items-end justify-center pb-1 transition-transform ${isPunching ? 'translate-y-1' : ''}`}
             style={{ clipPath: 'polygon(0 0, 100% 0, 100% 70%, 80% 100%, 20% 100%, 0 70%)' }}>
          <div className="w-8 h-2 bg-[var(--color-bg-dark)] border-2 border-[var(--color-primary)] mb-1"></div>
          {/* 打孔火花 */}
          {isPunching && <div className="absolute -bottom-2 w-10 h-1 bg-[var(--color-primary)] animate-pulse shadow-[0_0_10px_var(--color-primary)]"></div>}
        </div>
        
        {/* 修正带滑过动画 */}
        {isCorrecting && (
          <div className="absolute top-1/2 left-[-150%] w-[400%] h-6 bg-white/30 backdrop-blur-sm z-50 pointer-events-none flex items-center justify-center border-y-2 border-white animate-correct-slide">
            <span className="text-[10px] text-white font-bold tracking-tighter">CORRECTING_TAPE_APPLYING...</span>
          </div>
        )}
      </div>

      {/* 纸带主体 */}
      <div className="relative bg-[#d1c4a9] text-black p-2 font-mono text-[10px] md:text-xs shadow-[4px_4px_0_rgba(0,0,0,0.5)] border-2 border-[#b3a68c]">
        {/* 纸带边缘锯齿感 */}
        <div className="absolute -left-1 top-0 bottom-0 w-1 flex flex-col justify-around">
          {[...Array(20)].map((_, i) => <div key={i} className="w-1 h-1 bg-[var(--color-bg-dark)] opacity-10"></div>)}
        </div>

        {rows.map(rowIdx => (
          <div key={rowIdx} className="flex items-center gap-3 py-1 border-b border-black/10 last:border-0">
            {/* 孔洞 1-10 */}
            <div className="flex gap-1.5">
              {[...Array(10)].map((_, colIdx) => {
                const qIdx = rowIdx * 10 + colIdx;
                const answered = !!answers[qIdx];
                const current = currentIndex === qIdx;
                return (
                  <div 
                    key={colIdx}
                    onClick={() => onJump(qIdx)}
                    className={`w-3 h-3 border-2 cursor-pointer transition-colors flex items-center justify-center
                      ${answered ? 'bg-black border-black' : 'bg-transparent border-black/30'}
                      ${current ? 'ring-2 ring-red-500 animate-pulse scale-110 z-10' : ''}`}
                  >
                    {answered && <div className="w-1 h-1 bg-white/20"></div>}
                  </div>
                );
              })}
            </div>

            <div className="w-px h-4 bg-black/40"></div>

            {/* 索引 */}
            <div className="w-10 opacity-60 font-bold scale-90">
              {String(rowIdx * 10 + 1).padStart(2, '0')}-{String(rowIdx * 10 + 10).padStart(2, '0')}
            </div>

            <div className="w-px h-4 bg-black/40"></div>

            {/* HEX 预览区 */}
            <div className={`tracking-widest font-bold flex gap-0.5 ${currentIndex >= rowIdx * 10 && currentIndex < (rowIdx + 1) * 10 ? 'text-red-600' : 'text-black'}`}>
              {getHexPreview(rowIdx).split('').map((char, i) => (
                <span key={i} className={char !== '-' ? 'bg-black/10 px-0.5' : ''}>{char}</span>
              ))}
            </div>
          </div>
        ))}
      </div>

      <style jsx>{`
        @keyframes correct-slide {
          0% { transform: translateX(-100%); opacity: 0; }
          20% { opacity: 1; }
          80% { opacity: 1; }
          100% { transform: translateX(100%); opacity: 0; }
        }
        .animate-correct-slide {
          animation: correct-slide 0.8s steps(20) forwards;
        }
      `}</style>
    </div>
  );
}
