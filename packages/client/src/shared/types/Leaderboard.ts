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

export type Leader = {
  data: LeaderData
  ratingFieldName: string
  teamName: string
}

export type LeaderboardResponse = [{ data: LeaderData }]
