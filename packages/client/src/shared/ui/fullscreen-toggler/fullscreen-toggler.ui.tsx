import { useFullscreen } from '@/shared/hooks/useFullscreen'
import {
  FullscreenButton,
  FullscreenClose,
  FullscreenOpen,
} from './fullscreen-toggler.styled'

export const FullscreenToggler = () => {
  const { isFullscreen, toggleFullscreen } = useFullscreen()

  return (
    <FullscreenButton title="Полноэкранный режим" onClick={toggleFullscreen}>
      {isFullscreen ? <FullscreenClose /> : <FullscreenOpen />}
    </FullscreenButton>
  )
}
