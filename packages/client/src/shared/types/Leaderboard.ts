export type LeaderboardData = {
  ratingFieldName: string
  cursor: number
  limit: number
}

export type LeaderData = {
  username: string
  date: string
  undefScore12: number
}

export type Leader = {
  data: LeaderData
  ratingFieldName: string
  teamName: string
}
