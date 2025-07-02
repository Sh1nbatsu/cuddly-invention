import { api } from '@/shared/libs/axios'
import { Topic } from '@/shared/types/Topic'
import { CreateCommentData, TopicSchemaData } from './topic.types'

type GetTopics = () => Promise<Topic[]>
type CreateTopic = (data: TopicSchemaData) => Promise<void>
type CreateComment = (data: CreateCommentData, topicId: number) => Promise<void>

export const createTopic: CreateTopic = data => api.post('/api/topics', data)
export const getTopics: GetTopics = () => api.get('/api/topics')
export const createComment: CreateComment = (data, topicId) =>
  api.post('/api/comments', data, { params: topicId })
