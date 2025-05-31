import { createBrowserRouter } from 'react-router-dom'
import { ErrorLayout } from '@/shared/layouts/error/error-layout.ui'
import { MainLayout } from '@/shared/layouts/main-layout.ui'
import {
  PAGE_ERROR,
  NOT_FOUND_ERROR,
} from '@/shared/layouts/error/error.config'
import { GamePage } from '@/pages/game/game-page.ui'
import Leaderboard from '@/pages/leaderboard/LeaderboardPage'
import { ProtectedRoute } from '@/providers/router/protected-router'
import { forumRoutes } from '@/providers/router/router-form'
import { authRoutes } from '@/providers/router/router-auth'

export const routerConfig = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    errorElement: <ErrorLayout config={PAGE_ERROR} />,
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
    element: <ErrorLayout config={NOT_FOUND_ERROR} />,
  },
])
