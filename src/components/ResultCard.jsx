import { forwardRef } from 'react'

const dimensionData = {
  dim1: {
    C: { title: '代码开源倾向', label: 'C', desc: '视代码为核心资产与护城河，倾向于掌控绝对权限，对外部依赖保持警惕。' },
    O: { title: '代码开源倾向', label: 'O', desc: '拥抱开源与分享，乐于参与社区建设，认为代码的价值在于流通与协作。' }
  },
  dim2: {
    S: { title: '架构关注点', label: 'S', desc: '追求系统的稳定与可靠，偏爱经过时间检验的成熟技术，对盲目追新嗤之以鼻。' },
    I: { title: '架构关注点', label: 'I', desc: '对新技术充满热情，喜欢探索前沿框架与架构，愿意为更高的效率承担试错风险。' }
  },
  dim3: {
    T: { title: '理论与实践', label: 'T', desc: '注重底层逻辑与计算机科学基础，喜欢探究事物的本质，追求代码的严谨与优雅。' },
    P: { title: '理论与实践', label: 'P', desc: '以解决实际问题为导向，不在乎理论是否完美，只要能快速跑通业务就是好代码。' }
  },
  dim4: {
    P: { title: '代码规范度', label: 'P', desc: '有代码洁癖，对命名、格式和设计模式有极高要求，难以容忍任何“坏味道”。' },
    R: { title: '代码规范度', label: 'R', desc: '更看重交付速度与结果，认为代码只要能跑就行，不拘泥于死板的规范与格式。' }
  }
}

const subDimensionData = {
  CO1: { title: '知识共享意愿', desc: '是否愿意将自己的知识和代码与他人分享。' },
  CO2: { title: '外部依赖态度', desc: '对第三方库、开源组件等外部依赖的接纳程度。' },
  CO3: { title: '协作开放度', desc: '在团队中与他人沟通、协作和接受建议的意愿。' },
  SI1: { title: '技术尝新意愿', desc: '对新框架、新语言等前沿技术的探索热情。' },
  SI2: { title: '架构演进倾向', desc: '在系统架构上面对变化和重构的态度。' },
  SI3: { title: '风险承受度', desc: '在生产环境、部署流程中对潜在风险的容忍度。' },
  TP1: { title: '底层探究欲', desc: '对计算机底层原理、源码和复杂算法的钻研程度。' },
  TP2: { title: '业务导向性', desc: '在技术决策中对业务需求、交付时间的妥协程度。' },
  TP3: { title: '抽象建模倾向', desc: '对代码设计模式、领域模型和系统抽象的追求。' },
  PR1: { title: '规范遵循度', desc: '对代码格式、命名规范等团队约定的遵守程度。' },
  PR2: { title: '质量要求标准', desc: '对异常处理、日志记录和代码“坏味道”的容忍底线。' },
  PR3: { title: '交付妥协度', desc: '在面临交付压力时，对代码质量和技术债的妥协程度。' }
}

const ResultCard = forwardRef(({ code, title, description, subDimensions }, ref) => {
  const dim1 = code[0]
  const dim2 = code[1]
  const dim3 = code[2]
  const dim4 = code[3]

  const dimensions = [
    dimensionData.dim1[dim1],
    dimensionData.dim2[dim2],
    dimensionData.dim3[dim3],
    dimensionData.dim4[dim4]
  ]

  return (
    <div
      ref={ref}
      className="w-full max-w-[400px] bg-[var(--color-bg-dark)] border-4 border-[var(--color-primary)] p-5 relative overflow-hidden shadow-[0_0_30px_rgba(255,153,0,0.3)]"
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
      <div className="flex justify-between items-center border-b-2 border-[var(--color-primary)] pb-3 mb-4">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-[var(--color-primary)] animate-pulse"></div>
          <span className="text-sm font-bold tracking-widest" style={{ textShadow: '0 0 5px #ff9900' }}>SYS.ID: {code}</span>
        </div>
        <div className="text-xs text-[var(--color-accent-cyan)]" style={{ textShadow: '0 0 5px #00ffff' }}>
          VERIFIED
        </div>
      </div>

      {/* 核心结果 */}
      <div className="text-center mb-6 relative">
        <div className="absolute inset-0 bg-[var(--color-primary)] opacity-10 blur-xl"></div>
        <h1 className="text-5xl font-bold mb-1 tracking-tighter" style={{ textShadow: '0 0 15px #ff9900' }}>
          {code}
        </h1>
        <h2 className="text-xl font-bold text-[var(--color-bg-dark)] bg-[var(--color-primary)] inline-block px-3 py-1 shadow-[0_0_15px_rgba(255,153,0,0.8)]">
          {title}
        </h2>
      </div>

      {/* 描述区域 */}
      <div className="bg-[var(--color-bg-card)] border border-[var(--color-primary)] p-3 mt-4 mb-4">
        <div className="text-xs text-[var(--color-accent-cyan)] font-bold mb-2">
          {'>'} 人格描述 (PERSONALITY)
        </div>
        <p className="text-xs leading-relaxed" style={{ textShadow: '0 0 2px #ff9900' }}>
          {description}
        </p>
      </div>

      {/* 纬度画像区域 */}
      <div className="bg-[var(--color-bg-card)] border border-[var(--color-primary)] p-3 mt-4 mb-4">
        <div className="text-xs text-[var(--color-accent-cyan)] font-bold mb-3">
          {'>'} 纬度画像 (DIMENSIONS)
        </div>
        <div className="flex flex-col gap-3">
          {dimensions.map((dim, index) => (
            <div key={index} className="flex flex-col">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[var(--color-accent-cyan)] font-bold text-xs">{dim.title}</span>
                <span className="bg-[var(--color-primary)] text-[var(--color-bg-dark)] px-1 text-[10px] font-bold">{dim.label}</span>
              </div>
              <p className="text-[10px] leading-snug opacity-90" style={{ textShadow: '0 0 2px #ff9900' }}>
                {dim.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* 详细子维度画像 */}
      {subDimensions && Object.keys(subDimensions).length > 0 && (
        <div className="bg-[var(--color-bg-card)] border border-[var(--color-primary)] p-3 mt-4 mb-4">
          <div className="text-xs text-[var(--color-accent-cyan)] font-bold mb-3">
            {'>'} 详细画像 (SUB-DIMENSIONS)
          </div>
          <div className="grid grid-cols-2 gap-x-3 gap-y-2">
            {Object.entries(subDimensions).map(([key, level]) => (
              <div key={key} className="flex justify-between items-center text-[10px] border-b border-[var(--color-primary)] border-opacity-30 pb-0.5">
                <span className="opacity-90">{subDimensionData[key]?.title || key}</span>
                <span className={`font-bold ${level === 'H' ? 'text-green-400' : level === 'L' ? 'text-red-400' : 'text-yellow-400'}`}>
                  {level}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 底部条码样式 */}
      <div className="flex flex-col items-center border-t-2 border-[var(--color-primary)] pt-4 mt-2">
        <div className="flex gap-1 h-6 mb-1 w-full justify-center opacity-80">
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
        <div className="text-[10px] tracking-[0.3em] opacity-80">
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