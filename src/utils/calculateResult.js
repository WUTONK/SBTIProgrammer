import { archetypes } from '../data/archetypes.js'

export function calculateResult(answers) {
  const rawScores = answers.map((answer) => answer.score)

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
    description: typeInfo.description,
    tags: typeInfo.tags,
    dimensionScores,
    rawScores: { scoreCO, scoreSI, scoreTP, scorePR },
  }
}
