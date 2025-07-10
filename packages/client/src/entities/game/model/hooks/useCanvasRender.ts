import { RefObject, useEffect } from 'react'
import { TARGET_RADIUS, TEXT_OFFSET } from '../game.constants'
import { formatNumber } from '../game.lib'

interface Dimensions {
  width: number
  height: number
}

export function useCanvasRender(
  canvasRef: RefObject<HTMLCanvasElement>,
  dimensions: Dimensions,
  score: number,
  radius: number,
  power: number
): void {
  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas?.getContext('2d')

    if (!canvas || !ctx || !dimensions.width || !dimensions.height) return

    const computedStyles = getComputedStyle(document.documentElement)
    const textColor = computedStyles.getPropertyValue('--color-text').trim()

    canvas.width = dimensions.width
    canvas.height = dimensions.height

    ctx.clearRect(0, 0, dimensions.width, dimensions.height)

    ctx.font = '48px Nunito'
    ctx.fillStyle = textColor
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    ctx.fillText(
      formatNumber(score),
      dimensions.width / 2,
      dimensions.height / 2 - TARGET_RADIUS - TEXT_OFFSET - 20
    )

    ctx.font = '20px Nunito'
    ctx.fillStyle = textColor
    ctx.fillText(
      `${formatNumber(power)} / сек.`,
      dimensions.width / 2,
      dimensions.height / 2 - TARGET_RADIUS - TEXT_OFFSET + 20
    )

    ctx.beginPath()
    ctx.arc(dimensions.width / 2, dimensions.height / 2, radius, 0, Math.PI * 2)
    ctx.fillStyle = textColor
    ctx.fill()
  }, [canvasRef, dimensions, score, radius, power])
}
