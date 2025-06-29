import { getCurrentUser } from 'api/controllers/users.controller'
import { Router } from 'express'

const router = Router()

router.get('/me', getCurrentUser)

export default router
