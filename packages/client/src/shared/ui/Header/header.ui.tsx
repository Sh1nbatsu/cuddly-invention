import { fetchMe, logout } from '@/entities/user/model/user.thunk'
import { useAppDispatch } from '@/providers/store/store.hooks'
import { useCurrentUser } from '@/shared/hooks/useCurrentUser'
import { useEffect } from 'react'
import { CustomLink } from '../custom-link/custom-link.ui'
import { OfflineBadge } from '@/shared/ui/Header/header-offline-badge.ui'
import { StyledHeader, StyledNav } from '@/shared/ui/Header/header.styled'
import { useClient } from '@/shared/hooks/useClient'
import { foundYandexUser } from '@/shared/hooks/found-yandex-user'

export const Header = () => {
  useClient()
  const user = useCurrentUser()
  const dispatch = useAppDispatch()

  useEffect(() => {
    const initializeAuth = async (): Promise<void> => {
      try {
        await foundYandexUser()
      } catch (error) {
        console.error('Ошибка инициализации пользователя Яндекс:', error)
      }
    }

    initializeAuth()
  }, [])

  useEffect(() => {
    if (!user?.id) {
      dispatch(fetchMe())
    }
  }, [dispatch, user?.id])

  const handleLogout = async () => {
    try {
      await dispatch(logout())
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
        <CustomLink to="/forum" variant="retro">
          Форум
        </CustomLink>
        <CustomLink to="/leaderboard" variant="retro">
          Таблица лидеров
        </CustomLink>
        <CustomLink to="/presentation" variant="retro">
          О нас
        </CustomLink>
        <CustomLink to="/user/profile" variant="retro">
          Профиль
        </CustomLink>
        {!user?.id ? (
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
