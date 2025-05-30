import { GameProvider } from '@/context/GameContext'
import { useAppDispatch, useAppSelector } from '@/store/store'
import { selectUser } from '@/store/user/user.selector'
import { fetchMe } from '@/store/user/user.slice'
import { GameRootContent } from '@/widgets/game/game-feed.ui'
import { useEffect } from 'react'

const HomePage = () => {
  const dispatch = useAppDispatch()
  const { user } = useAppSelector(selectUser)
  useEffect(() => {
    if (!user?.id) {
      dispatch(fetchMe())
    }
  }, [user?.id, dispatch])

  return (
    <div
      style={{
        display: 'flex',
        height: 'calc(100vh - 74px - 74px)',
        border: '2px solid var(--color-primary)',
        borderRadius: '4px',
        position: 'relative',
      }}>
      <GameProvider>
        <GameRootContent />
      </GameProvider>
    </div>
  )
}

export default HomePage
