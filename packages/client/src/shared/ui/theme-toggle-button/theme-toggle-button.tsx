import { Button } from 'antd'
import { useTheme } from '@/shared/themes/themeContext'

export const ThemeToggleButton = () => {
  const { mode, toggleTheme } = useTheme()

  return (
    <Button onClick={toggleTheme} type="default">
      {mode === 'light' ? '🌙 Тёмная тема' : '☀️ Светлая тема'}
    </Button>
  )
}
