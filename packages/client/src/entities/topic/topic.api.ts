import { api } from '@/shared/libs/axios'
import { Topic } from '@/shared/types/Topic'

type GetTopics = () => Promise<Topic[]>

export const getTopics: GetTopics = () => api.get('/topics')
