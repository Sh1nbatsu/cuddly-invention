import { ONE_PERCENT, UNIT_MAP } from './model/game.constants'

export const formatNumber = (num: number): string => {
  if (num < 1000) return num.toString()

  const units = Object.keys(UNIT_MAP)
  let unitIndex = -1
  let n = num

  while (n >= 1000 && unitIndex < units.length - 1) {
    n /= 1000
    unitIndex++
  }

  return n.toFixed(2).replace(/\.00$/, '') + units[unitIndex]
}

export const getClickGain = (score: number): number => {
  const formatted = formatNumber(score)
  const lastChar = formatted.slice(-1)

  return UNIT_MAP[lastChar] ? UNIT_MAP[lastChar] * ONE_PERCENT : 1
}

export const getLevel = (amount: number): number => {
  return Math.floor(amount / 25)
}

export function calculateUpgradeCost(
  baseCost: number,
  amount: number,
  growthRate: number
): number {
  const level = getLevel(amount)
  const costMultiplier = Math.pow(growthRate, amount)
  return Math.floor(baseCost * costMultiplier * Math.pow(2, level))
}

export function calculateUpgradePower(
  basePower: number,
  amount: number,
  powerGrowthRate = 1.5
): number {
  if (amount === 0) return 0

  const level = getLevel(amount)
  const rawPower = basePower * Math.pow(powerGrowthRate, level)
  return Number(rawPower.toFixed(2))
}
