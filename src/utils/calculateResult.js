import { archetypes } from '../data/archetypes.js'
import { questions } from '../data/questions.js'

export function calculateResult(answers) {
  const rawScores = Array.from({ length: 30 }, (_, i) => answers[i] ? answers[i].score : 0)

  const sum = (arr, start, end) => arr.slice(start, end).reduce((a, b) => a + b, 0)

  const scoreCO = sum(rawScores, 0, 8)   // C-O: > 0 → O，否则 C
  const scoreSI = sum(rawScores, 8, 16)  // S-I: > 0 → I，否则 S
  const scoreTP = sum(rawScores, 16, 23) // T-P: > 0 → P(实践)，否则 T
  const scorePR = sum(rawScores, 23, 30) // P-R: > 0 → R，否则 P(完美)

  const dim1 = scoreCO > 0 ? 'O' : 'C'
  const dim2 = scoreSI > 0 ? 'I' : 'S'
  const dim3 = scoreTP > 0 ? 'P' : 'T'
  const dim4 = scorePR > 0 ? 'R' : 'P'

  const typeCode = dim1 + dim2 + dim3 + dim4

  const dimensionScores = [
    {
      name: 'C-O',
      leftLabel: `封闭 C`,
      rightLabel: `O 开源`,
      percentage: Math.round(((-scoreCO + 8) / 16) * 100),
    },
    {
      name: 'S-I',
      leftLabel: `保守 S`,
      rightLabel: `I 创新`,
      percentage: Math.round(((-scoreSI + 8) / 16) * 100),
    },
    {
      name: 'T-P',
      leftLabel: `理论 T`,
      rightLabel: `P 实践`,
      percentage: Math.round(((-scoreTP + 7) / 14) * 100),
    },
    {
      name: 'P-R',
      leftLabel: `完美 P`,
      rightLabel: `R 实用`,
      percentage: Math.round(((-scorePR + 7) / 14) * 100),
    },
  ]

  // Calculate sub-dimension scores
  const subDimensionScores = {
    CO1: { sum: 0, count: 0 }, CO2: { sum: 0, count: 0 }, CO3: { sum: 0, count: 0 },
    SI1: { sum: 0, count: 0 }, SI2: { sum: 0, count: 0 }, SI3: { sum: 0, count: 0 },
    TP1: { sum: 0, count: 0 }, TP2: { sum: 0, count: 0 }, TP3: { sum: 0, count: 0 },
    PR1: { sum: 0, count: 0 }, PR2: { sum: 0, count: 0 }, PR3: { sum: 0, count: 0 },
  }
  
  answers.forEach((answer, index) => {
    if (!answer) return;
    const q = questions[index]
    if (q && q.subDimension) {
      subDimensionScores[q.subDimension].sum += answer.score
      subDimensionScores[q.subDimension].count += 1
    }
  })

  const getLevel = (sum, count) => {
    if (count === 0) return 'M' // 如果没有答相关题目（例如跳过），默认判定为中立
    const avg = sum / count
    if (avg > 0.3) return 'H'
    if (avg < -0.3) return 'L'
    return 'M'
  }

  const subDimensions = {}
  for (const [key, data] of Object.entries(subDimensionScores)) {
    subDimensions[key] = getLevel(data.sum, data.count)
  }

  const typeInfo = archetypes[typeCode] || {
    role: '未知原型',
    name: '神秘程序员',
    description: '你是一个独特的存在，无法被简单分类。',
    tags: ['独一无二', '未知类型'],
  }

  return {
    typeCode,
    role: typeInfo.role,
    typeName: typeInfo.name,
    avatarId: typeInfo.avatarId,
    description: typeInfo.description,
    tags: typeInfo.tags,
    dimensionScores,
    subDimensions,
    rawScores: { scoreCO, scoreSI, scoreTP, scorePR },
  }
}
