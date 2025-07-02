import { z } from 'zod'

export const CreateCommentSchema = z.object({
  content: z.string().min(1, 'Комментарий не может быть пустым'),
  parentCommentId: z.number().int().positive().nullable().optional(),
})

export const TopicSchema = z.object({
  title: z
    .string()
    .min(2, 'Заголовок должно содержать минимум 2 символа')
    .max(60, 'Заголовок не должно превышать 30 символов'),

  description: z.string().min(2, 'Описание должно содержать минимум 2 символа'),
})
