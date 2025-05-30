import { ProtectedRoute } from '@/components/ProtectedRoute'
import { ErrorPage } from '@/pages/error/ErrorPage'
import HomePage from '@/pages/game/HomePage'
import Leaderboard from '@/pages/game/leaderboard/LeaderboardPage'
import { createBrowserRouter } from 'react-router-dom'

import { NOT_FOUND_ERROR, PAGE_ERROR } from '@/config/errorConfig'
import { authRoutes } from '@/router/auth/auth'
import { forumRoutes } from '@/router/forum/forum'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
    errorElement: <ErrorPage config={PAGE_ERROR} />,
  },
  authRoutes,
  forumRoutes,
  {
    path: 'leaderboard',
    element: (
      <ProtectedRoute>
        <Leaderboard />
      </ProtectedRoute>
    ),
    errorElement: <ErrorPage config={PAGE_ERROR} />,
  },
  {
    path: '*',
    element: <ErrorPage config={NOT_FOUND_ERROR} />,
  },
])
