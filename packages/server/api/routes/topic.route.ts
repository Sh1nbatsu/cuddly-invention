import { getTopicWithComments } from 'api/controllers/topic.controller'
import { getCurrentUser } from 'api/controllers/users.controller'
import { Router } from 'express'

const router = Router()

router.get('/', getCurrentUser)
router.get('/:topicId', getTopicWithComments)

export default router
