export type AutoclickUpgrade = {
  id: string
  name: string
  baseCost: number
  basePower: number
  getCost: (amount: number) => number
  getPower: (amount: number) => number
}
