import { FullPageLoader } from '@/components/FullPageLoader'
import { useAppSelector } from '@/store/store'
import { selectUser } from '@/store/user/user.selector'
import { ComponentType } from 'react'
import { Navigate, useLocation } from 'react-router-dom'

export const withAuth = <P extends object>(Wrapped: ComponentType<P>) => {
  const ComponentWithAuth = (props: P) => {
    const { user, loading } = useAppSelector(selectUser)
    const location = useLocation()

    if (loading) return <FullPageLoader />
    if (!user?.id)
      return <Navigate to="/sign-in" state={{ from: location }} replace />

    return <Wrapped {...props} />
  }
  return ComponentWithAuth
}
