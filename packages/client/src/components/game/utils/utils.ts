const UNIT_MAP: Record<string, number> = {
  K: 1e3,
  M: 1e6,
  B: 1e9,
  T: 1e12,
}

const ONE_PERCENT = 0.01

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
