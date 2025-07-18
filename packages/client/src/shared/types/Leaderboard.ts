import { User } from './User'

export type LeaderboardRequestData = {
  cursor: number
  limit: number
}

export type LeaderRequestData = {
  count: number
}

export type LeaderboardResponse = {
  rows: Array<User>
  count: number
}
