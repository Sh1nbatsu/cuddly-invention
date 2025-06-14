import {
  SCORE_MILESTONES,
  generateAchievementMessage,
} from '@/notification/achievement-generator'
import { notificationService } from '@/notification/notification-service'

type AchievementId = `score-${number}`

interface ScoreAchievement {
  id: AchievementId
  threshold: number
}

const SCORE_ACHIEVEMENTS: ScoreAchievement[] = SCORE_MILESTONES.map(
  threshold => ({
    id: `score-${threshold}` as AchievementId,
    threshold,
  })
)

class AchievementService {
  private static instance: AchievementService | null = null
  private readonly storageKey = 'achievements_unlocked_v1'
  private readonly unlocked: Set<AchievementId>

  private constructor() {
    const stored =
      typeof window !== 'undefined'
        ? window.localStorage.getItem(this.storageKey)
        : null
    const parsed: AchievementId[] = stored ? JSON.parse(stored) : []
    this.unlocked = new Set(parsed)
  }

  public static getInstance(): AchievementService {
    if (!AchievementService.instance) {
      AchievementService.instance = new AchievementService()
    }
    return AchievementService.instance
  }

  public processScore(score: number): void {
    for (const { id, threshold } of SCORE_ACHIEVEMENTS) {
      if (score >= threshold && !this.unlocked.has(id)) {
        const { title, body } = generateAchievementMessage(threshold)
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
    if (typeof window === 'undefined') return
    window.localStorage.setItem(
      this.storageKey,
      JSON.stringify(Array.from(this.unlocked))
    )
  }
}

export const achievementService = AchievementService.getInstance()
