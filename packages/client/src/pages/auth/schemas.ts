import { z } from 'zod'

export const RegisterSchema = z.object({
  nickname: z
    .string()
    .min(3, 'Никнейм должен содержать минимум 3 символа')
    .max(20, 'Никнейм не должен превышать 20 символов')
    .regex(
      /^[a-zA-Z0-9_]+$/,
      'Никнейм может содержать только буквы, цифры и подчеркивание'
    ),

  email: z
    .string()
    .email('Введите корректный email')
    .max(50, 'Email не должен превышать 50 символов'),

  password: z
    .string()
    .min(6, 'Пароль должен содержать минимум 6 символов')
    .max(30, 'Пароль не должен превышать 30 символов')
    .regex(/[A-Z]/, 'Пароль должен содержать хотя бы одну заглавную букву')
    .regex(/[0-9]/, 'Пароль должен содержать хотя бы одну цифру'),
})

export type RegisterFormData = z.infer<typeof RegisterSchema>
