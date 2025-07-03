import { useScore } from '@/entities/game/model/hooks/useScore'
import { addLeaderHandler } from '@/entities/leaderboard/leaderboard.handler'
import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { useCurrentUser } from './useCurrentUser'

const URL = 'https://ya-praktikum.tech/api/v2/leaderboard'

export const useLeaderboardSync = () => {
  const user = useCurrentUser()
  const username = user?.login || 'undefined'
  const [score] = useScore()
  const location = useLocation()
  console.log(username, score)

  const syncLeaderboard = () => {
    const data = {
      data: {
        undefScore12: score,
        date: new Date().toLocaleDateString(),
        username: username,
        avatar: user?.avatar || '',
      },
      ratingFieldName: 'undefScore12',
      teamName: 'string',
    }
    navigator.sendBeacon(URL, JSON.stringify(data))
  }

  useEffect(() => {
    addLeaderHandler(score, username)
  }, [location])

  useEffect(() => {
    window.addEventListener('beforeunload', syncLeaderboard)
    return () => {
      window.removeEventListener('beforeunload', syncLeaderboard)
    }
  }, [])
}
