import { useAppSelector } from '@/store/store'
import { selectUser } from '@/store/user/user.selector'
import { ReactElement } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { RouterLoader } from './router-loader'

interface Props {
  children: ReactElement
}

export const ProtectedRoute = ({ children }: Props) => {
  const { user, loading } = useAppSelector(selectUser)

  const location = useLocation()

  if (loading) return <RouterLoader />
  if (!user)
    return <Navigate to="/sign-in" state={{ from: location }} replace />

  return children
}
