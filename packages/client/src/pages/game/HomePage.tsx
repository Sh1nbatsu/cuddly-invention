import Header from '@/components/Header'
import Wrapper from '@/components/Wrapper'
import { Canvas } from '@/components/game/Canvas'
import { useServiceWorker } from '@/hooks/useServiceWorker'

const HomePage = () => {
  useServiceWorker()
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
        <Canvas />
      </div>
    </Wrapper>
  )
}

export default HomePage
