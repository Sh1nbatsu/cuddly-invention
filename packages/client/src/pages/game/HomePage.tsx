import { useState } from 'react'

import { Header } from '@/components/Header/Header'
import Wrapper from '@/components/Wrapper'

import { Canvas } from '@/components/game/Canvas'
import { SidebarUpgrades } from '@/components/game/SidebarUpgrades'
import { useScore } from '@/components/game/hooks/useScore'
import { formatNumber } from '@/components/game/utils/utils'

import { UpgradesProvider } from '@/components/game/provider/upgradesProvider'

const HomePage = () => {
  const [buyAmount, setBuyAmount] = useState(1)
  const [score, setScoreRaw] = useScore()

  const setScore = (value: number | ((prev: number) => number)) => {
    setScoreRaw(prev => {
      const next = typeof value === 'function' ? value(prev) : value
      return next < 0 ? 0 : next
    })
  }

  return (
    <Wrapper>
      <Header />
      <div
        style={{
          display: 'flex',
          height: 'calc(100vh - 74px - 74px)',
          border: '2px solid var(--color-primary)',
          borderRadius: '4px',
        }}>
        <UpgradesProvider>
          <SidebarUpgrades
            buyAmount={buyAmount}
            setBuyAmount={setBuyAmount}
            score={score}
            setScore={setScore}
            formatNumber={formatNumber}
          />

          <Canvas score={score} setScore={setScore} />
        </UpgradesProvider>
      </div>
    </Wrapper>
  )
}

export default HomePage
