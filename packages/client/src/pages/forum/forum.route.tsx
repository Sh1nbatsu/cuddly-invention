import { ProtectedRoute } from '@/providers/router/protected-router'
import { ErrorLayout } from '@/shared/layouts/error/error-layout.ui'
import { PAGE_ERROR } from '@/shared/layouts/error/error.config'
import { ForumPage } from './forum-page.ui'

export const forumRoute = {
  path: 'forum',
  element: (
    <ProtectedRoute>
      <ForumPage />
    </ProtectedRoute>
  ),
  errorElement: <ErrorLayout config={PAGE_ERROR} />,
}
