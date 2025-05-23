import { ReactElement } from 'react'
import { useLocation, Navigate } from 'react-router-dom'
import { useAuth } from '@/hooks/useAuth'
import { FullPageLoader } from '@/components/FullPageLoader'

interface Props {
  children: ReactElement
}

export const ProtectedRoute = ({ children }: Props) => {
  const { user, loading } = useAuth()
  const location = useLocation()

  if (loading) return <FullPageLoader />
  if (!user)
    return <Navigate to="/sign-in" state={{ from: location }} replace />

  return children
}
