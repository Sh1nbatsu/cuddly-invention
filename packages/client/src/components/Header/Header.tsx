import React from 'react'
import { CustomLink } from '../CustomLink/CustomLink'
import { OfflineBadge } from './OfflineBadge'
import { StyledHeader, StyledNav } from './styled'

interface HeaderProps {
  logo?: React.ReactNode
}

const NAV_ITEMS = [
  { to: '/forum', text: 'Форум' },
  { to: '/leaderboard', text: 'Таблица лидеров' },
  { to: '/sign-up', text: 'Авторизация' },
]

export const Header = ({ logo = 'Дино Кликер' }: HeaderProps) => {
  return (
    <StyledHeader>
      <CustomLink to="/" variant="retro">
        {logo}
      </CustomLink>
      <StyledNav>
        {NAV_ITEMS.map((item, index) => (
          <CustomLink key={index} to={item.to} variant="retro">
            {item.text}
          </CustomLink>
        ))}
      </StyledNav>
      <OfflineBadge />
    </StyledHeader>
  )
}
