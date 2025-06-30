import { ForumComment } from './Forum'
import { User } from './User'

export interface Topic {
  id: number
  author: User
  description: string
  title: string
  createdAt: Date
  updatedAt: Date
  comments: ForumComment[]
}
