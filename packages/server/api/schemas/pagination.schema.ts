import { z } from 'zod'

export const paginationSchema = z.object({
  pageSize: z.coerce
    .number()
    .int()
    .min(0)
    .max(100)
    .default(10)
    .optional()
    .describe('Количество элементов на странице (1-100)'),

  cursor: z.coerce
    .number()
    .int()
    .min(0)
    .default(1)
    .optional()
    .describe('Номер страницы, начиная с 1'),
})
