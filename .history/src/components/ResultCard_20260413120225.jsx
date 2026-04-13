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
  CO1: { 
    title: '知识共享意愿', 
    H: '积极的开源布道者，任何代码和知识都应该开放共享。',
    M: '愿意在适当时机分享知识，但也注重核心竞争力的保护。',
    L: '极度重视代码保密性，视核心代码为护城河不轻易外泄。'
  },
  CO2: { 
    title: '外部依赖态度', 
    H: '极度拥抱开源组件，认为不重复造轮子是最高效的做法。',
    M: '会根据实际情况权衡，适度引入外部依赖并进行评估。',
    L: '对外部库抱有极高警惕，更倾向于自研可控的核心模块。'
  },
  CO3: { 
    title: '协作开放度', 
    H: '热爱团队合作与技术交流，享受思想碰撞的联调过程。',
    M: '能够胜任团队协作，但也需要有独立思考和编码的空间。',
    L: '典型的独狼开发者，认为一个人能更高效地完成所有工作。'
  },
  SI1: { 
    title: '技术尝新意愿', 
    H: '对新技术充满狂热，总是第一个尝试前沿框架和语言。',
    M: '会关注新技术的发展，但只在技术成熟后才考虑引入。',
    L: '坚定的保守派，认为经过时间检验的经典技术才是最可靠的。'
  },
  SI2: { 
    title: '架构演进倾向', 
    H: '热衷于重构和架构升级，追求系统设计和技术的不断进化。',
    M: '会在业务需求和技术升级之间寻找平衡，适时进行重构。',
    L: '极力避免对稳定运行的系统进行大的架构改动或重构。'
  },
  SI3: { 
    title: '风险承受度', 
    H: '愿意为技术创新承担极高风险，认为偶尔的失败是进步的代价。',
    M: '会在风险可控的范围内进行技术尝试，注重备份和回滚。',
    L: '极度厌恶风险，追求系统的绝对稳定和部署的零故障率。'
  },
  TP1: { 
    title: '底层探究欲', 
    H: '实用主义至上，更关注API调用和解决问题，不愿深究底层细节。',
    M: '需要时会深入了解底层实现，但日常开发更注重应用层逻辑。',
    L: '热衷于钻研源码和计算机底层原理，追求极致的硬核技术。'
  },
  TP2: { 
    title: '业务导向性', 
    H: '完全以业务目标和产品交付为导向，技术只是达成目的的工具。',
    M: '在技术追求和业务需求之间灵活切换，努力寻找最佳结合点。',
    L: '技术纯粹主义者，有时会为了技术上的完美而忽略业务进度。'
  },
  TP3: { 
    title: '抽象建模倾向', 
    H: '极简主义，认为代码越直接越好，反感过度设计和复杂抽象。',
    M: '能够根据业务的实际复杂度进行适度且合理的设计抽象。',
    L: '热衷于设计模式和高度抽象的架构，喜欢构建通用性极强的系统。'
  },
  PR1: { 
    title: '规范遵循度', 
    H: '认为规范应该为效率让步，不拘小节，黑猫白猫抓到老鼠就是好猫。',
    M: '基本遵守团队代码规范，但在紧急情况下会灵活变通。',
    L: '严格遵守所有代码规范和格式要求，堪称行走的代码 Linter。'
  },
  PR2: { 
    title: '质量要求标准', 
    H: '只要功能能跑就行，对代码中的“坏味道”有极高的容忍度。',
    M: '追求合理的代码质量，会定期进行代码审查和适度重构。',
    L: '有极强的代码洁癖，无法忍受任何不优雅的实现和潜在隐患。'
  },
  PR3: { 
    title: '交付妥协度', 
    H: '面对交付压力会毫不犹豫地妥协代码质量，快速堆砌功能上线。',
    M: '尽量在保证基本质量的前提下按时交付，必要时记录技术债。',
    L: '宁可延期也绝不交付有瑕疵的代码，对质量的坚守超越一切。'
  }
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
            <div key={index} className="flex flex-col mb-3 last:mb-0">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[var(--color-accent-cyan)] font-bold text-sm tracking-wider">{dim.title}</span>
                <div className="flex items-center justify-center w-5 h-5 bg-[var(--color-primary)] shadow-[0_0_10px_rgba(255,153,0,0.8)] shrink-0 relative z-[60]">
                  <span className="text-white text-sm font-extrabold leading-none" style={{ textShadow: '0 0 4px rgba(255,255,255,0.9), 0 0 8px rgba(255,255,255,0.6)', letterSpacing: 0 }}>
                    {dim.label}
                  </span>
                </div>
              </div>
              <p className="text-xs leading-relaxed opacity-90" style={{ textShadow: '0 0 2px #ff9900' }}>
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
          <div className="flex flex-col gap-3">
            {Object.entries(subDimensions).map(([key, level]) => {
              const data = subDimensionData[key] || {};
              const desc = data[level] || '';
              return (
                <div key={key} className="flex flex-col border-b border-[var(--color-primary)] border-opacity-20 pb-2 last:border-0 last:pb-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[var(--color-accent-cyan)] font-bold text-xs">{key}</span>
                    <span className={`text-[10px] font-bold ${level === 'H' ? 'text-green-400 border border-green-400' : level === 'L' ? 'text-red-400 border border-red-400' : 'text-yellow-400 border border-yellow-400'}`} style={{ letterSpacing: 0, padding: '0 3px' }}>
                      {level}
                    </span>
                    <span className="text-[10px] text-[var(--color-primary)] opacity-80">{data.title}</span>
                  </div>
                  <p className="text-[10px] leading-snug opacity-90" style={{ textShadow: '0 0 2px #ff9900' }}>
                    {desc}
                  </p>
                </div>
              );
            })}
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