import { logout } from '@/entities/user/model/user.thunk'
import { useCurrentUser } from '@/shared/hooks/useCurrentUser'
import { CustomLink } from '../custom-link/custom-link.ui'
import { OfflineBadge } from './header-offline-badge.ui'
import { StyledHeader, StyledNav } from './header.styled'

export const Header = () => {
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
        Главная
      </CustomLink>
      <StyledNav>
        <CustomLink to="/game" variant="retro">
          {logo}
        </CustomLink>
        <CustomLink to="/forum" variant="retro">
          Форум
        </CustomLink>
        <CustomLink to="/leaderboard" variant="retro">
          Таблица лидеров
        </CustomLink>
        <CustomLink to="/presentation" variant="retro">
          О нас
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
