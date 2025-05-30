import { logout } from '@/api/auth'
import { useAppSelector } from '@/store/store'
import { selectUser } from '@/store/user/user.selector'
import React from 'react'
import { CustomLink } from '../custom-link/custom-link.ui'
import { OfflineBadge } from './OfflineBadge'
import { StyledHeader, StyledNav } from './styled'

interface HeaderProps {
  logo?: React.ReactNode
}

export const Header = ({ logo = 'Дино Кликер' }: HeaderProps) => {
  const { user } = useAppSelector(selectUser)

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
