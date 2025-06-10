import { api } from '@/shared/libs/axios'
import {
  LeaderboardRequestData,
  Leader,
  LeaderboardResponse,
} from '@/shared/types/Leaderboard'

type getLeaderboard = (
  data: LeaderboardRequestData
) => Promise<LeaderboardResponse>
type addLeader = (data: Leader) => Promise<string>

export const getLeaderboardApi: getLeaderboard = data =>
  api.post('/leaderboard/all', data)

export const addLeaderApi: addLeader = data => api.post('/leaderboard', data)
