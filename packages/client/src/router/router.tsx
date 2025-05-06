import { ProtectedRoute } from '@/components/ProtectedRoute'
import NotFoundPage from '@/pages/404/NotFoundPage'
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
    path: '*',
    element: <NotFoundPage />,
  },
])
