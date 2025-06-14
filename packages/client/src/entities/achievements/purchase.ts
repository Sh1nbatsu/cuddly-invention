import {
  PURCHASE_THRESHOLDS,
  PURCHASE_TITLES,
  PURCHASE_MILESTONE_MESSAGES,
} from './config'

function selectPurchaseTier(quantity: number): number {
  for (let i = PURCHASE_THRESHOLDS.length - 1; i >= 0; i--) {
    if (quantity >= PURCHASE_THRESHOLDS[i]) {
      return PURCHASE_THRESHOLDS[i]
    }
  }
  return PURCHASE_THRESHOLDS[0]
}

function getCustomPurchaseBody(quantity: number, upgradeName: string): string {
  const tier = selectPurchaseTier(quantity)
  const custom = PURCHASE_MILESTONE_MESSAGES[tier] ?? []
  if (custom.length === 0) {
    return `Купил ${quantity} × ${upgradeName}!`
  }
  const template = custom[Math.floor(Math.random() * custom.length)]
  return template
    .replace(/{upgrade}/g, upgradeName)
    .replace(/{qty}/g, String(quantity))
}

export function generatePurchaseAchievementMessage(
  upgradeName: string,
  quantity: number
): { title: string; body: string } {
  const tier = selectPurchaseTier(quantity)
  const titles = PURCHASE_TITLES[tier]
  const title = titles[Math.floor(Math.random() * titles.length)]
  const body = getCustomPurchaseBody(quantity, upgradeName)
  return { title, body }
}
