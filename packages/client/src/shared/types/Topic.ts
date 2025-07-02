import { ParentComment } from './Forum'
import { User } from './User'

export interface Topic {
  id: number
  author: User
  description: string
  title: string
  createdAt: string
  updatedAt: Date
  comments: ParentComment[]
}
