import { ComponentType } from 'react'
import { useLocation, Navigate } from 'react-router-dom'
import { useAuth } from '@/hooks/useAuth'
import { FullPageLoader } from '@/components/FullPageLoader'

export const withAuth = <P extends object>(Wrapped: ComponentType<P>) => {
  const ComponentWithAuth = (props: P) => {
    const { user, loading } = useAuth()
    const location = useLocation()

    if (loading) return <FullPageLoader />
    if (!user)
      return <Navigate to="/sign-in" state={{ from: location }} replace />

    return <Wrapped {...props} />
  }
  return ComponentWithAuth
}
