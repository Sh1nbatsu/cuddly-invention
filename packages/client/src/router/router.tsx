import { ProtectedRoute } from '@/components/ProtectedRoute'
import NotFoundPage from '@/pages/404/NotFoundPage'
import { Login } from '@/pages/auth/Login'
import { Registration } from '@/pages/auth/Registration'
import HomePage from '@/pages/game/HomePage'
import { createBrowserRouter } from 'react-router-dom'
import { authRoutes } from './auth/auth'

export const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <ProtectedRoute>
        <HomePage />
      </ProtectedRoute>
    ),
    errorElement: <NotFoundPage />,
  },
  authRoutes,
  {
    path: '/sign-up',
    element: <Registration />,
  },
  {
    path: '/sign-in',
    element: <Login />,
  },
  {
    path: '*',
    element: <NotFoundPage />,
  },
])
