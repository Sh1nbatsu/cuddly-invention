import { useAppDispatch, useAppSelector } from '@/store/store'
import { selectUser } from '@/store/user/user.selector'
import { fetchMe } from '@/store/user/user.slice'
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

  return <GameRootContent />
}
