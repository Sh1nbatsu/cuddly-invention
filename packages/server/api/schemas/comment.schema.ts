import { z } from 'zod'

export const createCommentSchema = z.object({
  content: z.string().min(1, 'Комментарий не может быть пустым'),
  parentCommentId: z.number().int().positive().nullable().optional(),
})
