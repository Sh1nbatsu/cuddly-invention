import { signUp } from 'api/controllers/session.controller'
import { RegisterSchema } from 'api/schemas/session.schema'
import { validate } from 'api/utils/validate'
import { Router } from 'express'

const router = Router()

router.post('/sign-up', validate(RegisterSchema), signUp)

export default router
