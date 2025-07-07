import { ForumComment } from '@/shared/types/Forum'
import { Topic } from '@/shared/types/Topic'

export interface TopicCardProps {
  topic: Topic & { comments?: ForumComment[] }
  fetchTopics?: () => Promise<void>
}

export type Topics = Array<TopicCardProps['topic']>
