import { z } from 'zod'

export const CreateComment = z.object({
  text: z.string().min(3),
})
