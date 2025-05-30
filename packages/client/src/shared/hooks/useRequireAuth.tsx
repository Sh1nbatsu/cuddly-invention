import { FullPageLoader } from '@/components/FullPageLoader'
import { selectUser } from '@/entities/user/model/user.selector'
import { useAppSelector } from '@/store/store'
import { Navigate, useLocation } from 'react-router-dom'

export const useRequireAuth = () => {
  const { user, loading } = useAppSelector(selectUser)
  const location = useLocation()

  if (loading) return <FullPageLoader />
  if (!user)
    return <Navigate to="/sign-in" state={{ from: location }} replace />
  return null
}
