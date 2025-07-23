import React, { createContext, useContext, useEffect, useState } from 'react'

type ThemeMode = 'light' | 'dark'

interface ThemeContextProps {
  mode: ThemeMode
  toggleTheme: () => void
}

const ThemeContext = createContext<ThemeContextProps | undefined>(undefined)

export const useTheme = () => {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error(
      'useTheme необходимо использовать в рамках ThemeProviderCustom'
    )
  }
  return context
}

export const ThemeProviderCustom = ({
  children,
}: {
  children: React.ReactNode
}) => {
  if (typeof window === 'undefined') return
  const [mode, setMode] = useState<ThemeMode>(
    (localStorage.getItem('theme') as ThemeMode) ||
      (window.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'dark'
        : 'light')
  )

  useEffect(() => {
    if (typeof window === 'undefined') return
    localStorage.setItem('theme', mode)
    document.documentElement.setAttribute('data-theme', mode)
  }, [mode])

  const toggleTheme = () => {
    setMode(prev => (prev === 'light' ? 'dark' : 'light'))
  }

  return (
    <ThemeContext.Provider value={{ mode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}
