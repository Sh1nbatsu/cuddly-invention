import { PAGE_ERROR } from '@/config/errorConfig'
import { ErrorPage } from '@/pages/error/ErrorPage'
import { ForumPage } from '@/pages/forum/ForumPage'
import { TopicPage } from '@/pages/forum/TopicPage'

export const forumRoutes = {
  path: '/',
  children: [
    {
      path: 'forum',
      element: <ForumPage />,
      errorElement: <ErrorPage config={PAGE_ERROR} />,
    },
    {
      path: 'forum/:topicId',
      element: <TopicPage />,
      errorElement: <ErrorPage config={PAGE_ERROR} />,
    },
  ],
}
