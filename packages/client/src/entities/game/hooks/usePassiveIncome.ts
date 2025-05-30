import { useEffect, Dispatch, SetStateAction } from 'react'

export function usePassiveIncome(
  setScore: Dispatch<SetStateAction<number>>,
  power: number
): void {
  useEffect(() => {
    const interval = setInterval(() => {
      if (power > 0) {
        setScore(prev => prev + power)
      }
    }, 1000)

    return () => clearInterval(interval)
  }, [power, setScore])
}
