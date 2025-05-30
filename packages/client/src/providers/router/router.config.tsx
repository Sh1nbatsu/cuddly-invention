import { ErrorPage } from '@/pages/error/ErrorPage'
import Leaderboard from '@/pages/leaderboard/LeaderboardPage'
import { createBrowserRouter } from 'react-router-dom'

import { NOT_FOUND_ERROR, PAGE_ERROR } from '@/config/errorConfig'
import { GamePage } from '@/pages/game/game-page.ui'
import { MainLayout } from '@/shared/layouts/main-layout.ui'
import { ProtectedRoute } from './protected-router'
import { authRoutes } from './router-auth'
import { forumRoutes } from './router-form'

export const routerConfig = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    errorElement: <ErrorPage config={PAGE_ERROR} />,
    children: [
      {
        index: true,
        element: <GamePage />,
      },
      {
        path: 'leaderboard',
        element: (
          <ProtectedRoute>
            <Leaderboard />
          </ProtectedRoute>
        ),
      },
      forumRoutes,
    ],
  },
  authRoutes,
  {
    path: '*',
    element: <ErrorPage config={NOT_FOUND_ERROR} />,
  },
])
