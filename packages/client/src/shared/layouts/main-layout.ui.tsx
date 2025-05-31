import { PageWrapper } from '@/shared/ui/page-wrapper/page-wrapper.ui'
import { Outlet } from 'react-router-dom'
import { Header } from '../ui/Header/Header'

export const MainLayout = () => (
  <PageWrapper>
    <Header />
    <Outlet />
  </PageWrapper>
)
