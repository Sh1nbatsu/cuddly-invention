import { getCurrentUser } from 'api/controllers/users.controller'
import { authMiddleware } from 'api/middleware/auth.middleware'
import { Router } from 'express'

const router = Router()

router.use(authMiddleware)

router.get('/me', getCurrentUser)

export default router
