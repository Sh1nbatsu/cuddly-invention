import { getLeaderboardApi, addLeaderApi } from './leaderboard.api'

import { LeaderData } from '@/shared/types/Leaderboard'

const RATING_FIELD_NAME = 'undefScore12'

export const getLeaderboardHandler = async (cursor: number) => {
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
  date: string
) => {
  try {
    const data = await addLeaderApi({
      data: {
        undefScore12: score,
        date,
        username,
      },
      ratingFieldName: RATING_FIELD_NAME,
      teamName: 'string',
    })
    return data as [{ data: LeaderData }]
  } catch (error) {
    console.error('Error adding leader:', error)
    throw error
  }
}
