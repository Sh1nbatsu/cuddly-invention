import { StyledGamePageWrapper } from '@/pages/game/game-page.styled'
import { createContext, ReactNode } from 'react'
import { useScore } from './model/hooks/useScore'

interface GameContextType {
  score: number
  setScore: React.Dispatch<React.SetStateAction<number>>
  resetScore: () => void
}

export const GameContext = createContext<GameContextType | undefined>(undefined)

export const GameProvider = ({ children }: { children: ReactNode }) => {
  const [score, setScore] = useScore()

  const resetScore = () => {
    setScore(0)
    localStorage.setItem('score', '0')
  }

  return (
    <StyledGamePageWrapper>
      <GameContext.Provider value={{ score, setScore, resetScore }}>
        {children}
      </GameContext.Provider>
    </StyledGamePageWrapper>
  )
}
