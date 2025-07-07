import { TopicProvider } from '@/entities/topic/topic.context'
import { ForumWidget } from '@/widgets/forum/forum-feed.ui'

export const ForumPage = () => {
  return (
    <TopicProvider>
      <ForumWidget />
    </TopicProvider>
  )
}
