import { useScore } from '@/components/Game/hooks/useScore'
import { createContext, ReactNode } from 'react'

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
    <GameContext.Provider value={{ score, setScore, resetScore }}>
      {children}
    </GameContext.Provider>
  )
}
