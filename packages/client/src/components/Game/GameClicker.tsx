import { useGame } from '@/hooks/useGame'
import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react'

const TARGET_RADIUS = 80
const MIN_RADIUS = TARGET_RADIUS * 0.9
const TEXT_OFFSET = 50
const LOCAL_STORAGE_KEY = 'score'

const easeOutCubic = (progress: number) => 1 - Math.pow(1 - progress, 3)

export const GameClicker = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const containerRef = useRef<HTMLDivElement | null>(null)

  const { score, setScore } = useGame()

  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })
  const [radius, setRadius] = useState(TARGET_RADIUS)

  const animationFrameId = useRef<number | null>(null)
  const targetPos = useRef({ x: 0, y: 0 })

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, score.toString())
  }, [score])

  useLayoutEffect(() => {
    const updateSize = () => {
      if (!containerRef.current) return
      const width = containerRef.current.clientWidth
      const height = containerRef.current.clientHeight
      setDimensions({ width, height })
      targetPos.current = { x: width / 2, y: height / 2 }
    }

    updateSize()
    const observer = new ResizeObserver(updateSize)
    containerRef.current && observer.observe(containerRef.current)

    return () => observer.disconnect()
  }, [])

  const animateRadius = useCallback(
    (from: number, to: number, duration: number) => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current)
      }

      const startTime = performance.now()

      const animate = (now: number) => {
        const elapsed = now - startTime
        const progress = Math.min(elapsed / duration, 1)
        const eased = easeOutCubic(progress)

        const current = from + (to - from) * eased
        setRadius(current)

        if (progress < 1) {
          animationFrameId.current = requestAnimationFrame(animate)
        } else {
          setRadius(to)
          animationFrameId.current = null
        }
      }

      animationFrameId.current = requestAnimationFrame(animate)
    },
    []
  )

  const handleMouseDown = useCallback(
    (e: React.MouseEvent<HTMLCanvasElement>) => {
      const canvas = canvasRef.current
      if (!canvas) return

      const rect = canvas.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top

      const dx = x - targetPos.current.x
      const dy = y - targetPos.current.y

      if (dx * dx + dy * dy <= radius * radius) {
        setScore((prev: number) => prev + 1)
        animateRadius(TARGET_RADIUS, MIN_RADIUS, 100)
      }
    },
    [radius, animateRadius]
  )

  const handleMouseUp = useCallback(() => {
    animateRadius(radius, TARGET_RADIUS, 150)
  }, [radius, animateRadius])

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas?.getContext('2d')

    if (!canvas || !ctx || dimensions.width === 0 || dimensions.height === 0)
      return

    canvas.width = dimensions.width
    canvas.height = dimensions.height

    ctx.clearRect(0, 0, dimensions.width, dimensions.height)

    ctx.font = '48px Nunito'
    ctx.fillStyle = 'black'
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    ctx.fillText(
      `${score}`,
      targetPos.current.x,
      targetPos.current.y - TARGET_RADIUS - TEXT_OFFSET
    )

    ctx.beginPath()
    ctx.arc(targetPos.current.x, targetPos.current.y, radius, 0, Math.PI * 2)
    ctx.fillStyle = 'black'
    ctx.fill()
  }, [score, radius, dimensions])

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
