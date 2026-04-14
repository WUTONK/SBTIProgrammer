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
  const scrollContainerRef = useRef(null);

  useEffect(() => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const columnWidth = 24; // 18px width + gap
      const targetScroll = currentIndex * columnWidth - container.offsetWidth / 2 + columnWidth / 2;
      container.scrollTo({ left: targetScroll, behavior: 'smooth' });
    }
  }, [currentIndex]);

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

  const isPunching = lastAction.type === 'punch' && (Date.now() - lastAction.timestamp < 200);
  const isCorrecting = lastAction.type === 'correct' && (Date.now() - lastAction.timestamp < 800);

  // IBM Punched Card Colors
  const cardBg = '#E4DAC4';
  const inkColor = '#8B635C';
  const holeColor = 'var(--color-bg-dark)';

  return (
    <div className="w-full relative py-4 px-4 flex justify-center">
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
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>

      {/* 内部容器，保持打孔机和纸卡上下垂直居中对齐 */}
      <div className="flex flex-col items-center shrink-0">
        {/* 8-bit 像素打孔机核心组件 */}
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

        {/* 纸带主体包裹容器 - 启用水平滚动 */}
        <div 
          ref={scrollContainerRef}
          className="w-full overflow-x-auto scrollbar-hide"
          style={{ maxWidth: '95vw' }}
        >
          <div 
            ref={tapeBodyRef} 
            className={`relative shrink-0 mx-auto shadow-[4px_4px_15px_rgba(0,0,0,0.5)] transition-transform duration-300 ${isShaking ? 'animate-tape-shake' : ''} ${isFalling ? 'pointer-events-none' : ''}`}
            style={{ 
              width: '760px', 
              backgroundColor: cardBg,
              color: inkColor,
              fontFamily: "'Courier New', Courier, monospace",
              clipPath: 'polygon(20px 0, 100% 0, 100% 100%, 0 100%, 0 20px)',
              padding: '12px 16px 20px 30px',
              userSelect: 'none',
              border: '1px solid #C4B9A3'
            }}
          >
            {/* 左侧垂直印刷文字 */}
            <div 
              className="absolute left-2 top-1/2 -translate-y-1/2 -rotate-90 text-[7px] font-bold tracking-widest opacity-70 origin-center whitespace-nowrap"
            >
              PROGRAMMER SBTI DATA CENTER &lt;wutonk.xyz&gt;
            </div>

            {/* 顶部印刷文字 */}
            <div className="flex justify-between text-[11px] font-bold mb-3 tracking-widest uppercase opacity-80 pl-2">
              <span>{`HELLO, WORLD. THIS IS PROGRAMMER SBTI. AWAITING INPUT...`}</span>
              <span>CDL 0815</span>
            </div>

            {/* 答题孔位网格 */}
            <div className="flex justify-between w-full">
              {Array.from({ length: totalQuestions }).map((_, colIdx) => {
                const answered = answers[colIdx];
                const ansChar = answered ? answered.text.charAt(0).toUpperCase() : null;
                // 映射选项到行数：A->1, B->2, C->3
                const ansNum = ansChar === 'A' ? 1 : ansChar === 'B' ? 2 : ansChar === 'C' ? 3 : null;
                const isCurrent = currentIndex === colIdx;

                return (
                  <div 
                    key={colIdx}
                    onClick={() => !isFalling && !isShaking && onJump(colIdx)}
                    className={`flex flex-col items-center cursor-pointer group w-[18px] transition-colors ${isCurrent ? 'bg-black/10 rounded-sm' : 'hover:bg-black/5 rounded-sm'}`}
                  >
                    {/* 列号 (题号 1-30) */}
                    <div className={`h-6 flex items-center justify-center text-[11px] font-bold my-[2px] ${isCurrent ? 'text-red-600 scale-125' : 'opacity-70'}`}>
                      {colIdx + 1}
                    </div>

                    {/* 1-3 行 */}
                    {[1, 2, 3].map((rowNum) => {
                      const isPunched = ansNum === rowNum;
                      return (
                        <div key={rowNum} className="relative w-full h-5 flex items-center justify-center my-[1px]">
                          {isPunched ? (
                            <div 
                              className="absolute w-[10px] h-[16px] border border-black/20"
                              style={{ backgroundColor: holeColor, boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.8)' }}
                            ></div>
                          ) : (
                            <span className={`text-[11px] font-bold ${isCurrent ? 'opacity-80 text-red-800' : 'opacity-60'} group-hover:opacity-100 transition-opacity`}>
                              {rowNum}
                            </span>
                          )}
                        </div>
                      );
                    })}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {isCorrecting && !isFalling && (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 w-screen h-8 bg-white/40 backdrop-blur-sm z-50 pointer-events-none flex items-center justify-center border-y-2 border-white animate-correct-slide">
          <span className="text-[10px] text-white font-bold tracking-widest">REPAIRING_CARD...</span>
        </div>
      )}
    </div>
  );
}
