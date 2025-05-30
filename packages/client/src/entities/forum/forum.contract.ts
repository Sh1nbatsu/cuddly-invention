import { z } from 'zod'

export const CreateForumNote = z.object({
  title: z.string().min(3),
  text: z.string().min(5),
})
