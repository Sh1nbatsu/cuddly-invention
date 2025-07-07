import { LeaderboardResponse } from '@/shared/types/Leaderboard'
import { getLeaderboardApi, updateLeaderApi } from './leaderboard.api'

export const getLeaderboardHandler = async (
  cursor: number
): Promise<LeaderboardResponse> => {
  try {
    const { rows, count } = await getLeaderboardApi({
      cursor,
      limit: 10,
    })
    return { rows, count }
  } catch (error) {
    console.error('Error fetching leaderboard:', error)
    throw error
  }
}

export const addLeaderHandler = async (score: number): Promise<void> => {
  try {
    if (!score || score <= 0) return
    await updateLeaderApi({ count: score })
  } catch (error) {
    console.error('Error adding leader:', error)
    throw error
  }
}
