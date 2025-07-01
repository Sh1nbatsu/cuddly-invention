import {
  createTopic,
  getAllTopics,
  getTopicWithComments,
} from 'api/controllers/topic.controller'
import { TopicSchema } from 'api/schemas/topic.schema'
import { validate } from 'api/utils/validate'
import { Router } from 'express'

const router = Router()

router.get('/', getAllTopics)
router.post('/', validate(TopicSchema), createTopic)

router.get('/:topicId', getTopicWithComments)

export default router
