import React from 'react'
import { ForumPage } from '@/pages/Forum/ForumPage'
import { TopicPage } from '@/pages/Forum/TopicPage'
import { ErrorPage } from '@/pages/ErrorPage/ErrorPage'
import { PAGE_ERROR } from '@/config/errorConfig'

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
