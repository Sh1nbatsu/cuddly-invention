import { createComment } from 'api/controllers/comment.controller'
import { createCommentSchema } from 'api/schemas/comment.schema'
import { validate } from 'api/utils/validate'
import { Router } from 'express'

const router = Router()

router.post('/:topicId', validate(createCommentSchema), createComment)

export default router
