import { useUpgradesContext } from '@/entities/game/game-upgrades/game-upgrades.context'
import { TARGET_RADIUS } from '@/entities/game/model/game.constants'
import { useCanvasRender } from '@/entities/game/model/hooks/useCanvasRender'
import { useCanvasSize } from '@/entities/game/model/hooks/useCanvasSize'
import { useClickLogic } from '@/entities/game/model/hooks/useClickLogic'
import { usePassiveIncome } from '@/entities/game/model/hooks/usePassiveIncome'
import { useRadiusAnimation } from '@/entities/game/model/hooks/useRadiusAnimation'
import { Dispatch, SetStateAction, useRef } from 'react'

interface GameCanvasProps {
  score: number
  setScore: Dispatch<SetStateAction<number>>
}

export const GameCanvas = ({ score, setScore }: GameCanvasProps) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const [containerRef, dimensions] = useCanvasSize()
  const { radius, animateRadius } = useRadiusAnimation(TARGET_RADIUS)
  const { getUpgradesTotalPower } = useUpgradesContext()

  const power = getUpgradesTotalPower()

  const { handleMouseDown, handleMouseUp } = useClickLogic(
    canvasRef,
    radius,
    setScore,
    animateRadius,
    score
  )

  usePassiveIncome(setScore, power)
  useCanvasRender(canvasRef, dimensions, score, radius, power)

  return (
    <div ref={containerRef} style={{ width: '100%', height: '100%' }}>
      <canvas
        ref={canvasRef}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      />
    </div>
  )
}
