import { PAGE_ERROR } from '@/config/errorConfig'
import { ErrorPage } from '../error/ErrorPage'
import { ForumPage } from './forum-page.ui'

export const forumRoute = {
  path: 'forum',
  element: <ForumPage />,
  errorElement: <ErrorPage config={PAGE_ERROR} />,
}
