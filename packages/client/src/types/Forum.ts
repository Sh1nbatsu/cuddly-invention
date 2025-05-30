import { Topic } from './Topic'

export interface ForumComment {
  id: number
  author: string
  text: string
  date: string
  replies: ForumComment[]
}

export interface StoredData {
  topics: Topic[]
  nextTopicId: number
  nextCommentId: number
}
