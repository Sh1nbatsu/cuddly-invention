import { z } from 'zod'

export const paginationSchema = z.object({
  pageSize: z.coerce
    .number()
    .int()
    .min(1)
    .max(100)
    .default(10)
    .describe('Количество элементов на странице (1-100)'),

  cursor: z.coerce
    .number()
    .int()
    .min(1)
    .default(1)
    .describe('Номер страницы, начиная с 1'),
})
