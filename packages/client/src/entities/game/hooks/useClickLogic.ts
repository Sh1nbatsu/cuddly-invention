import {
  Dispatch,
  MouseEvent,
  RefObject,
  SetStateAction,
  useCallback,
} from 'react'
import { MIN_RADIUS, TARGET_RADIUS } from '../game.constants'
import { getClickGain } from '../game.lib'

type AnimateRadius = (from: number, to: number, duration: number) => void

export function useClickLogic(
  canvasRef: RefObject<HTMLCanvasElement>,
  radius: number,
  setScore: Dispatch<SetStateAction<number>>,
  animateRadius: AnimateRadius,
  score: number
): {
  handleMouseDown: (e: MouseEvent<HTMLCanvasElement>) => void
  handleMouseUp: () => void
} {
  const handleMouseDown = useCallback(
    (e: MouseEvent<HTMLCanvasElement>) => {
      const canvas = canvasRef.current
      if (!canvas) return

      const rect = canvas.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      const centerX = canvas.width / 2
      const centerY = canvas.height / 2
      const dx = x - centerX
      const dy = y - centerY
      const distanceSquared = dx * dx + dy * dy

      if (distanceSquared > radius * radius) return

      const gain = getClickGain(score)
      setScore(prev => prev + gain)
      animateRadius(TARGET_RADIUS, MIN_RADIUS, 100)
    },
    [canvasRef, radius, score, setScore, animateRadius]
  )

  const handleMouseUp = useCallback(() => {
    animateRadius(radius, TARGET_RADIUS, 150)
  }, [radius, animateRadius])

  return { handleMouseDown, handleMouseUp }
}
