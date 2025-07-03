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

export interface ParentComment {
  authorId: number
  authorLogin: string
  children?: ParentComment[]
  content: string
  createdAt: string
  id: 1
  parentCommentId: number
  topicId: 1
}

export interface StoredData {
  topics: Topic[]
  nextTopicId: number
  nextCommentId: number
}
