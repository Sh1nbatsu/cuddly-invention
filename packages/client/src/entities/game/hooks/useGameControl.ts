import { useGame } from '@/entities/game/hooks/useGame'
import { useCallback, useEffect, useState } from 'react'

export const useGameControl = () => {
  const [isGameStarted, setIsGameStarted] = useState(false)
  const [showStart, setShowStart] = useState(true)
  const [isGameOver, setIsGameOver] = useState(false)
  const [showEnd, setShowEnd] = useState(false)

  const { score, setScore } = useGame()

  const hasSeenEnding = localStorage.getItem('hasSeenEnding') === 'true'

  const onStartPlay = useCallback(() => {
    setIsGameStarted(true)
  }, [])

  const onContinue = useCallback(() => {
    setIsGameOver(false)
    setShowEnd(false)
    setIsGameStarted(true)
  }, [])

  const triggerGameEnd = useCallback(() => {
    setIsGameOver(true)
    setShowEnd(true)
    setIsGameStarted(false)
    setShowStart(false)
    localStorage.setItem('hasSeenEnding', 'true')
  }, [])

  useEffect(() => {
    if (isGameStarted) {
      const timeout = setTimeout(() => setShowStart(false), 500)
      return () => clearTimeout(timeout)
    } else if (!isGameOver) {
      setShowStart(true)
    }
  }, [isGameStarted, isGameOver])

  useEffect(() => {
    if (score >= 10 && !hasSeenEnding) {
      triggerGameEnd()
    }
  }, [score, hasSeenEnding, triggerGameEnd])

  return {
    showStart,
    isGameStarted,
    isGameOver,
    showEnd,
    score,
    onStartPlay,
    onContinue,
    setScore,
  }
}
