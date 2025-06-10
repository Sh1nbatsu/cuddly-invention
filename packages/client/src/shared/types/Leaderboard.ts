export type LeaderboardData = {
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

export type Leader = {
  data: LeaderData
  ratingFieldName: string
  teamName: string
}
