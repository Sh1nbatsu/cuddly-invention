import { signIn, signUp } from 'api/controllers/session.controller'
import { LoginSchema, RegisterSchema } from 'api/schemas/session.schema'
import { validate } from 'api/utils/validate'
import { Router } from 'express'

const router = Router()

router.post('/sign-up', validate(RegisterSchema), signUp)
router.post('/sign-in', validate(LoginSchema), signIn)

export default router
