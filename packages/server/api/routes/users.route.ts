import {
  getCurrentUser,
  getUsersLeaderboard,
  updateCurrentUserLeaderboardScore,
} from 'api/controllers/users.controller'
import { paginationSchema } from 'api/schemas/pagination.schema'
import { userScoreSchema } from 'api/schemas/user.schema'
import { validate } from 'api/utils/validate'
import { Router } from 'express'

const router = Router()

router.get('/me', getCurrentUser)
router.get('/leaderboard', validate(paginationSchema), getUsersLeaderboard)
router.patch(
  '/leaderboard',
  validate(userScoreSchema),
  updateCurrentUserLeaderboardScore
)

export default router
