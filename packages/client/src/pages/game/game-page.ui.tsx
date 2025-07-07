import { GameProvider } from '@/entities/game/game.context'
import { fetchMe } from '@/entities/user/model/user.thunk'
import { useAppDispatch } from '@/providers/store/store.hooks'
import { useCurrentUser } from '@/shared/hooks/useCurrentUser'
import { useLeaderboardSync } from '@/shared/hooks/useLeaderboardSync'

import { GameRootContent } from '@/widgets/game/game-feed.ui'
import { useEffect } from 'react'

export const GamePage = () => {
  const dispatch = useAppDispatch()
  const user = useCurrentUser()
  useEffect(() => {
    if (!user?.id) {
      dispatch(fetchMe())
    }
  }, [user?.id, dispatch])
  useLeaderboardSync()

  return (
    <GameProvider>
      <GameRootContent />
    </GameProvider>
  )
}
