import { useEffect } from 'react'
import { useScore } from '@/entities/game/model/hooks/useScore'
import { useSelector } from 'react-redux'
import { selectUser } from '@/entities/user/model/user.selector'
import { useLocation } from 'react-router-dom'
import { addLeaderHandler } from '@/entities/leaderboard/leaderboard.handler'

const URL = 'https://ya-praktikum.tech/api/v2/leaderboard'

export const useLeaderboardSync = () => {
  const user = useSelector(selectUser)
  const username = user.user?.login || 'undefined'
  const [score] = useScore()
  const location = useLocation()

  const syncLeaderboard = () => {
    const data = {
      data: {
        undefScore12: score,
        date: new Date().toLocaleDateString(),
        username: username,
        avatar: user.user?.avatar || '',
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
