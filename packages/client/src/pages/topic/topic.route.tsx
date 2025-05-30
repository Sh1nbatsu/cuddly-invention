import { PAGE_ERROR } from '@/config/errorConfig'
import { ErrorPage } from '../error/ErrorPage'
import { TopicPage } from './topic-page.ui'

export const topicRoute = {
  path: 'forum/:topicId',
  element: <TopicPage />,
  errorElement: <ErrorPage config={PAGE_ERROR} />,
}
