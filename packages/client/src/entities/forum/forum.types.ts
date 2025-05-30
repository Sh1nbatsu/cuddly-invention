import { z } from 'zod'
import { CreateForumNote } from './forum.contract'

export type CreateFormNoteData = z.infer<typeof CreateForumNote>
