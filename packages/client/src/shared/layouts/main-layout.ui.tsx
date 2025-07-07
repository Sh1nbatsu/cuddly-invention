import React, { useEffect } from 'react'
import { PageWrapper } from '@/shared/ui/page-wrapper/page-wrapper.ui'
import { Outlet } from 'react-router-dom'
import { Header } from '@/shared/ui/Header/header.ui'
import { foundYandexUser } from '@/shared/hooks/found-yandex-user'

export const MainLayout: React.FC = () => {
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

  return (
    <PageWrapper>
      <Header />
      <Outlet />
    </PageWrapper>
  )
}
