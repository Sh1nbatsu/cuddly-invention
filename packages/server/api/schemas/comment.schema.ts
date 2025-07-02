import { z } from 'zod'

export const createCommentSchema = z.object({
  content: z.string().min(1, 'Комментарий не может быть пустым'),
  authorId: z
    .number()
    .int()
    .positive('authorId должен быть положительным числом'),
  parentCommentId: z.number().int().positive().nullable().optional(),
})
