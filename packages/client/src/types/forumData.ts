export interface ForumComment {
  id: number
  author: string
  text: string
  date: string
  replies: ForumComment[]
}

export interface Topic {
  id: number
  title: string
  author: string
  text: string
  date: string
  comments: ForumComment[]
}

export interface StoredData {
  topics: Topic[]
  nextTopicId: number
  nextCommentId: number
}
