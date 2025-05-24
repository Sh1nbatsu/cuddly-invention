import { GameRootContent } from '@/components/Game/GameRootContent'
import { Header } from '@/components/Header/Header'
import Wrapper from '@/components/Wrapper'
import { GameProvider } from '@/context/GameContext'

const HomePage = () => {
  return (
    <Wrapper>
      <Header />
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: 'calc(100vh - 74px - 74px)',
        }}>
        <GameProvider>
          <GameRootContent />
        </GameProvider>
      </div>
    </Wrapper>
  )
}

export default HomePage
