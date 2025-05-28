import { useState, useEffect } from 'react'

const LOCAL_STORAGE_KEY = 'score'

export const useScore = () => {
  const [score, setScore] = useState(() => {
    const stored = localStorage.getItem(LOCAL_STORAGE_KEY)
    return stored ? parseInt(stored, 10) : 0
  })

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, score.toString())
  }, [score])

  return [score, setScore] as const
}
