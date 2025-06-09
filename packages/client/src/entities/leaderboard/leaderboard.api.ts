import { api } from '@/shared/libs/axios'
import { LeaderboardData, Leader } from '@/shared/types/Leaderboard'

type getLeaderboard = (data: LeaderboardData) => Promise<unknown>
type addLeader = (data: Leader) => Promise<unknown>

export const getLeaderboardApi: getLeaderboard = data =>
  api.post('/leaderboard/all', data).then(res => res)

export const addLeaderApi: addLeader = data =>
  api.post('/leaderboard', data).then(res => res)
