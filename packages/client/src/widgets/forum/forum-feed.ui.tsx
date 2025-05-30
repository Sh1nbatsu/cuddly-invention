import { CreateForumNote } from '@/entities/forum/forum.contract'
import { useForumLogic } from '@/entities/forum/forum.hooks'
import {
  StyledForumPageContainer,
  StyledForumTitle,
} from '@/entities/forum/forum.styled'
import { CreateFormNoteData } from '@/entities/forum/forum.types'
import { ForumCard } from '@/features/forum/forum-card/forum-card.ui'
import { ForumList } from '@/features/forum/forum-list/forum-list.ui'
import { zodResolver } from '@hookform/resolvers/zod'
import { FormProvider, useForm } from 'react-hook-form'

export const ForumWidget = () => {
  const methods = useForm<CreateFormNoteData>({
    mode: 'onSubmit',
    resolver: zodResolver(CreateForumNote),
  })

  const { data } = useForumLogic()

  return (
    <FormProvider {...methods}>
      <StyledForumPageContainer>
        <StyledForumTitle level={2}>Форум</StyledForumTitle>
        <ForumList dataSource={data} />
        <ForumCard />
      </StyledForumPageContainer>
    </FormProvider>
  )
}
