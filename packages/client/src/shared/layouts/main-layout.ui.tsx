import { PageWrapper } from '@/shared/ui/page-wrapper/page-wrapper.ui'
import { Outlet } from 'react-router-dom'
import { Header } from '../ui/header/header.ui'
import { foundYandexUser } from '@/shared/hooks/init-auth'
await foundYandexUser()

export const MainLayout = () => (
  <PageWrapper>
    <Header />
    <Outlet />
  </PageWrapper>
)
