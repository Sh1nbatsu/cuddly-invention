import { selectUser } from '@/entities/user/model/user.selector'
import { RouterLoader } from '@/providers/router/router-loader'
import { useAppSelector } from '@/providers/store/store.hooks'
import { Navigate, useLocation } from 'react-router-dom'

export const useRequireAuth = () => {
  const { user, loading } = useAppSelector(selectUser)
  const location = useLocation()

  if (loading) return <RouterLoader />
  if (!user)
    return <Navigate to="/sign-in" state={{ from: location }} replace />
  return null
}
