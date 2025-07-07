import { User } from './User'

export type LeaderboardRequestData = {
  ratingFieldName: string
  cursor: number
  limit: number
}

export type LeaderData = {
  username: string
  date: string
  undefScore12: number
  avatar?: string
}

export type LeaderRequestData = {
  count: number
}

export type LeaderboardResponse = Array<{ data: User }>
