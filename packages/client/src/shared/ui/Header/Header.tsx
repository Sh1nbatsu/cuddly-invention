import { logout } from '@/api/auth'
import { useCurrentUser } from '@/shared/hooks/useCurrentUser'
import React from 'react'
import { CustomLink } from '../custom-link/custom-link.ui'
import { OfflineBadge } from './header-offline-badge.ui'
import { StyledHeader, StyledNav } from './header.styled'

interface HeaderProps {
  logo?: React.ReactNode
}

export const Header = ({ logo = 'Дино Кликер' }: HeaderProps) => {
  const { user } = useCurrentUser()

  const handleLogout = async () => {
    try {
      await logout()
    } catch (error) {
      console.error('Ошибка при выходе:', error)
    }
  }

  return (
    <StyledHeader>
      <CustomLink to="/" variant="retro">
        {logo}
      </CustomLink>
      <StyledNav>
        <CustomLink to="/forum" variant="retro">
          Форум
        </CustomLink>
        <CustomLink to="/leaderboard" variant="retro">
          Таблица лидеров
        </CustomLink>

        {!user ? (
          <CustomLink to="sign-up" variant="retro">
            Авторизация
          </CustomLink>
        ) : (
          <CustomLink onClick={handleLogout} to="sign-up" variant="retro">
            Выйти
          </CustomLink>
        )}
      </StyledNav>
      <OfflineBadge />
    </StyledHeader>
  )
}
