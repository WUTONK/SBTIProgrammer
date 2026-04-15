export const questions = [
  // ====== 维度 1: C-O (封闭 vs 开源) ======
  {
    id: 1,
    dimension: 'C-O',
    subDimension: 'CO2', // 外部依赖态度
    text: '接手没有任何注释的祖传系统时，我倾向于在技术群吐槽分享并探讨重构，而不是一个人闷头钻研。',
    options: [
      { text: '不认同', score: -1 },
      { text: '有时候', score: 0 },
      { text: '认同', score: 1 },
    ],
  },
  {
    id: 2,
    dimension: 'C-O',
    subDimension: 'CO1', // 知识共享意愿
    text: '我认为详尽的 API 文档是团队的共同财富，我愿意毫无保留地补全核心逻辑的文档。',
    options: [
      { text: '不认同', score: -1 },
      { text: '有时候', score: 0 },
      { text: '认同', score: 1 },
    ],
  },
  {
    id: 3,
    dimension: 'C-O',
    subDimension: 'CO2', // 外部依赖态度
    text: '第三方开源组件出 Bug 时，我倾向于向社区提 Issue 或 PR，而不是仅在本地私服魔改。',
    options: [
      { text: '不认同', score: -1 },
      { text: '有时候', score: 0 },
      { text: '认同', score: 1 },
    ],
  },
  {
    id: 4,
    dimension: 'C-O',
    subDimension: 'CO3', // 协作开放度
    text: '跨部门联调超时时，我会主动出击甚至去对方工位协助排查，而不是被动等待。',
    options: [
      { text: '不认同', score: -1 },
      { text: '有时候', score: 0 },
      { text: '认同', score: 1 },
    ],
  },
  {
    id: 5,
    dimension: 'C-O',
    subDimension: 'CO1', // 知识共享意愿
    text: '离职交接时，我会编写极其详尽的文档或录制视频，确保新人能“无痛”接手。',
    options: [
      { text: '不认同', score: -1 },
      { text: '有时候', score: 0 },
      { text: '认同', score: 1 },
    ],
  },
  {
    id: 6,
    dimension: 'C-O',
    subDimension: 'CO3', // 协作开放度
    text: '我乐于接受并认真对待新人的 Code Review 请求，将其视为传播技术规范的好机会。',
    options: [
      { text: '不认同', score: -1 },
      { text: '有时候', score: 0 },
      { text: '认同', score: 1 },
    ],
  },
  {
    id: 7,
    dimension: 'C-O',
    subDimension: 'CO1', // 知识共享意愿
    text: '发现绝妙的业务实现思路时，我的第一反应是发博客或在公司内部公开分享。',
    options: [
      { text: '不认同', score: -1 },
      { text: '有时候', score: 0 },
      { text: '认同', score: 1 },
    ],
  },
  {
    id: 8,
    dimension: 'C-O',
    subDimension: 'CO3', // 协作开放度
    text: '当代码被指出有设计缺陷时，我能保持兴奋并邀请对方一起探讨更开放、更优的重构方案。',
    options: [
      { text: '不认同', score: -1 },
      { text: '有时候', score: 0 },
      { text: '认同', score: 1 },
    ],
  },

  // ====== 维度 2: S-I (保守 vs 创新) ======
  {
    id: 9,
    dimension: 'S-I',
    subDimension: 'SI1', // 技术尝新意愿
    text: '我对新兴的前端框架和工具链充满好奇，并热衷于在项目中尝试它们。',
    options: [
      { text: '不认同', score: -1 },
      { text: '有时候', score: 0 },
      { text: '认同', score: 1 },
    ],
  },
  {
    id: 10,
    dimension: 'S-I',
    subDimension: 'SI2', // 架构演进倾向
    text: '我倾向于在生产环境中尝试最新的数据库技术或架构（如 Serverless/分布式），而不是死守旧版本。',
    options: [
      { text: '不认同', score: -1 },
      { text: '有时候', score: 0 },
      { text: '认同', score: 1 },
    ],
  },
  {
    id: 11,
    dimension: 'S-I',
    subDimension: 'SI2', // 架构演进倾向
    text: '我极力支持将庞大的单体应用拆分为微服务，并愿意引入 K8s 等全套云原生技术。',
    options: [
      { text: '不认同', score: -1 },
      { text: '有时候', score: 0 },
      { text: '认同', score: 1 },
    ],
  },
  {
    id: 12,
    dimension: 'S-I',
    subDimension: 'SI3', // 风险承受度
    text: '我认为高自动化测试覆盖率是项目的生命线，愿意为此投入大量时间成本。',
    options: [
      { text: '不认同', score: -1 },
      { text: '有时候', score: 0 },
      { text: '认同', score: 1 },
    ],
  },
  {
    id: 13,
    dimension: 'S-I',
    subDimension: 'SI3', // 风险承受度
    text: '我追求极致的自动化部署（如 GitOps/金丝雀发布），坚决反对任何手动操作服务器的行为。',
    options: [
      { text: '不认同', score: -1 },
      { text: '有时候', score: 0 },
      { text: '认同', score: 1 },
    ],
  },
  {
    id: 14,
    dimension: 'S-I',
    subDimension: 'SI2', // 架构演进倾向
    text: '面对性能瓶颈，我更倾向于引入如 Rust 异步流处理等新架构来彻底重构，而非单纯堆硬件。',
    options: [
      { text: '不认同', score: -1 },
      { text: '有时候', score: 0 },
      { text: '认同', score: 1 },
    ],
  },
  {
    id: 15,
    dimension: 'S-I',
    subDimension: 'SI1', // 技术尝新意愿
    text: '在选型时，我倾向于选择最具前瞻性的技术栈，即使它的生态尚不成熟。',
    options: [
      { text: '不认同', score: -1 },
      { text: '有时候', score: 0 },
      { text: '认同', score: 1 },
    ],
  },
  {
    id: 16,
    dimension: 'S-I',
    subDimension: 'SI3', // 风险承受度
    text: '面对编译器的过时警告，我会倾向于尽快将 API 升级到最新版，而不是屏蔽警告。',
    options: [
      { text: '不认同', score: -1 },
      { text: '有时候', score: 0 },
      { text: '认同', score: 1 },
    ],
  },

  // ====== 维度 3: T-P (理论 vs 实践) ======
  {
    id: 17,
    dimension: 'T-P',
    subDimension: 'TP1', // 底层探究欲
    text: '我认为在日常开发中，熟练调用成熟的库比死磕红黑树等底层算法原理更具性价比。',
    options: [
      { text: '不认同', score: -1 },
      { text: '有时候', score: 0 },
      { text: '认同', score: 1 },
    ],
  },
  {
    id: 18,
    dimension: 'T-P',
    subDimension: 'TP3', // 抽象建模倾向
    text: '接手没有设计模式的草台班子项目时，我倾向于维持现状快速交付，而不是花费精力做深度抽象。',
    options: [
      { text: '不认同', score: -1 },
      { text: '有时候', score: 0 },
      { text: '认同', score: 1 },
    ],
  },
  {
    id: 19,
    dimension: 'T-P',
    subDimension: 'TP1', // 底层探究欲
    text: '面对极低概率的线上玄学 Bug，我更倾向于通过重启或加补丁快速恢复业务。',
    options: [
      { text: '不认同', score: -1 },
      { text: '有时候', score: 0 },
      { text: '认同', score: 1 },
    ],
  },
  {
    id: 20,
    dimension: 'T-P',
    subDimension: 'TP3', // 抽象建模倾向
    text: '学习新语言时，我习惯通过直接上手写业务来掌握，而不是先研读语言规范和内存模型。',
    options: [
      { text: '不认同', score: -1 },
      { text: '有时候', score: 0 },
      { text: '认同', score: 1 },
    ],
  },
  {
    id: 21,
    dimension: 'T-P',
    subDimension: 'TP2', // 业务导向性
    text: '处理复杂业务逻辑时，我认为直接用 if-else 硬编码是保证上线速度的最优解。',
    options: [
      { text: '不认同', score: -1 },
      { text: '有时候', score: 0 },
      { text: '认同', score: 1 },
    ],
  },
  {
    id: 22,
    dimension: 'T-P',
    subDimension: 'TP2', // 业务导向性
    text: '面对半夜的加急需求，我愿意通过直接修改数据库数据或打临时补丁来最快满足产品需求。',
    options: [
      { text: '不认同', score: -1 },
      { text: '有时候', score: 0 },
      { text: '认同', score: 1 },
    ],
  },
  {
    id: 23,
    dimension: 'T-P',
    subDimension: 'TP1', // 底层探究欲
    text: '相比深奥的分布式理论文章，我更关注能够直接提升业务产出的实践案例。',
    options: [
      { text: '不认同', score: -1 },
      { text: '有时候', score: 0 },
      { text: '认同', score: 1 },
    ],
  },

  // ====== 维度 4: P-R (完美 vs 实用) ======
  {
    id: 24,
    dimension: 'P-R',
    subDimension: 'PR1', // 规范遵循度
    text: '我认为代码缩进只要全组统一即可，即使混用空格和 Tab 只要不报错我也不太在意。',
    options: [
      { text: '不认同', score: -1 },
      { text: '有时候', score: 0 },
      { text: '认同', score: 1 },
    ],
  },
  {
    id: 25,
    dimension: 'P-R',
    subDimension: 'PR1', // 规范遵循度
    text: '变量命名只要注释清楚、自己和同事能看懂就行，没必要非得推敲半小时。',
    options: [
      { text: '不认同', score: -1 },
      { text: '有时候', score: 0 },
      { text: '认同', score: 1 },
    ],
  },
  {
    id: 26,
    dimension: 'P-R',
    subDimension: 'PR3', // 交付妥协度
    text: '对于代码中前人留下的 // TODO 优化，只要不影响目前运行，我通常会选择视而不见。',
    options: [
      { text: '不认同', score: -1 },
      { text: '有时候', score: 0 },
      { text: '认同', score: 1 },
    ],
  },
  {
    id: 27,
    dimension: 'P-R',
    subDimension: 'PR3', // 交付妥协度
    text: '临近发版时的小 UI 错位，我认为可以通过 CSS 临时补丁或后期迭代解决，不应打回。',
    options: [
      { text: '不认同', score: -1 },
      { text: '有时候', score: 0 },
      { text: '认同', score: 1 },
    ],
  },
  {
    id: 28,
    dimension: 'P-R',
    subDimension: 'PR2', // 质量要求标准
    text: '我认同 Vibe Code/AI 生成代码是大势所趋，开发者应更多关注产品实现而非底层细节。',
    options: [
      { text: '不认同', score: -1 },
      { text: '有时候', score: 0 },
      { text: '认同', score: 1 },
    ],
  },
  {
    id: 29,
    dimension: 'P-R',
    subDimension: 'PR2', // 质量要求标准
    text: '我认同 Electron 等方案在效率上的优势，认为牺牲一定的内存和性能换取开发速度是值得的。',
    options: [
      { text: '不认同', score: -1 },
      { text: '有时候', score: 0 },
      { text: '认同', score: 1 },
    ],
  },
  {
    id: 30,
    dimension: 'P-R',
    subDimension: 'PR2', // 质量要求标准
    text: '我认为能支撑业务、能发工资的代码就是好代码，没必要为了消除“坏味道”而过度重构。',
    options: [
      { text: '不认同', score: -1 },
      { text: '有时候', score: 0 },
      { text: '认同', score: 1 },
    ],
  },
]
