import { api } from '@/shared/libs/axios'
import { CreateCommentData, Topics, TopicSchemaData } from './topic.types'

type GetTopics = () => Promise<Topics>
type CreateTopic = (data: TopicSchemaData) => Promise<void>
type CreateComment = (data: CreateCommentData, topicId: number) => Promise<void>

export const createTopic: CreateTopic = data => api.post('/topics', data)
export const getTopics: GetTopics = () => api.get('/topics')
export const createComment: CreateComment = (data, topicId) =>
  api.post(`/comments/${topicId}`, data)
