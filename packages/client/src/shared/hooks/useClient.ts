import { useEffect, useState } from 'react'

// https://github.com/vercel/next.js/discussions/17443
export const useClient = () => {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return mounted
}
