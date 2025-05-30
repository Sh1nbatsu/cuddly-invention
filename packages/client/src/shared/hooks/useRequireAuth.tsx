import { FullPageLoader } from '@/components/FullPageLoader'
import { useAppSelector } from '@/store/store'
import { selectUser } from '@/store/user/user.selector'
import { Navigate, useLocation } from 'react-router-dom'

export const useRequireAuth = () => {
  const { user, loading } = useAppSelector(selectUser)
  const location = useLocation()

  if (loading) return <FullPageLoader />
  if (!user)
    return <Navigate to="/sign-in" state={{ from: location }} replace />
  return null
}
