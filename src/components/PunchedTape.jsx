import { useState, useEffect, useRef } from 'react';

/**
 * 辅助组件：用于在像素网格中绘制单个“像素块”
 */
const SpriteBlock = ({ x, y, w, h, bg, className = '' }) => (
  <div
    className={`absolute ${bg} ${className}`}
    style={{
      left: `${x}px`,
      top: `${y}px`,
      width: `${w}px`,
      height: `${h}px`,
    }}
  />
);

export default function PunchedTape({ currentIndex, answers, totalQuestions, onJump, isShaking, isFalling, tapeBodyRef }) {
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
  const pixelCircle = 'polygon(25% 0%, 75% 0%, 100% 25%, 100% 75%, 75% 100%, 25% 100%, 0% 75%, 0% 25%)';

  return (
    <div className="flex flex-col items-center w-full relative">
      <style>{`
        @keyframes pixelSparkAnim {
          0% { opacity: 1; transform: scale(0.8); }
          30% { opacity: 1; transform: scale(1.2); }
          60% { opacity: 1; transform: scale(1); }
          100% { opacity: 0; transform: scale(1); }
        }
        .animate-pixel-spark {
          animation: pixelSparkAnim 0.15s steps(1, end) forwards;
        }
      `}</style>

      {/* 8-bit 像素打孔机核心组件 — 缩小尺寸从 scale(4) 到 scale(2.5) */}
      <div className={`relative mb-2 z-30 transition-opacity duration-200 ${isFalling ? 'opacity-0' : 'opacity-100'}`} style={{ width: '90px', height: '80px' }}>
        <div
          className="absolute top-0 left-0 origin-top-left"
          style={{ width: '36px', height: '32px', transform: 'scale(2.5)' }}
        >
          {/* LAYER 2: C型机器黑色外轮廓 */}
          <SpriteBlock x={2} y={1} w={30} h={10} bg="bg-zinc-900" />
          <SpriteBlock x={2} y={11} w={12} h={10} bg="bg-zinc-900" />
          <SpriteBlock x={0} y={21} w={36} h={11} bg="bg-zinc-900" />

          {/* LAYER 3: 工业灰主色 */}
          <SpriteBlock x={3} y={2} w={28} h={8} bg="bg-zinc-600" />
          <SpriteBlock x={3} y={10} w={10} h={12} bg="bg-zinc-600" />
          <SpriteBlock x={1} y={22} w={34} h={9} bg="bg-zinc-600" />

          {/* LAYER 4: 像素高光 */}
          <SpriteBlock x={3} y={2} w={28} h={1} bg="bg-zinc-400" />
          <SpriteBlock x={3} y={3} w={1} h={7} bg="bg-zinc-400" />
          <SpriteBlock x={3} y={10} w={1} h={12} bg="bg-zinc-400" />
          <SpriteBlock x={13} y={22} w={22} h={1} bg="bg-zinc-400" />
          <SpriteBlock x={1} y={22} w={1} h={9} bg="bg-zinc-400" />

          {/* LAYER 5: 像素阴影 */}
          <SpriteBlock x={30} y={3} w={1} h={7} bg="bg-zinc-800" />
          <SpriteBlock x={13} y={9} w={18} h={1} bg="bg-zinc-800" />
          <SpriteBlock x={12} y={10} w={1} h={12} bg="bg-zinc-800" />
          <SpriteBlock x={34} y={23} w={1} h={8} bg="bg-zinc-800" />
          <SpriteBlock x={2} y={30} w={33} h={1} bg="bg-zinc-800" />

          {/* LAYER 6: 细节 */}
          <SpriteBlock x={6} y={13} w={4} h={1} bg="bg-zinc-800" />
          <SpriteBlock x={6} y={16} w={4} h={1} bg="bg-zinc-800" />
          <SpriteBlock x={6} y={19} w={4} h={1} bg="bg-zinc-800" />
          <SpriteBlock x={10} y={4} w={6} h={2} bg="bg-red-600" />
          <SpriteBlock
            x={24} y={4} w={2} h={2}
            bg={isPunching ? "bg-amber-300" : "bg-amber-600"}
            className={isPunching ? "shadow-[0_0_4px_#fcd34d]" : ""}
          />

          {/* LAYER 7: 动态针头 */}
          <div
            className="absolute bg-zinc-300 z-10"
            style={{
              left: '21px',
              width: '4px',
              height: '10px',
              borderStyle: 'solid',
              borderColor: '#18181b',
              borderWidth: '0 1px 1px 1px',
              top: isPunching ? '12px' : '8px',
              transition: 'top 0.1s steps(2, end)',
            }}
          />
          <SpriteBlock x={19} y={10} w={8} h={4} bg="bg-zinc-900" className="z-20" />
          <SpriteBlock x={20} y={10} w={6} h={3} bg="bg-zinc-800" className="z-20" />

          {/* LAYER 8: 十字火花 */}
          <div
            className={`absolute z-30 origin-center ${isPunching ? 'animate-pixel-spark' : 'opacity-0'}`}
            style={{ left: '21px', top: '19px', width: '4px', height: '4px' }}
          >
            <SpriteBlock x={1} y={1} w={2} h={2} bg="bg-white" />
            <SpriteBlock x={1} y={0} w={2} h={1} bg="bg-amber-400" />
            <SpriteBlock x={1} y={3} w={2} h={1} bg="bg-amber-400" />
            <SpriteBlock x={0} y={1} w={1} h={2} bg="bg-amber-400" />
            <SpriteBlock x={3} y={1} w={1} h={2} bg="bg-amber-400" />
          </div>
        </div>
      </div>

      {/* 纸带主体 */}
      <div ref={tapeBodyRef} className={`relative z-40 ${isShaking ? 'animate-tape-shake' : ''}`}>
        <div className={`relative bg-[#d1c4a9] text-black p-2 font-mono text-[10px] md:text-xs shadow-[4px_4px_0_rgba(0,0,0,0.5)] border-2 border-[#b3a68c] w-[340px] ${isFalling ? 'pointer-events-none' : ''}`}>
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
                      className={`w-3 h-3 border-2 cursor-pointer transition-all flex items-center justify-center
                        ${answered ? 'bg-black border-black' : 'bg-transparent border-black/30'}
                        ${current ? 'ring-2 ring-red-500 animate-pulse scale-110 z-10' : 'hover:scale-125 hover:bg-black/20'}`}
                      style={{ clipPath: pixelCircle }}
                    >
                      {answered && <div className="w-1 h-1 bg-white/20" style={{ clipPath: pixelCircle }}></div>}
                    </div>
                  );
                })}
              </div>
              <div className="w-1"></div>
              <div className="w-10 opacity-60 font-bold scale-90 whitespace-nowrap text-center">
                {String(rowIdx * 10 + 1).padStart(2, '0')}-{String(rowIdx * 10 + 10).padStart(2, '0')}
              </div>
              <div className="w-1"></div>
              <div className={`tracking-widest font-bold flex gap-0.5 ${currentIndex >= rowIdx * 10 && currentIndex < (rowIdx + 1) * 10 ? 'text-red-600' : 'text-black'}`}>
                {getHexPreview(rowIdx).split('').map((char, i) => (
                  <span key={i} className={char !== '-' ? 'bg-black/10 px-0.5' : ''}>{char}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {isCorrecting && !isFalling && (
        <div className="absolute top-24 left-1/2 -translate-x-1/2 w-screen h-8 bg-white/40 backdrop-blur-sm z-50 pointer-events-none flex items-center justify-center border-y-2 border-white animate-correct-slide">
          <span className="text-[10px] text-white font-bold tracking-widest">REPAIRING_TAPE...</span>
        </div>
      )}
    </div>
  );
}
