import { createBrowserRouter } from 'react-router-dom'
import { ProtectedRoute } from '@/components/ProtectedRoute'
import HomePage from '@/pages/game/HomePage'
import { ErrorPage } from '@/pages/ErrorPage/ErrorPage'
import Leaderboard from '@/pages/game/leaderboard/LeaderboardPage'
import { PresentationPage } from '@/pages/Presentation/PresentationPage'

import { authRoutes } from '@/router/auth/auth'
import { forumRoutes } from '@/router/forum/forum'
import { PAGE_ERROR, NOT_FOUND_ERROR } from '@/config/errorConfig'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <PresentationPage />,
    errorElement: <ErrorPage config={PAGE_ERROR} />,
  },
  {
    path: 'game',
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
