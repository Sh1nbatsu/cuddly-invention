import { createTopic } from '@/entities/topic/topic.api'
import { useTopics } from '@/entities/topic/topic.context'
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

  const { topics, isLoading, refetchTopics } = useTopics()

  const onSubmit = async (data: TopicSchemaData) => {
    await createTopic(data)
    await refetchTopics()
    methods.reset()
  }

  return (
    <FormProvider {...methods}>
      <StyledForumPageContainer>
        <StyledForumTitle level={2}>Форум</StyledForumTitle>
        <TopicForm onSubmit={onSubmit} />
        <TopicList />
      </StyledForumPageContainer>
    </FormProvider>
  )
}
