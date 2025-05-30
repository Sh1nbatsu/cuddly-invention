import { z } from 'zod'
import { LoginSchema, RegisterSchema } from './session.contract'

export type RegisterFormData = z.infer<typeof RegisterSchema>

export type LoginFormData = z.infer<typeof LoginSchema>
