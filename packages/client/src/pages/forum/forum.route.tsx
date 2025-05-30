import { PAGE_ERROR } from '@/config/errorConfig'
import { ErrorLayout } from '@/shared/layouts/error/error-layout.ui'
import { ForumPage } from './forum-page.ui'

export const forumRoute = {
  path: 'forum',
  element: <ForumPage />,
  errorElement: <ErrorLayout config={PAGE_ERROR} />,
}
