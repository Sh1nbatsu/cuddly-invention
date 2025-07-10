import { z } from 'zod'

export const userScoreSchema = z.object({
  count: z.number().int().min(1),
})
