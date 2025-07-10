import { ProtectedRoute } from '@/providers/router/protected-router'
import { ErrorLayout } from '@/shared/layouts/error/error-layout.ui'
import { PAGE_ERROR } from '@/shared/layouts/error/error.config'
import { RouteObject } from 'react-router-dom'
import { Leaderboard } from './leaderboard.ui'

export const leadBoardRoute: RouteObject = {
  path: 'leaderboard',
  element: (
    <ProtectedRoute>
      <Leaderboard />
    </ProtectedRoute>
  ),
  errorElement: <ErrorLayout config={PAGE_ERROR} />,
}
