interface AchievementDefinition {
  threshold: number
  messages: string[]
}

const ACHIEVEMENT_DEFINITIONS: AchievementDefinition[] = [
  {
    threshold: 10,
    messages: [
      'Ты сделал первые 10! Легенда зарождается.',
      '10 кликов! Только начало.',
    ],
  },
  {
    threshold: 100,
    messages: ['100! Да ты кликаешь, как бог.', 'Сотка есть. Ты в деле.'],
  },
  {
    threshold: 200,
    messages: ['200! Влияние растёт.', '200 точных попаданий.'],
  },
  {
    threshold: 1000,
    messages: ['1000! Палец не устал?', 'Тысяча! Настоящая машина.'],
  },
  {
    threshold: 10000,
    messages: ['10 000 — клик-король!', 'Десятка косых. Гордость рода.'],
  },
  {
    threshold: 100000,
    messages: ['100 000! Пора на завод.', 'Пахнет профессионализмом.'],
  },
  {
    threshold: 1000000,
    messages: [
      'Миллион… Просто миллион. Уважение.',
      'Ты — первый, кто сделал миллион.',
    ],
  },
]

export const SCORE_MILESTONES: number[] = ACHIEVEMENT_DEFINITIONS.map(
  ({ threshold }) => threshold
)

export function generateAchievementMessage(score: number): {
  title: string
  body: string
} {
  const def = ACHIEVEMENT_DEFINITIONS.find(d => d.threshold === score) ?? null
  const variants = def?.messages ?? ['Ты монстр!']
  const body = variants[Math.floor(Math.random() * variants.length)]
  const title = `Ачивка: ${score} очков`
  return { title, body }
}
