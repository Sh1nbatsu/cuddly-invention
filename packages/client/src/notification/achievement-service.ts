import {
  SCORE_MILESTONES,
  generateAchievementMessage,
  PURCHASE_THRESHOLDS,
  generatePurchaseAchievementMessage,
} from 'entities/achievements'
import { notificationService } from '@/notification/notification-service'

type AchievementId = `score-${number}` | `purchase-${string}-${number}`

class AchievementService {
  private static instance: AchievementService | null = null
  private readonly storageKey = 'achievements_unlocked'
  private readonly unlocked: Set<AchievementId> = new Set<AchievementId>()

  private constructor() {
    if (typeof window !== 'undefined') {
      const stored = window.localStorage.getItem(this.storageKey)
      if (stored) {
        for (const id of JSON.parse(stored) as AchievementId[]) {
          this.unlocked.add(id)
        }
      }
    }
  }

  public static getInstance(): AchievementService {
    if (!AchievementService.instance) {
      AchievementService.instance = new AchievementService()
    }
    return AchievementService.instance
  }

  public processScore(score: number): void {
    for (const threshold of SCORE_MILESTONES) {
      const id = `score-${threshold}` as AchievementId
      if (score >= threshold && !this.unlocked.has(id)) {
        const { title, body } = generateAchievementMessage(threshold)
        void notificationService.sendNotification(title, { body })
        this.unlocked.add(id)
        this.persist()
      }
    }
  }

  public processPurchase(
    upgradeId: string,
    upgradeName: string,
    totalOwned: number
  ): void {
    for (const threshold of PURCHASE_THRESHOLDS) {
      const id = `purchase-${upgradeId}-${threshold}` as AchievementId
      if (totalOwned >= threshold && !this.unlocked.has(id)) {
        const { title, body } = generatePurchaseAchievementMessage(
          upgradeName,
          threshold
        )
        void notificationService.sendNotification(title, { body })
        this.unlocked.add(id)
        this.persist()
      }
    }
  }

  public getUnlocked(): string[] {
    return Array.from(this.unlocked)
  }

  public reset(): void {
    this.unlocked.clear()
    this.persist()
  }

  private persist(): void {
    if (typeof window !== 'undefined') {
      window.localStorage.setItem(
        this.storageKey,
        JSON.stringify(Array.from(this.unlocked))
      )
    }
  }
}

export const achievementService = AchievementService.getInstance()
