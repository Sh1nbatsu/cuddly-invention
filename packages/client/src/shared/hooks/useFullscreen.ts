import { useCallback, useEffect, useState } from 'react'

export const useFullscreen = () => {
  const [isFullscreen, setIsFullscreen] = useState(false)
  const toggleFullscreen = useCallback(() => {
    if (typeof window === 'undefined') return
    if (document.fullscreenElement) {
      document.exitFullscreen()
      setIsFullscreen(false)
    } else if (document.documentElement.requestFullscreen) {
      document.documentElement.requestFullscreen()
      setIsFullscreen(true)
    }
  }, [])

  const handleEscape = () => {
    if (typeof window === 'undefined') return
    if (document.fullscreenElement) {
      setIsFullscreen(true)
    } else {
      setIsFullscreen(false)
    }
  }

  const handleCombination = (event: KeyboardEvent) => {
    if ((event.key === 'F' || event.key === 'f') && event.shiftKey) {
      toggleFullscreen()
    }
  }

  useEffect(() => {
    if (typeof window === 'undefined') return
    document.addEventListener('fullscreenchange', handleEscape)

    document.addEventListener('keydown', handleCombination)

    return () => {
      document.removeEventListener('fullscreenchange', handleEscape)
      document.removeEventListener('keydown', handleCombination)
    }
  }, [])

  return { isFullscreen, toggleFullscreen }
}
