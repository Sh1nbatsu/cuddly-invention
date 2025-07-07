import { useFullscreen } from '@/shared/hooks/useFullscreen'
import {
  FullscreenButton,
  FullscreenClose,
  FullscreenOpen,
} from './fullscreen-toggler.styled'
import { useClient } from '@/shared/hooks/useClient'

export const FullscreenToggler = () => {
  useClient()
  const { isFullscreen, toggleFullscreen } = useFullscreen()

  return (
    <FullscreenButton title="Полноэкранный режим" onClick={toggleFullscreen}>
      {isFullscreen ? <FullscreenClose /> : <FullscreenOpen />}
    </FullscreenButton>
  )
}
