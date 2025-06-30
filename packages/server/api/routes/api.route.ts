import { authMiddleware } from 'api/middleware/auth.middleware'
import { Router } from 'express'
import topicsRouter from './topic.route'
import usersRouter from './users.route'

const router = Router()

router.use(authMiddleware)
router.use('/users', usersRouter)
router.use('/topics', topicsRouter)

export default router
