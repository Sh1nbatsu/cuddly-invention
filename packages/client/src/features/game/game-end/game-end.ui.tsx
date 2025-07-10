import {
  StyledGameButton,
  StyledGameImage,
  StyledGameTitle,
  StyledGameWrapper,
} from '@/entities/game/game.styled'
import dinoSticker from '/pwa-192x192.png'

interface GameEndProps {
  visible: boolean
  onContinue: () => void
}

export const GameEnd = ({ visible, onContinue }: GameEndProps) => {
  return (
    <StyledGameWrapper $visible={visible}>
      <StyledGameImage src={dinoSticker} alt="sticker" />
      <StyledGameTitle level={2}>Игра окончена</StyledGameTitle>
      <StyledGameButton onClick={onContinue}>
        Продолжить бесконечную игру
      </StyledGameButton>
    </StyledGameWrapper>
  )
}
