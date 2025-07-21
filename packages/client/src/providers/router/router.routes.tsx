import { gameRoute } from '@/pages/game/game-route'
import { leadBoardRoute } from '@/pages/leaderboard/leadboard.route'
import { presentationRoute } from '@/pages/Presentation/presentation.route'
import { userProfileRoute } from '@/pages/user-profile/user-profile.route'
import { ErrorLayout } from '@/shared/layouts/error/error-layout.ui'
import { NOT_FOUND_ERROR } from '@/shared/layouts/error/error.config'
import { MainLayout } from '@/shared/layouts/main-layout.ui'
import { RouteObject } from 'react-router-dom'
import { authRoutes } from './router-auth'
import { forumRoutes } from './router-form'

export const routes: RouteObject[] = [
  {
    path: '/',
    element: <MainLayout />,
    children: [
      gameRoute,
      presentationRoute,
      forumRoutes,
      userProfileRoute,
      leadBoardRoute,
    ],
  },
  authRoutes,
  {
    path: '*',
    element: <ErrorLayout config={NOT_FOUND_ERROR} />,
  },
]
