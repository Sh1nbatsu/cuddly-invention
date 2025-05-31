import { UpgradesProvider } from '@/entities/game/game-upgrades/game-upgrades.context'
import { useGameControl } from '@/entities/game/model/hooks/useGameControl'
import { GameCanvas } from '@/features/game/game-canvas/game-canvas.ui'
import { GameEnd } from '@/features/game/game-end/game-end.ui'
import { GameStart } from '@/features/game/game-start/game-start.ui'
import { GameUpgradesSidebar } from '@/features/game/game-upgrades/game-upgrades.ui'

import { useState } from 'react'

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
          <GameUpgradesSidebar
            buyAmount={buyAmount}
            setBuyAmount={setBuyAmount}
            score={score}
            setScore={setScore}
          />
          <GameCanvas score={score} setScore={setScore} />
        </UpgradesProvider>
      )}
      {showEnd && <GameEnd visible={isGameOver} onContinue={onContinue} />}
    </>
  )
}
