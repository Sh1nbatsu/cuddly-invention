import {
  createTopic,
  getTopicWithComments,
} from 'api/controllers/topic.controller'
import { getCurrentUser } from 'api/controllers/users.controller'
import { TopicSchema } from 'api/schemas/topic.schema'
import { validate } from 'api/utils/validate'
import { Router } from 'express'

const router = Router()

router.get('/', getCurrentUser)
router.post('/', validate(TopicSchema), createTopic)

router.get('/:topicId', getTopicWithComments)

export default router
