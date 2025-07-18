import { selectUser } from '@/entities/user/model/user.selector'
import { RouterLoader } from '@/providers/router/router-loader'
import { useAppSelector } from '@/providers/store/store.hooks'
import { ComponentType } from 'react'
import { Navigate, useLocation } from 'react-router-dom'

export const withAuth = <P extends object>(Wrapped: ComponentType<P>) => {
  const ComponentWithAuth = (props: P) => {
    const { user, loading } = useAppSelector(selectUser)
    const location = useLocation()

    if (loading) return <RouterLoader />
    if (!user?.id)
      return <Navigate to="/sign-in" state={{ from: location }} replace />

    return <Wrapped {...props} />
  }
  return ComponentWithAuth
}
