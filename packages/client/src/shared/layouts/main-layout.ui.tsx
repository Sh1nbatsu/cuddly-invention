import { PageWrapper } from '@/shared/ui/page-wrapper/page-wrapper.ui'
import { Outlet } from 'react-router-dom'
import { Header } from '../ui/Header/header.ui' // Конфликт путей внутри Header/header.ui.tsx / header-offline-badge.ui.tsx

export const MainLayout = () => (
  <PageWrapper>
    <Header />
    <Outlet />
  </PageWrapper>
)
