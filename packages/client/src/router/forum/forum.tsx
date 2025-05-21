import { ForumPage } from '@/pages/Forum/ForumPage'
import { TopicPage } from '@/pages/Forum/TopicPage'

export const forumRoutes = {
  path: '/',
  children: [
    {
      path: '/forum',
      element: <ForumPage />,
    },
    {
      path: '/forum/:topicId',
      element: <TopicPage />,
    },
  ],
}
