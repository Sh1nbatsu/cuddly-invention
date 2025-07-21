import { RefObject, useEffect, useRef, useState } from 'react'
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
  const imageRef = useRef<HTMLImageElement | null>(null)
  const [isHovered, setIsHovered] = useState(false)

  useEffect(() => {
    if (!imageRef.current) {
      imageRef.current = new Image()
      imageRef.current.src = '/pwa-192x192.png'
    }
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      const centerX = dimensions.width / 2
      const centerY = dimensions.height / 2
      const distance = Math.hypot(x - centerX, y - centerY)
      setIsHovered(distance <= radius)
    }

    canvas.addEventListener('mousemove', handleMouseMove)
    return () => canvas.removeEventListener('mousemove', handleMouseMove)
  }, [canvasRef, dimensions, radius])

  useEffect(() => {
    const canvas = canvasRef.current
    if (canvas) canvas.style.cursor = isHovered ? 'pointer' : 'default'
  }, [isHovered, canvasRef])

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas?.getContext('2d')
    if (!canvas || !ctx || !dimensions.width || !dimensions.height) return

    const computedStyles = getComputedStyle(document.documentElement)
    const textColor =
      computedStyles.getPropertyValue('--color-text').trim() || '#000'

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
    ctx.fillText(
      `${formatNumber(power)} / сек.`,
      dimensions.width / 2,
      dimensions.height / 2 - TARGET_RADIUS - TEXT_OFFSET + 20
    )

    const size = radius * 2
    const x = dimensions.width / 2 - radius
    const y = dimensions.height / 2 - radius

    if (imageRef.current?.complete) {
      ctx.drawImage(imageRef.current, x, y, size, size)
    } else {
      ctx.beginPath()
      ctx.arc(
        dimensions.width / 2,
        dimensions.height / 2,
        radius,
        0,
        Math.PI * 2
      )
      ctx.fillStyle = textColor
      ctx.fill()
    }
  }, [canvasRef, dimensions, score, radius, power])
}
