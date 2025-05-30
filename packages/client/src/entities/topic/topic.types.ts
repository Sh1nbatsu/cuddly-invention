import { z } from 'zod'
import { CreateComment } from './topic.contract'

export type CreateCommentData = z.infer<typeof CreateComment>
