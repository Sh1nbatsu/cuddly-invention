import React, { useRef, useEffect, useCallback, MouseEvent } from 'react'
import { useCanvasSize } from '@/components/game/hooks/useCanvasSize'
import { useRadiusAnimation } from '@/components/game/hooks/useRadiusAnimation'
import { useUpgradesContext } from '@/components/game/provider/upgradesProvider'

import { formatNumber, getClickGain } from '@/components/game/utils/utils'

const TARGET_RADIUS = 80
const MIN_RADIUS = TARGET_RADIUS * 0.9
const TEXT_OFFSET = 50

interface CanvasProps {
  score: number
  setScore: React.Dispatch<React.SetStateAction<number>>
}

export const Canvas: React.FC<CanvasProps> = ({ score, setScore }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const targetPos = useRef({ x: 0, y: 0 })

  const [containerRef, dimensions] = useCanvasSize()
  const { radius, animateRadius } = useRadiusAnimation(TARGET_RADIUS)
  const { getUpgradesTotalPower } = useUpgradesContext()

  useEffect(() => {
    targetPos.current = {
      x: dimensions.width / 2,
      y: dimensions.height / 2,
    }
  }, [dimensions])

  const handleMouseDown = useCallback(
    (e: MouseEvent<HTMLCanvasElement>) => {
      const canvas = canvasRef.current
      if (!canvas) return

      const rect = canvas.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top

      const dx = x - targetPos.current.x
      const dy = y - targetPos.current.y
      const distanceSquared = dx * dx + dy * dy

      if (distanceSquared > radius * radius) return

      const gain = getClickGain(score)
      setScore(prev => prev + gain)
      animateRadius(TARGET_RADIUS, MIN_RADIUS, 100)
    },
    [radius, score, animateRadius, setScore]
  )

  const handleMouseUp = useCallback(() => {
    animateRadius(radius, TARGET_RADIUS, 150)
  }, [radius, animateRadius])

  const power = getUpgradesTotalPower()

  useEffect(() => {
    const interval = setInterval(() => {
      if (power > 0) {
        setScore(prev => prev + power)
      }
    }, 1000)

    return () => clearInterval(interval)
  }, [power])

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas?.getContext('2d')
    if (!canvas || !ctx || !dimensions.width || !dimensions.height) return

    canvas.width = dimensions.width
    canvas.height = dimensions.height

    ctx.clearRect(0, 0, dimensions.width, dimensions.height)

    ctx.font = '48px Nunito'
    ctx.fillStyle = 'black'
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    ctx.fillText(
      formatNumber(score),
      targetPos.current.x,
      targetPos.current.y - TARGET_RADIUS - TEXT_OFFSET - 20
    )

    ctx.font = '20px Nunito'
    ctx.fillStyle = '#333'
    ctx.fillText(
      `${formatNumber(getUpgradesTotalPower())} / сек.`,
      targetPos.current.x,
      targetPos.current.y - TARGET_RADIUS - TEXT_OFFSET + 20
    )

    ctx.beginPath()
    ctx.arc(targetPos.current.x, targetPos.current.y, radius, 0, Math.PI * 2)
    ctx.fillStyle = 'black'
    ctx.fill()
  }, [score, radius, dimensions, getUpgradesTotalPower])

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
