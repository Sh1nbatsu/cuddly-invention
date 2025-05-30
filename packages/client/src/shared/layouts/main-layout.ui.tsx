import { Header } from '@/shared/ui/Header/Header'
import { PageWrapper } from '@/shared/ui/page-wrapper/page-wrapper.ui'
import { Outlet } from 'react-router-dom'

export const MainLayout = () => (
  <PageWrapper>
    <Header />
    <Outlet />
  </PageWrapper>
)
