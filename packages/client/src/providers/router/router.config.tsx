import { ErrorPage } from '@/pages/error/ErrorPage'
import HomePage from '@/pages/game/HomePage'
import Leaderboard from '@/pages/game/leaderboard/LeaderboardPage'
import { createBrowserRouter } from 'react-router-dom'

import { NOT_FOUND_ERROR, PAGE_ERROR } from '@/config/errorConfig'
import { ProtectedRoute } from './protected-router'
import { authRoutes } from './router-auth'
import { forumRoutes } from './router-form'

export const routerConfig = createBrowserRouter([
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
