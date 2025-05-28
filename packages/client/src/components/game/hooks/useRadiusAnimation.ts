import { useCallback, useRef, useState } from 'react'

const easeOutCubic = (progress: number) => 1 - Math.pow(1 - progress, 3)

export const useRadiusAnimation = (initialRadius: number) => {
  const [radius, setRadius] = useState(initialRadius)
  const animationRef = useRef<number | null>(null)

  const animateRadius = useCallback(
    (from: number, to: number, duration: number) => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current)

      const start = performance.now()

      const step = (now: number) => {
        const elapsed = now - start
        const progress = Math.min(elapsed / duration, 1)
        const eased = easeOutCubic(progress)

        setRadius(from + (to - from) * eased)

        progress < 1
          ? (animationRef.current = requestAnimationFrame(step))
          : (animationRef.current = null)
      }

      animationRef.current = requestAnimationFrame(step)
    },
    []
  )

  return { radius, animateRadius }
}
