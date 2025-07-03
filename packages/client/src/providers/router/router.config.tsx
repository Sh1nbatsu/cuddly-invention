import { Leaderboard } from '@/pages/leaderboard/leaderboard.ui'
import { createBrowserRouter } from 'react-router-dom'

import { gameRoute } from '@/pages/game/game-route'
import { presentationRoute } from '@/pages/presentation/presentation.route'
import { ErrorLayout } from '@/shared/layouts/error/error-layout.ui'
import {
  NOT_FOUND_ERROR,
  PAGE_ERROR,
} from '@/shared/layouts/error/error.config'
import { MainLayout } from '@/shared/layouts/main-layout.ui'
import { ProtectedRoute } from './protected-router'
import { authRoutes } from './router-auth'
import { forumRoutes } from './router-form'

export const router = [
  {
    path: '/',
    element: <MainLayout />,
    errorElement: <ErrorLayout config={PAGE_ERROR} />,
    children: [gameRoute, presentationRoute, forumRoutes],
  },
  authRoutes,
  {
    path: '*',
    element: <ErrorLayout config={NOT_FOUND_ERROR} />,
  },
]

export const routerConfig = createBrowserRouter(router)
