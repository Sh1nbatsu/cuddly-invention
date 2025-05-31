import { ErrorLayout } from '@/shared/layouts/error/error-layout.ui'
import { ForumPage } from './forum-page.ui'
import { PAGE_ERROR } from '@/shared/layouts/error/error.config'

export const forumRoute = {
  path: 'forum',
  element: <ForumPage />,
  errorElement: <ErrorLayout config={PAGE_ERROR} />,
}
