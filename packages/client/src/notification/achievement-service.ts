import { notificationService } from '@/notification/notification-service'
import {
  PURCHASE_THRESHOLDS,
  SCORE_MILESTONES,
  generateAchievementMessage,
  generatePurchaseAchievementMessage,
} from '../entities/achievements'

type AchievementId = `score-${number}` | `purchase-${string}-${number}`

class AchievementService {
  private static instance: AchievementService | null = null
  private readonly storageKey = 'achievements_unlocked'
  private readonly unlocked: Set<AchievementId> = new Set<AchievementId>()

  private constructor() {
    if (typeof window === 'undefined') {
      return
    }
    try {
      const stored = window.localStorage.getItem(this.storageKey)
      if (stored) {
        const parsed = JSON.parse(stored) as AchievementId[]
        for (const id of parsed) {
          this.unlocked.add(id)
        }
      }
    } catch (error) {
      console.error('Ошибка при загрузке сохранённых достижений:', error)
    }
  }

  public static getInstance(): AchievementService {
    if (!AchievementService.instance) {
      AchievementService.instance = new AchievementService()
    }
    return AchievementService.instance
  }

  public processScore(score: number): void {
    if (typeof window === 'undefined') return
    for (const threshold of SCORE_MILESTONES) {
      const id = `score-${threshold}` as AchievementId
      if (score < threshold || this.unlocked.has(id)) {
        continue
      }
      try {
        const { title, body } = generateAchievementMessage(threshold)
        void notificationService
          .sendNotification(title, { body })
          .catch(err =>
            console.error('Ошибка при отправке уведомления о достижении:', err)
          )
        this.unlocked.add(id)
        this.persist()
      } catch (error) {
        console.error('Ошибка при обработке достижения по очкам:', error)
      }
    }
  }

  public processPurchase(
    upgradeId: string,
    upgradeName: string,
    totalOwned: number
  ): void {
    if (typeof window === 'undefined') return
    for (const threshold of PURCHASE_THRESHOLDS) {
      const id = `purchase-${upgradeId}-${threshold}` as AchievementId
      if (totalOwned < threshold || this.unlocked.has(id)) {
        continue
      }
      try {
        const { title, body } = generatePurchaseAchievementMessage(
          upgradeName,
          threshold
        )
        void notificationService
          .sendNotification(title, { body })
          .catch(err =>
            console.error('Ошибка при отправке уведомления о покупке:', err)
          )
        this.unlocked.add(id)
        this.persist()
      } catch (error) {
        console.error('Ошибка при обработке достижения по покупке:', error)
      }
    }
  }

  public getUnlocked(): string[] | undefined {
    if (typeof window === 'undefined') return
    return Array.from(this.unlocked)
  }

  public reset(): void {
    if (typeof window === 'undefined') return
    this.unlocked.clear()
    this.persist()
  }

  private persist(): void {
    if (typeof window === 'undefined') {
      return
    }
    try {
      window.localStorage.setItem(
        this.storageKey,
        JSON.stringify(Array.from(this.unlocked))
      )
    } catch (error) {
      console.error('Ошибка при сохранении достижений:', error)
    }
  }
}

export const achievementService = AchievementService.getInstance()
