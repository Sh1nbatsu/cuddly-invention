import { useFullscreen } from '@/hooks/useFullscreen'
import { FullscreenButton, FullscreenClose, FullscreenOpen } from './styled'

export const FullscreenToggler = () => {
  const { isFullscreen, toggleFullscreen } = useFullscreen()

  return (
    <FullscreenButton title="Toggle fullscreen" onClick={toggleFullscreen}>
      {isFullscreen ? <FullscreenClose /> : <FullscreenOpen />}
    </FullscreenButton>
  )
}
