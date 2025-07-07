import { RouteObject } from 'react-router-dom'
import { MainLayout } from '@/shared/layouts/main-layout.ui'
import { ErrorLayout } from '@/shared/layouts/error/error-layout.ui'
import { gameRoute } from '@/pages/game/game-route'
import { presentationRoute } from '@/pages/presentation/presentation.route'
import { userProfileRoute } from '@/pages/user-profile/user-profile.route'
import { forumRoutes } from './router-form'
import {
  NOT_FOUND_ERROR,
  PAGE_ERROR,
} from '@/shared/layouts/error/error.config'
import { authRoutes } from './router-auth'
import { ProtectedRoute } from './protected-router'
import { Leaderboard } from '@/pages/leaderboard/leaderboard.ui'

export const routes: RouteObject[] = [
  {
    path: '/',
    element: <MainLayout />,
    errorElement: <ErrorLayout config={PAGE_ERROR} />,
    children: [
      gameRoute,
      presentationRoute,
      forumRoutes,
      userProfileRoute,
      {
        path: 'leaderboard',
        element: (
          <ProtectedRoute>
            <Leaderboard />
          </ProtectedRoute>
        ),
      },
    ],
  },
  authRoutes,
  {
    path: '*',
    element: <ErrorLayout config={NOT_FOUND_ERROR} />,
  },
]
