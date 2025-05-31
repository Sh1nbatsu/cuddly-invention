import { GameProvider } from '@/entities/game/game.context'
import { selectUser } from '@/entities/user/model/user.selector'
import { fetchMe } from '@/entities/user/model/user.thunk'
import { useAppDispatch, useAppSelector } from '@/providers/store/store.hooks'

import { GameRootContent } from '@/widgets/game/game-feed.ui'
import { useEffect } from 'react'

export const GamePage = () => {
  const dispatch = useAppDispatch()
  const { user } = useAppSelector(selectUser)
  useEffect(() => {
    if (!user?.id) {
      dispatch(fetchMe())
    }
  }, [user?.id, dispatch])

  return (
    <GameProvider>
      <GameRootContent />
    </GameProvider>
  )
}
