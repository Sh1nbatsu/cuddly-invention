import { useState } from 'react'

import { Canvas } from './Canvas'
import { GameEnd } from './GameEnd'
import { GameStart } from './GameStart'
import { useGameControl } from './hooks/useGameControl'

import { SidebarUpgrades } from '@/components/Game/SidebarUpgrades'
import { formatNumber } from '@/components/Game/utils/utils'

import { UpgradesProvider } from '@/components/Game/provider/upgradesProvider'

export const GameRootContent = () => {
  const {
    showStart,
    isGameOver,
    isGameStarted,
    showEnd,
    onContinue,
    onStartPlay,
    score,
    setScore,
  } = useGameControl()

  const [buyAmount, setBuyAmount] = useState(1)

  return (
    <>
      {showStart && (
        <GameStart visible={!isGameStarted} onStartPlay={onStartPlay} />
      )}

      {isGameStarted && (
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
      )}
      {showEnd && <GameEnd visible={isGameOver} onContinue={onContinue} />}
    </>
  )
}
