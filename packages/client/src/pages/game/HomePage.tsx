import { GameRootContent } from '@/components/Game/GameRootContent'
import { Header } from '@/components/Header/Header'
import Wrapper from '@/components/Wrapper'
import { GameProvider } from '@/context/GameContext'
import { LogoutButton } from '@/components/LogoutButton/LogoutButton'

const HomePage = () => {
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
      <LogoutButton />
    </Wrapper>
  )
}

export default HomePage
