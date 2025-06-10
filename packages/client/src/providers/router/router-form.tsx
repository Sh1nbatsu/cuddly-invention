import { forumRoute } from '@/pages/Forum/forum.route'
import { topicRoute } from '@/pages/topic/topic.route'

export const forumRoutes = {
  path: '/',
  children: [forumRoute, topicRoute],
}
