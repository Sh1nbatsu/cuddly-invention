import { useState } from 'react'

import { Canvas } from './Canvas'
import { GameEnd } from './GameEnd'
import { GameStart } from './GameStart'
import { useGameLogic } from './hooks/useGameLogic'

import { SidebarUpgrades } from '@/components/Game/SidebarUpgrades'
import { useScore } from '@/components/Game/hooks/useScore'
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
  } = useGameLogic()

  const [buyAmount, setBuyAmount] = useState(1)
  const [score, setScoreRaw] = useScore()

  const setScore = (value: number | ((prev: number) => number)) => {
    setScoreRaw(prev => {
      const next = typeof value === 'function' ? value(prev) : value
      return next < 0 ? 0 : next
    })
  }

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
