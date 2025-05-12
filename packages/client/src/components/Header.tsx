import React from 'react'
import { CustomLink } from './CustomLink/CustomLink'

interface HeaderProps {
  logo?: React.ReactNode
  navItems?: {
    to: string
    text: string
    variant?: 'primary' | 'secondary' | 'text'
  }[]
}

const Header: React.FC<HeaderProps> = ({
  logo = 'Дино Кликер',
  navItems = [
    { to: '/leaderboard', text: 'Таблица лидеров' },
    { to: '/sign-up', text: 'Авторизация' },
  ],
}) => {
  return (
    <header
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        padding: '16px 0',
      }}>
      <CustomLink to="/" variant="retro">
        {logo}
      </CustomLink>

      <nav style={{ display: 'flex', gap: '16px' }}>
        {navItems.map((item, index) => (
          <CustomLink key={index} to={item.to} variant="retro">
            {item.text}
          </CustomLink>
        ))}
      </nav>
    </header>
  )
}

export default Header
