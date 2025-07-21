import { api } from '@/shared/libs/axios'
import {
  LeaderboardRequestData,
  LeaderboardResponse,
  LeaderRequestData,
} from '@/shared/types/Leaderboard'

type GetLeaderboard = (
  data: LeaderboardRequestData
) => Promise<LeaderboardResponse>

type AddLeader = (data: LeaderRequestData) => Promise<string>

export const getLeaderboardApi: GetLeaderboard = data =>
  api.post('/users/leaderboard', data)

export const updateLeaderApi: AddLeader = data =>
  api.patch('/users/leaderboard', data)
