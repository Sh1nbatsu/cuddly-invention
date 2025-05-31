import { CreateForumNote } from '@/entities/forum/forum.contract'
import { CreateFormNoteData } from '@/entities/forum/forum.types'
import { ForumWidget } from '@/widgets/forum/forum-feed.ui'
import { zodResolver } from '@hookform/resolvers/zod'
import { FormProvider, useForm } from 'react-hook-form'

export const ForumPage = () => {
  const methods = useForm<CreateFormNoteData>({
    mode: 'onSubmit',
    resolver: zodResolver(CreateForumNote),
  })
  return (
    <FormProvider {...methods}>
      <ForumWidget />
    </FormProvider>
  )
}
