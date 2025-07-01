import { createTopic, getAllTopics } from 'api/controllers/topic.controller'
import { TopicSchema } from 'api/schemas/topic.schema'
import { validate } from 'api/utils/validate'
import { Router } from 'express'

const router = Router()

router.get('/', getAllTopics)
router.post('/', validate(TopicSchema), createTopic)

export default router
