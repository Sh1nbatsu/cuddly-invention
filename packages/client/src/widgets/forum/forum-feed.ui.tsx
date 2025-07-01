import { TopicSchema } from '@/entities/topic/topic.contract'
import {
  StyledForumPageContainer,
  StyledForumTitle,
} from '@/entities/topic/topic.styled'
import { TopicSchemaData } from '@/entities/topic/topic.types'
import { TopicForm } from '@/features/topic/topic-form/topic-form.ui'
import { TopicList } from '@/features/topic/topic-list/topic-list.ui'
import { zodResolver } from '@hookform/resolvers/zod'
import { FormProvider, useForm } from 'react-hook-form'

export const ForumWidget = () => {
  const methods = useForm<TopicSchemaData>({
    mode: 'onSubmit',
    resolver: zodResolver(TopicSchema),
  })

  return (
    <FormProvider {...methods}>
      <StyledForumPageContainer>
        <StyledForumTitle level={2}>Форум</StyledForumTitle>
        <TopicForm />
        <TopicList />
        {/* <ForumCard /> */}
      </StyledForumPageContainer>
    </FormProvider>
  )
}
