import {
  StyledGameImage,
  StyledGameTitle,
  StyledGameWrapper,
} from '@/entities/game/game.styled'
import { useGame } from '@/entities/game/model/hooks/useGame'
import dinoSticker from '/pwa-192x192.png'

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
