import { useLocation, Navigate } from 'react-router-dom'
import { useAuth } from '@/context/AuthContext'
import { FullPageLoader } from '@/components/FullPageLoader'

export const useRequireAuth = () => {
  const { user, loading } = useAuth()
  const location = useLocation()

  if (loading) return <FullPageLoader />
  if (!user)
    return <Navigate to="/sign-in" state={{ from: location }} replace />
  return null
}
