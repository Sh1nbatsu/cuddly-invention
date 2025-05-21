import { useState } from 'react'

import { FullscreenButton, FullscreenButtonImg } from './styled'

export const FullscreenToggler = () => {
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

  return (
    <FullscreenButton title="Toggle fullscreen" onClick={toggleFullscreen}>
      <FullscreenButtonImg
        src={isFullscreen ? '/fullscreen_close.svg' : '/fullscreen_open.svg'}
        alt="toggle_fullscreen"
      />
    </FullscreenButton>
  )
}
