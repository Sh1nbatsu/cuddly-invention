import { useRef, Dispatch, SetStateAction } from 'react'

import { useUpgradesContext } from '@/components/Game/provider/upgradesProvider'
import { useCanvasSize } from '@/components/Game/hooks/useCanvasSize'
import { useRadiusAnimation } from '@/components/Game/hooks/useRadiusAnimation'
import { useClickLogic } from '@/components/Game/hooks/useClickLogic'
import { usePassiveIncome } from '@/components/Game/hooks/usePassiveIncome'
import { useCanvasRender } from '@/components/Game/hooks/useCanvasRender'
import { TARGET_RADIUS } from '@/components/Game/utils/utils'

interface CanvasProps {
  score: number
  setScore: Dispatch<SetStateAction<number>>
}

export const Canvas = ({ score, setScore }: CanvasProps) => {
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
