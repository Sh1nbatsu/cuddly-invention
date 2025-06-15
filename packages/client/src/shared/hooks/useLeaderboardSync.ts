import { useEffect } from 'react'
import { useScore } from '@/entities/game/model/hooks/useScore'
import { useSelector } from 'react-redux'
import { selectUser } from '@/entities/user/model/user.selector'

const URL = 'https://ya-praktikum.tech/api/v2/leaderboard'

export const useLeaderboardSync = () => {
  const user = useSelector(selectUser)
  const username = user.user?.login || 'undefined'

  const syncLeaderboard = () => {
    const [score] = useScore()
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
    window.addEventListener('beforeunload', syncLeaderboard)
    return () => {
      window.removeEventListener('beforeunload', syncLeaderboard)
    }
  }, [])
}
