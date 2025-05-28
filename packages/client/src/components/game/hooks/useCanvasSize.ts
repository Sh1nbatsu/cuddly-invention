import { useLayoutEffect, useRef, useState } from 'react'

export const useCanvasSize = () => {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })

  useLayoutEffect(() => {
    const updateSize = () => {
      if (!containerRef.current) return

      const width = containerRef.current.clientWidth
      const height = containerRef.current.clientHeight

      setDimensions({ width, height })
    }

    updateSize()

    const observer = new ResizeObserver(updateSize)
    containerRef.current && observer.observe(containerRef.current)

    return () => observer.disconnect()
  }, [])

  return [containerRef, dimensions] as const
}
