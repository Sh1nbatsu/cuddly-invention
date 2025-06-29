import { authMiddleware } from 'api/middleware/auth.middleware'
import { Router } from 'express'
import usersRouter from './users.route'

const router = Router()

router.use(authMiddleware)
router.use('/users', usersRouter)

export default router
