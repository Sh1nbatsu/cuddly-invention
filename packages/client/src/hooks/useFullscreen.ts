import { useState } from 'react'

export const useFullscreen = () => {
  const [isFullscreen, setIsFullscreen] = useState(false)

  const toggleFullscreen = () => {
    if (document.fullscreenElement) {
      document.exitFullscreen()
      setIsFullscreen(false)
    } else if (document.documentElement.requestFullscreen) {
      document.documentElement.requestFullscreen()
      setIsFullscreen(true)
    }
  }

  return { isFullscreen, toggleFullscreen }
}
