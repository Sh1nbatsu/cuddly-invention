import { GameRootContent } from '@/components/game/GameRootContent'
import { Header } from '@/components/Header/Header'
import Wrapper from '@/components/Wrapper'
import { GameProvider } from '@/context/GameContext'
import { useAppDispatch, useAppSelector } from '@/store/store'
import { selectUser } from '@/store/user/user.selector'
import { fetchMe } from '@/store/user/user.slice'
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
    <Wrapper>
      <Header />
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
    </Wrapper>
  )
}

export default HomePage
