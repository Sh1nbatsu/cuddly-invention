import { getLeaderboardApi, addLeaderApi } from './leaderboard.api'

import { LeaderboardResponse } from '@/shared/types/Leaderboard'

const RATING_FIELD_NAME = 'undefScore12'

// Тестовый рейтинг филд, потом можно поменять на underScore, или любой другой нужный кроме score.

export const getLeaderboardHandler = async (
  cursor: number
): Promise<LeaderboardResponse> => {
  try {
    const data = await getLeaderboardApi({
      ratingFieldName: RATING_FIELD_NAME,
      cursor,
      limit: 10,
    })
    return data
  } catch (error) {
    console.error('Error fetching leaderboard:', error)
    throw error
  }
}

export const addLeaderHandler = async (
  username: string,
  score: number,
  date: string,
  avatar?: string
): Promise<string> => {
  try {
    const data = await addLeaderApi({
      data: {
        undefScore12: score,
        date,
        username,
        avatar: avatar || '',
      },
      ratingFieldName: RATING_FIELD_NAME,
      teamName: 'string',
    })
    return data
  } catch (error) {
    console.error('Error adding leader:', error)
    throw error
  }
}
