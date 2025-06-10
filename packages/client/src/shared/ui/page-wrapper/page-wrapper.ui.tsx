import { useClient } from '@/shared/hooks/useClient'
import { ReactNode } from 'react'
import { StyledPageWrapper } from './page-wrapper.styled'

interface PageWrapperProps {
  children: ReactNode
}

export const PageWrapper = ({ children }: PageWrapperProps) => {
  const isClientMounted = useClient()

  if (!isClientMounted) return null

  return <StyledPageWrapper>{children}</StyledPageWrapper>
}
