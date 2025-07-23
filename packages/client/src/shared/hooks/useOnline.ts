import { useEffect, useState } from 'react'
import { useClient } from './useClient'

export const useOnline = () => {
  useClient()
  const [isOnline, setIsOnline] = useState(navigator.onLine)

  useEffect(() => {
    if (typeof window === 'undefined') return
    const handleOnline = () => setIsOnline(true)
    const handleOffline = () => setIsOnline(false)

    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)

    return () => {
      window.removeEventListener('online', handleOnline)
      window.removeEventListener('offline', handleOffline)
    }
  }, [])

  return {
    isOnline,
  }
}
