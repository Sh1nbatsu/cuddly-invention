import { Topic } from './Topic'
import { User } from './User'

export interface ForumComment {
  createdAt: string
  id: number
  author: Pick<User, 'login'>
  content: string
  date: string
  children: ForumComment[]
}

export interface StoredData {
  topics: Topic[]
  nextTopicId: number
  nextCommentId: number
}
