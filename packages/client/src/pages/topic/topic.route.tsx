import { ErrorLayout } from '@/shared/layouts/error/error-layout.ui'
import { TopicPage } from './topic-page.ui'
import { PAGE_ERROR } from '@/shared/layouts/error/error.config'

export const topicRoute = {
  path: 'forum/:topicId',
  element: <TopicPage />,
  errorElement: <ErrorLayout config={PAGE_ERROR} />,
}
