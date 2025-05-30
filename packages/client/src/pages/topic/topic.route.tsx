import { PAGE_ERROR } from '@/config/errorConfig'
import { ErrorLayout } from '@/shared/layouts/error-layout.ui'
import { TopicPage } from './topic-page.ui'

export const topicRoute = {
  path: 'forum/:topicId',
  element: <TopicPage />,
  errorElement: <ErrorLayout config={PAGE_ERROR} />,
}
