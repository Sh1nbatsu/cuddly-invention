import { useGame } from '@/hooks/useGame'
import dinoSticker from '/dino-sticker.jpg'

import { StyledGameImage, StyledGameTitle, StyledGameWrapper } from './styled'

interface GameStartProps {
  visible: boolean
  onStartPlay: () => void
}

export const GameStart = ({ visible, onStartPlay }: GameStartProps) => {
  const { score } = useGame()
  return (
    <StyledGameWrapper $visible={visible}>
      <StyledGameImage onClick={onStartPlay} src={dinoSticker} alt="sticker" />
      <StyledGameTitle onClick={onStartPlay} level={2}>
        {score >= 1 ? 'Продолжить игру' : 'Начать игру'}
      </StyledGameTitle>
    </StyledGameWrapper>
  )
}
