import {
  FUN_MILESTONE_MESSAGES,
  GENERIC_PREFIXES,
  GENERIC_SUFFIXES,
} from './config'

export const SCORE_MILESTONES: number[] = Object.keys(FUN_MILESTONE_MESSAGES)
  .map(Number)
  .sort((a, b) => a - b)

function generateGenericBody(score: number): string {
  const p =
    GENERIC_PREFIXES[Math.floor(Math.random() * GENERIC_PREFIXES.length)]
  const s =
    GENERIC_SUFFIXES[Math.floor(Math.random() * GENERIC_SUFFIXES.length)]
  return `${p} ${score}! ${s}`
}

export function generateAchievementMessage(score: number): {
  title: string
  body: string
} {
  const custom = FUN_MILESTONE_MESSAGES[score]
  const templateArr = custom ?? [generateGenericBody(score)]
  const template = templateArr[Math.floor(Math.random() * templateArr.length)]
  const body = template.replace(/{n}/g, String(score))
  const title = `Достигнут счёт ${score}`
  return { title, body }
}
