import { api } from '@/shared/libs/axios'
import { Topic } from '@/shared/types/Topic'
import { TopicSchemaData } from './topic.types'

type GetTopics = () => Promise<Topic[]>
type CreateTopic = (data: TopicSchemaData) => Promise<void>

export const createTopic: CreateTopic = data => api.post('/api/topics', data)
export const getTopics: GetTopics = () => api.get('/api/topics')
