import { ForumComment } from '@/shared/types/Forum'
import { Topic } from '@/shared/types/Topic'
import { z } from 'zod'
import { CreateCommentSchema, TopicSchema } from './topic.contract'

export type CreateCommentData = z.infer<typeof CreateCommentSchema>
export type TopicSchemaData = z.infer<typeof TopicSchema>

export interface TopicCardProps {
  topic: Topic & { comments?: ForumComment[] }
  fetchTopics?: () => Promise<void>
}
