import {
  formatNumber,
  getClickGain,
  getLevel,
  calculateUpgradeCost,
  calculateUpgradePower,
} from '../game.lib'

describe('game.lib', () => {
  describe('formatNumber', () => {
    it('formats numbers correctly', () => {
      expect(formatNumber(500)).toBe('500')
      expect(formatNumber(1500)).toBe('1.50K')
      expect(formatNumber(1000000)).toBe('1M')
      expect(formatNumber(123456789)).toBe('123.46M')
    })
  })

  describe('getClickGain', () => {
    it('returns correct click gain based on score formatting', () => {
      expect(getClickGain(500)).toBe(1)
      expect(getClickGain(1000)).toBe(10)
      expect(getClickGain(1000000)).toBe(10000)
    })
  })

  describe('getLevel', () => {
    it('returns level as floor of amount / 25', () => {
      expect(getLevel(0)).toBe(0)
      expect(getLevel(25)).toBe(1)
      expect(getLevel(49)).toBe(1)
      expect(getLevel(50)).toBe(2)
    })
  })

  describe('calculateUpgradeCost', () => {
    it('calculates cost with growth and level factor', () => {
      const base = 100
      const growth = 1.1
      const amount = 25
      const cost = calculateUpgradeCost(base, amount, growth)
      expect(cost).toBe(Math.floor(base * Math.pow(growth, amount) * 2))
    })
  })

  describe('calculateUpgradePower', () => {
    it('returns 0 for 0 amount', () => {
      expect(calculateUpgradePower(10, 0)).toBe(0)
    })

    it('calculates power correctly with level', () => {
      const base = 10
      const amount = 50
      const power = calculateUpgradePower(base, amount)
      expect(power).toBe(Number((base * Math.pow(1.5, 2)).toFixed(2)))
    })
  })
})
