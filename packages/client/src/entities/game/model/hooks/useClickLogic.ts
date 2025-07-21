import {
  Dispatch,
  MouseEvent,
  RefObject,
  SetStateAction,
  useCallback,
} from 'react'
import { useEffect } from 'react'
import { MIN_RADIUS, TARGET_RADIUS } from '../game.constants'
import { getClickGain } from '../game.lib'
import { achievementService } from '@/notification/achievement-service'
import { useClient } from '@/shared/hooks/useClient'

type AnimateRadius = (from: number, to: number, duration: number) => void

type UseClicklogicReturn = {
  handleMouseDown: (e: MouseEvent<HTMLCanvasElement>) => void
  handleMouseUp: () => void
}

export function useClickLogic(
  canvasRef: RefObject<HTMLCanvasElement>,
  radius: number,
  setScore: Dispatch<SetStateAction<number>>,
  animateRadius: AnimateRadius,
  score: number
): UseClicklogicReturn {
  useClient()
  useEffect(() => {
    achievementService.processScore(score)
  }, [score])

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
      if (dx * dx + dy * dy > radius * radius) return

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
