import { useScore } from '@/entities/game/model/hooks/useScore'
import { addLeaderHandler } from '@/entities/leaderboard/leaderboard.handler'
import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { BASE_URL } from '../libs/axios'
import { useCurrentUser } from './useCurrentUser'

export const useLeaderboardSync = () => {
  const user = useCurrentUser()
  const username = user?.login || 'undefined'
  const [score] = useScore()
  const location = useLocation()

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
    navigator.sendBeacon(BASE_URL, JSON.stringify(data))
  }

  useEffect(() => {
    addLeaderHandler(score)
  }, [location])

  useEffect(() => {
    window.addEventListener('beforeunload', syncLeaderboard)
    return () => {
      window.removeEventListener('beforeunload', syncLeaderboard)
    }
  }, [])
}
