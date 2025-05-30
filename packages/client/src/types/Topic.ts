import { ForumComment } from './Forum'

export interface Topic {
  id: number
  title: string
  author: string
  text: string
  date: string
  comments: ForumComment[]
}
