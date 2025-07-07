import { z } from 'zod'

export const userScoreSchema = z.object({
  count: z.coerce.number().int().min(1),
})
