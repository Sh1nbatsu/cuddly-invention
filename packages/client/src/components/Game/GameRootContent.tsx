import styled from 'styled-components'
import { GameClicker } from './GameClicker'
import { GameEnd } from './GameEnd'
import { GameStart } from './GameStart'
import { useGameLogic } from './hooks/useGameLogic'

const StyledWrapper = styled.div`
  width: 100%;
  height: 100%;
`

export const GameRootContent = () => {
  const {
    showStart,
    isGameOver,
    isGameStarted,
    showEnd,
    onContinue,
    onStartPlay,
  } = useGameLogic()

  return (
    <StyledWrapper>
      {showStart && (
        <GameStart visible={!isGameStarted} onStartPlay={onStartPlay} />
      )}
      {isGameStarted && <GameClicker />}
      {showEnd && <GameEnd visible={isGameOver} onContinue={onContinue} />}
    </StyledWrapper>
  )
}
