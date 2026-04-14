export const questions = [
  // ====== 维度 1: C-O (题 1-8) ======
  {
    id: 1,
    dimension: 'C-O',
    subDimension: 'CO2', // 外部依赖态度
    text: '当你接手了一个祖传的且没有任何注释的系统，你的反应是？',
    options: [
      { text: '锁死代码库权限，谁也不准碰，我自己研究到死', score: -1 }, // A
      { text: '点上一根烟，阿弥陀佛，能跑就行', score: 0 }, // B
      { text: '跑到技术群里疯狂发截图吐槽，并在 GitHub 上建个重构开源坑（虽然绝对不会填）', score: 1 }, // C
    ],
  },
  {
    id: 2,
    dimension: 'C-O',
    subDimension: 'CO1', // 知识共享意愿
    text: '公司强制要求补全所有核心模块的 API 文档，你打算？',
    options: [
      { text: '随便写点废话应付，核心逻辑那是我的护城河，怎么能随便暴露', score: -1 }, // A
      { text: '用 Swagger/AI 自动生成一下，连错别字都不改直接提交', score: 0 }, // B
      { text: '开个内部 Wiki，拉全组人开会，制定一套比字典还厚的 RESTful 规范', score: 1 }, // C
    ],
  },
  {
    id: 3,
    dimension: 'C-O',
    subDimension: 'CO2', // 外部依赖态度
    text: '你用的第三方开源组件出了一个恶心但不致命的 Bug：',
    options: [
      { text: '下载源码，本地魔改打成私服包，这辈子都不打算升版本了', score: -1 }, // A
      { text: '写个 try-catch 默默吞掉报错，或者写个定时任务每天重启清理', score: 0 }, // B
      { text: '连夜 Fork 仓库，提 Issue 提 PR，并在推特上 @ 作者催更', score: 1 }, // C
    ],
  },
  {
    id: 4,
    dimension: 'C-O',
    subDimension: 'CO3', // 协作开放度
    text: '跨部门联调时，对方接口一直超时，你的对策是：',
    options: [
      { text: '不沟通，默默把超时时间设为 99999ms，让他自己玩去', score: -1 }, // A
      { text: '在群里 @ 一下对方然后去带薪拉屎，进度卡住不怪我', score: 0 }, // B
      { text: '冲到对方工位，拉着他的屏幕一行行看，并推荐了三个性能监控工具', score: 1 }, // C
    ],
  },
  {
    id: 5,
    dimension: 'C-O',
    subDimension: 'CO1', // 知识共享意愿
    text: '准备离职了，面对交接工作，你的态度是：',
    options: [
      { text: '把最核心的几行代码混淆一下，留下一句"只有上帝和我知道这是干嘛的"', score: -1 }, // A
      { text: '丢个包含 100 个无序文件的压缩包给新人，祝他好运', score: 0 }, // B
      { text: '录制 5 个小时的视频教程，连饮水机怎么换水都讲得清清楚楚', score: 1 }, // C
    ],
  },
  {
    id: 6,
    dimension: 'C-O',
    subDimension: 'CO3', // 协作开放度
    text: '面对团队新人的代码 Review 请求：',
    options: [
      { text: '直接 Reject，留下一句"自己悟"，拒绝提供任何帮助', score: -1 }, // A
      { text: '闭着眼睛点 Approve，他拉的屎让他自己吃', score: 0 }, // B
      { text: '逐行点评，长篇大论教他什么是 SOLID 原则，最后把他搞哭', score: 1 }, // C
    ],
  },
  {
    id: 7,
    dimension: 'C-O',
    subDimension: 'CO1', // 知识共享意愿
    text: '发现一个很棒的业务实现思路：',
    options: [
      { text: '藏在心里，下次晋升答辩时拿出来惊艳所有人', score: -1 }, // A
      { text: '收藏进吃灰的文件夹，再也没打开过', score: 0 }, // B
      { text: '马上写篇万字长文发博客，并在公司技术分享会上吹爆', score: 1 }, // C
    ],
  },
  {
    id: 8,
    dimension: 'C-O',
    subDimension: 'CO3', // 协作开放度
    text: '当你的代码被指出有设计缺陷时：',
    options: [
      { text: '愤怒反击，指责对方不懂业务，誓死捍卫自己的代码尊严', score: -1 }, // A
      { text: '"啊对对对，你说的都对，有空我就改（骗你的）"', score: 0 }, // B
      { text: '兴高采烈地拉着对方讨论重构方案，顺便把整个系统翻个底朝天', score: 1 }, // C
    ],
  },

  // ====== 维度 2: S-I (题 9-16) ======
  {
    id: 9,
    dimension: 'S-I',
    subDimension: 'SI1', // 技术尝新意愿
    text: '新出了个号称能颠覆行业的前端框架，你的态度是：',
    options: [
      { text: '纯属脱裤子放屁，jQuery 再战五百年！', score: -1 }, // A
      { text: '看看 GitHub Star 数，不到两万坚决不碰', score: 0 }, // B
      { text: '连夜重写公司刚上线的项目，主打一个面向简历编程', score: 1 }, // C
    ],
  },
  {
    id: 10,
    dimension: 'S-I',
    subDimension: 'SI2', // 架构演进倾向
    text: '生产环境数据库需要升级，你怎么选？',
    options: [
      { text: '坚守 MySQL 5.7，只要不宕机，打死不升级', score: -1 }, // A
      { text: '听云厂商的推荐，点几个按钮平滑升级，出了事找客服', score: 0 }, // B
      { text: '立刻调研最新的 Serverless 分布式图数据库，先上个小规模业务试试水', score: 1 }, // C
    ],
  },
  {
    id: 11,
    dimension: 'S-I',
    subDimension: 'SI2', // 架构演进倾向
    text: '公司要把庞大的单体应用拆成微服务：',
    options: [
      { text: '极力反对，警告老板拆分会导致事务一致性地狱，维护成本翻倍', score: -1 }, // A
      { text: '随便拆几个边缘模块交差，核心业务死死抱在一起', score: 0 }, // B
      { text: '兴奋地引入 K8s、Service Mesh 和全套链路追踪，把 10 个人能维护的系统搞成 100 人的规模', score: 1 }, // C
    ],
  },
  {
    id: 12,
    dimension: 'S-I',
    subDimension: 'SI3', // 风险承受度
    text: '关于测试覆盖率：',
    options: [
      { text: '人工点两下不死机就行了，写测试纯属浪费时间', score: -1 }, // A
      { text: '核心逻辑写几个断言，其他的随缘', score: 0 }, // B
      { text: '引入 AI 自动生成测试用例，强制要求集成门禁覆盖率达到 99.9% 才能合并', score: 1 }, // C
    ],
  },
  {
    id: 13,
    dimension: 'S-I',
    subDimension: 'SI3', // 风险承受度
    text: '部署发版流程你倾向于：',
    options: [
      { text: '必须在深夜 2 点由 3 个老员工通过 FTP 手动覆盖文件，充满仪式感', score: -1 }, // A
      { text: '跑个 Jenkins 脚本完事，只要绿了就发', score: 0 }, // B
      { text: '全自动 GitOps，蓝绿部署加金丝雀发布，谁敢手动碰服务器我就开除谁', score: 1 }, // C
    ],
  },
  {
    id: 14,
    dimension: 'S-I',
    subDimension: 'SI2', // 架构演进倾向
    text: '遇到系统性能瓶颈，你首先想到：',
    options: [
      { text: '加机器加内存！硬件能解决的问题绝不动代码', score: -1 }, // A
      { text: '查查慢 SQL 加个索引，搞定收工', score: 0 }, // B
      { text: '引入一套基于 Rust 的异步流处理中间件来彻底重构架构', score: 1 }, // C
    ],
  },
  {
    id: 15,
    dimension: 'S-I',
    subDimension: 'SI1', // 技术尝新意愿
    text: '团队讨论技术栈选型：',
    options: [
      { text: 'Java/C++ 老三样，招人好招，跑路好交接', score: -1 }, // A
      { text: '哪个框架文档是中文的就用哪个', score: 0 }, // B
      { text: '必须用刚出不到一年的语言，哪怕连生态都没有，要的就是极客范儿', score: 1 }, // C
    ],
  },
  {
    id: 16,
    dimension: 'S-I',
    subDimension: 'SI3', // 风险承受度
    text: '面对编译器给出的 100 个过时警告 (Deprecation Warning)：',
    options: [
      { text: '加上 @SuppressWarnings 或修改配置屏蔽警告，眼不见为净', score: -1 }, // A
      { text: '叹口气，只要编译还能过就不管，等彻底被废弃了再说', score: 0 }, // B
      { text: '停下手头所有业务需求，花三天时间把所有 API 升级到最新版', score: 1 }, // C
    ],
  },

  // ====== 维度 3: T-P (题 17-23) ======
  {
    id: 17,
    dimension: 'T-P',
    subDimension: 'TP1', // 底层探究欲
    text: '面试官问你红黑树如何反转，你会想：',
    options: [
      { text: '详细在白板上推演时间复杂度和平衡条件，甚至想讲一下 B+ 树', score: -1 }, // A
      { text: '熟练背诵面经上的标准答案，内心毫无波澜', score: 0 }, // B
      { text: '在心里骂娘："老子平时都在 CRUD，你让我手写这个？npm install 懂不懂？"', score: 1 }, // C
    ],
  },
  {
    id: 18,
    dimension: 'T-P',
    subDimension: 'TP3', // 抽象建模倾向
    text: '接手一个连最基本的设计模式都没有的草台班子项目：',
    options: [
      { text: '痛心疾首，画了 10 张 UML 图试图重新梳理领域模型', score: -1 }, // A
      { text: '闭上眼睛按它的屎样继续堆代码，保持风味一致', score: 0 }, // B
      { text: '发现里面有个三千行的面条函数跑得飞快，直呼牛逼然后默默借用', score: 1 }, // C
    ],
  },
  {
    id: 19,
    dimension: 'T-P',
    subDimension: 'TP1', // 底层探究欲
    text: '遇到一个极其诡异、几率 0.01% 的线上玄学 Bug：',
    options: [
      { text: '翻阅 JVM 源码或操作系统底层汇编，必须找出根本原因', score: -1 }, // A
      { text: '重启一下试试，解决 99% 的问题', score: 0 }, // B
      { text: '在外层加一个 while(true) 重试机制，打满补丁继续跑', score: 1 }, // C
    ],
  },
  {
    id: 20,
    dimension: 'T-P',
    subDimension: 'TP3', // 抽象建模倾向
    text: '学习一门新语言，你的习惯是：',
    options: [
      { text: '先把官方文档的语言规范、内存模型和并发哲学通读三遍', score: -1 }, // A
      { text: '看两集 B 站教程，跟着敲个 Hello World 就算学会了', score: 0 }, // B
      { text: '直接接一个该语言的外包需求，边百度边 StackOverflow 强行写完', score: 1 }, // C
    ],
  },
  {
    id: 21,
    dimension: 'T-P',
    subDimension: 'TP2', // 业务导向性
    text: '面对极其复杂的业务逻辑剥离需求：',
    options: [
      { text: '坚持 DDD（领域驱动设计），严格划分限界上下文', score: -1 }, // A
      { text: '找产品经理讨价还价，能不能把复杂的业务逻辑砍掉', score: 0 }, // B
      { text: '直接写一堆 if-else 嵌套硬编码，先上线把年终奖骗到手再说', score: 1 }, // C
    ],
  },
  {
    id: 22,
    dimension: 'T-P',
    subDimension: 'TP2', // 业务导向性
    text: '面对产品经理明天的加急需求，现在是晚上 10 点：',
    options: [
      { text: '拒绝！这破坏了系统的架构完整性，必须重新走评审流程！', score: -1 }, // A
      { text: '磨洋工到 12 点，假装没做完，明天再说', score: 0 }, // B
      { text: '直接连到生产库改表数据，外加三行补丁代码，搞定回家睡觉', score: 1 }, // C
    ],
  },
  {
    id: 23,
    dimension: 'T-P',
    subDimension: 'TP1', // 底层探究欲
    text: '看到网上一篇深度分析 CAP 定理的雄文：',
    options: [
      { text: '仔细研读，在评论区就最终一致性展开 5000 字辩论', score: -1 }, // A
      { text: '收藏夹吃灰 +1', score: 0 }, // B
      { text: '扫一眼关闭，"关我屁事，客户连这三个字母都认不全"', score: 1 }, // C
    ],
  },

  // ====== 维度 4: P-R (题 24-30) ======
  {
    id: 24,
    dimension: 'P-R',
    subDimension: 'PR1', // 规范遵循度
    text: '看到别人的代码里混用空格和 Tab：',
    options: [
      { text: '暴跳如雷，立刻提 PR 修正，并强制全仓库接入 ESLint/Prettier', score: -1 }, // A
      { text: '叹了口气，入乡随俗，你也跟着乱敲', score: 0 }, // B
      { text: '只要不报语法错误，哪怕他用回车缩进我也能忍', score: 1 }, // C
    ],
  },
  {
    id: 25,
    dimension: 'P-R',
    subDimension: 'PR1', // 规范遵循度
    text: '给一个极其关键核心变量命名：',
    options: [
      { text: '查阅字典，翻遍词根，最终定下一个 30 个字母、完美表达其生命周期的驼峰名', score: -1 }, // A
      { text: '用翻译软件把中文名翻译成英文，哪怕语法完全不对', score: 0 }, // B
      { text: '直接 var a 或者 tempData2，反正加上注释（或者干脆不加）自己看得懂就行', score: 1 }, // C
    ],
  },
  {
    id: 26,
    dimension: 'P-R',
    subDimension: 'PR3', // 交付妥协度
    text: '代码库里随处可见前人留下的 // TODO: 以后优化：',
    options: [
      { text: '顺手把它们全清了，哪怕加班到半夜也要把技术债还完', score: -1 }, // A
      { text: '假装没看见，关我屁事', score: 0 }, // B
      { text: '在下面追加一行 // TODO: 确实该优化了，但我也不敢动', score: 1 }, // C
    ],
  },
  {
    id: 27,
    dimension: 'P-R',
    subDimension: 'PR3', // 交付妥协度
    text: '临近发版还有半小时，发现了一个不影响主流程但很难看的 UI 错位：',
    options: [
      { text: '绝对不能忍！立即打回，修复后重新走全套回归测试！', score: -1 }, // A
      { text: '假装测试没发现，等用户反馈了再排期', score: 0 }, // B
      { text: '悄悄连上服务器，直接修改 CSS 文件强制 !important 覆盖', score: 1 }, // C
    ],
  },
  {
    id: 28,
    dimension: 'P-R',
    subDimension: 'PR2', // 质量要求标准
    text: '一个刚刚学会前端 vibe code 的学弟和你聊天，和你炫耀着他刚做出的炫酷 UI，说前端马上就要被淘汰了：',
    options: [
      { text: '回答他：是的，这是大趋势，未来没有必要手写 UI 了', score: -1 }, // A
      { text: '告诉他可以利用 AI，但是要确保自己明白代码含义和架构，别太飘', score: 0 }, // B
      { text: '给他一棒槌，免得他以后进公司祸害人', score: 1 }, // C
    ],
  },
  {
    id: 29,
    dimension: 'P-R',
    subDimension: 'PR2', // 质量要求标准
    text: '偶然和朋友聊到 Electron，你认为：',
    options: [
      { text: '为了快速构建，更多的资源占用是必要的牺牲，现代开发敏捷至上', score: -1 }, // A
      { text: '用来实现一些轻 APP 倒是不错的选择', score: 0 }, // B
      { text: '它架构纯脱裤子放屁，任何喜欢 Electron 的人都没有在自己的设备卡在 loading 的时候发出半句抱怨', score: 1 }, // C
    ],
  },
  {
    id: 30,
    dimension: 'P-R',
    subDimension: 'PR2', // 质量要求标准
    text: '别人评价你的代码"有坏味道"：',
    options: [
      { text: '深感羞愧，买了一本《重构》连夜拜读，誓要洗心革面', score: -1 }, // A
      { text: '充耳不闻，你懂个屁，能发工资的代码就是好代码', score: 0 }, // B
      { text: '骄傲地回应："臭才对，这就是老夫 20 年功力熬出来的屎山原香！"', score: 1 }, // C
    ],
  },
]
